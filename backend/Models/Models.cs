namespace Models;

public class Review
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public string? Username { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; }

    public Project? Project { get; set; }
    public List<Reaction>? Reactions { get; set; }
}

public class Project
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public string? GithubUrl { get; set; }
    public string? LiveUrl { get; set; }

    public List<Review> Reviews { get; set; } = new();
}

public class Reaction
{
    public Guid Id { get; set; }
    public Guid ReviewId { get; set; }
    public string? Emoji { get; set; }
    public DateTime CreatedAt { get; set; }

    public Review Review { get; set; } = new();
}
