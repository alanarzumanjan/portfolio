using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

Console.OutputEncoding = Encoding.UTF8;

var builder = WebApplication.CreateBuilder(args);

// Download database connection variables from .env
var connectionString = DbConnectionService.TestDatabaseConnection();

// Connect EF Core + SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));

// Connect Swagger
builder.Services.AddEndpointsApiExplorer();
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


app.UseStaticFiles();
app.MapHealthChecks("/health");
app.MapControllers();
app.Run();