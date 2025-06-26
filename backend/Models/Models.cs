namespace Models;

public class Review
{
    public Guid id { get; set; }
    public string? username { get; set; }
    public string? comment { get; set; }
    public int rating { get; set; } // Assuming rating is an integer
    public DateTime createdAt { get; set; }
}

public class Projects
{
    public Guid id { get; set; }
    public string? title { get; set; }
    public string? description { get; set; }
    public string? imageUrl { get; set; }
    public string? githubUrl { get; set; }
    public string? liveUrl { get; set; }
    public List<Review>? reviews { get; set; }
}