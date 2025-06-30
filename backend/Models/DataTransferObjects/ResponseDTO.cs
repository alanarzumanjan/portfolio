public class ReactionResponseDTO
{
    public Guid Id { get; set; }
    public string? Emoji { get; set; }
    public int Count { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class ReviewResponseDTO
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public string? Username { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<ReactionResponseDTO>? Reactions { get; set; }
}