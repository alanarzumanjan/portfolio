using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using AspNetCoreRateLimit;

Console.OutputEncoding = Encoding.UTF8;

var builder = WebApplication.CreateBuilder(args);

// Download database connection variables from .env
var connectionString = DbConnectionService.TestDatabaseConnection();

// Connect EF Core + SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));

// IP Connection Limiting
builder.Services.AddMemoryCache();
builder.Services.Configure<IpRateLimitOptions>(builder.Configuration.GetSection("IpRateLimiting"));
builder.Services.AddInMemoryRateLimiting();
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
builder.Services.AddEndpointsApiExplorer();
// Loging
builder.Services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();
builder.Services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();

// Connect Swagger
builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "Portfolio API", Version = "v1" });
    }
);

// Health Check
builder.Services.AddHealthChecks()
    .AddDbContextCheck<AppDbContext>();

builder.Services.AddControllers();

// builder.Logging.ClearProviders(); // Clear Logs
var frontendOrigin = Environment.GetEnvironmentVariable("ALLOWED_FRONTEND_PORT") ?? "https://localhost:3000";

// CORS for Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendOnly", builder =>
    {
        builder.WithOrigins(frontendOrigin)
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Connect Swagger UI in Development
if (app.Environment.IsDevelopment())
{
    app.UseMiddleware<SwaggerAuth>();
    app.UseSwagger();
    app.UseSwaggerUI();
} // for swagger acces: $env:ASPNETCORE_ENVIRONMENT = "Development"

// Apply CORS based on environment
if (app.Environment.IsDevelopment())
{
    app.UseCors(policy =>
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
}
else
{
    app.UseCors("FrontendOnly");
}

app.UseIpRateLimiting();
app.Use(async (context, next) =>
{
    await next();

    if (context.Response.StatusCode == 429)
    {
        await context.Response.WriteAsync("Rate limit exceeded. Please wait a 10 minute.");
        Console.WriteLine("User: Rate limit exceeded. Please wait a 10 minute.");
    }
});
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
app.UseStaticFiles();
app.MapHealthChecks("/health");
app.MapControllers();
app.Run($"http://0.0.0.0:{port}");