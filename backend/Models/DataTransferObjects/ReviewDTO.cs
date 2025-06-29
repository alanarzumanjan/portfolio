public class ReviewDTO
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public string? Username { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; }
}