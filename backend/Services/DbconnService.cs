using DotNetEnv;

public class DbConnectionService
{
    private static string? _cached;

    public static string TestDatabaseConnection()
    {
        // Cached connection string
        if (!string.IsNullOrWhiteSpace(_cached))
        {
            Console.WriteLine("ℹ️ Connection string retrieved from cache.");
            return _cached;
        }

        // Try load from .env only locally (if exists)
        var envPath = Path.Combine(Directory.GetCurrentDirectory(), ".env");
        if (File.Exists(envPath))
        {
            try
            {
                Env.Load(envPath);
                Console.WriteLine($"✅ .env loaded from {envPath}");
            }
            catch (Exception)
            {
                Console.WriteLine($"⚠️ Failed to load .env from {envPath}");
            }
        }
        else
        {
            Console.WriteLine("ℹ️ No .env file found. Assuming environment variables are provided.");
        }

        // Try get DB_PATH from env
        var DB_PATH = Environment.GetEnvironmentVariable("DB_PATH");
        if (string.IsNullOrWhiteSpace(DB_PATH))
        {
            throw new Exception("❌ DB_PATH environment variable is not set.");
        }

        // Absolute path check (optional)
        var fullDbPath = Path.GetFullPath(DB_PATH);
        if (!File.Exists(fullDbPath))
        {
            Console.WriteLine($"⚠️ database file not found. Expected at {fullDbPath}");
        }
        else
        {
            Console.WriteLine($"✅ Database found: {fullDbPath}");
        }

        Console.WriteLine("ℹ️ Using SQLite connection string...");
        _cached = $"Data Source={DB_PATH}";
        return _cached;
    }
}
