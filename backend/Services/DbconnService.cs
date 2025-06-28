using DotNetEnv;

public class DbConnectionService
{
    private static string? _cached;

    public static string TestDatabaseConnection()
    {
        // Cached connection string check
        if (!string.IsNullOrWhiteSpace(_cached))
        {
            Console.WriteLine("ℹ️ Connection string retrieved from cache.");
            return _cached;
        }

        var envPath = Path.Combine(Directory.GetCurrentDirectory(), ".env");

        // .env file check
        if (!File.Exists(envPath))
        {
            throw new Exception("❌ .env is not found.\n Please create '.env' file in /backend folder.");
        }

        try
        {
            Env.Load(envPath);
            Console.WriteLine($"✅ .env loaded from {envPath}");
        }
        catch (Exception)
        {
            throw new Exception($"❌ Error for loading .env from {envPath}");
        }

        // Database path check
        var DB_PATH = Environment.GetEnvironmentVariable("DB_PATH");
        if (string.IsNullOrWhiteSpace(DB_PATH))
        {
            throw new Exception("❌ DB_PATH is not provided in '.env'.\n Please write DB_PATH like as in README.md example");
        }

        // Database file check
        var fulldb_path = Path.GetFullPath(DB_PATH);
        if (!File.Exists(fulldb_path))
        {
            Console.WriteLine($"⚠️ database is not created. Waited on path {fulldb_path}.");
        }
        else
        {
            Console.WriteLine($"✅ Database founded: {fulldb_path}");
        }

        // Cache and return
        _cached = $"Data Source={DB_PATH}";
        return _cached;
    }
}