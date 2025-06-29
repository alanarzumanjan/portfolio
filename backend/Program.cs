using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

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

builder.Services.AddControllers()
    .AddJsonOptions(x =>
        x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);

// builder.Logging.ClearProviders(); // Clear Logs

var app = builder.Build();

// Connect Swagger UI in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
} // set ASPNETCORE_ENVIRONMENT=Development

app.UseStaticFiles();
app.MapHealthChecks("/health");
app.UseHttpsRedirection();
app.MapControllers();
app.Run();