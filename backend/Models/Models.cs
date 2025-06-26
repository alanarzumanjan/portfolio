namespace Models;

public class Review
{
    public Guid id { get; set; }
    public Guid project_id { get; set; }
    public string? username { get; set; }
    public string? comment { get; set; }
    public DateTime createdAt { get; set; }
    public List<Reaction>? Reactions { get; set; }
}

public class Project
{
    public Guid id { get; set; }
    public string? title { get; set; }
    public string? description { get; set; }
    public string? imageUrl { get; set; }
    public string? githubUrl { get; set; }
    public string? liveUrl { get; set; }
    public List<Review>? reviews { get; set; }
}

public class Reaction
{
    public Guid Id { get; set; }
    public Guid ReviewId { get; set; }
    public string? Emoji { get; set; }
    public DateTime CreatedAt { get; set; }
}
