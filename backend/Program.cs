using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Download database connection variables from .env
DotNetEnv.Env.Load();
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");
Console.WriteLine($"DB connection: {connectionString}");

// Connect EF Core + SQLite
builder.Services.AddDbContext<AppDbContext>(options
    => options.UseSqlite(connectionString));

// Connect Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "Portfolio API", Version = "v1" });
    }
);


builder.Services.AddControllers();
var app = builder.Build();

// Connect Swagger UI in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
