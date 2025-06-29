using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Controllers;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class ReviewsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ReviewsController(AppDbContext db)
    {
        this._db = db;
    }

    [HttpPost("{project_id}")]
    public async Task<ActionResult<Review>> AddReview(Guid project_id, [FromBody] ReviewDTO review)
    {
        try
        {
            var project = await _db.Projects.FindAsync(project_id);
            if (project == null)
                return NotFound();

            var newReview = new Review
            {
                Id = Guid.NewGuid(),
                ProjectId = project_id,
                Username = review.Username,
                Comment = review.Comment,
                CreatedAt = DateTime.UtcNow
            };

            using var transaction = await _db.Database.BeginTransactionAsync();
            _db.Reviews.Add(newReview);
            await _db.SaveChangesAsync();
            await transaction.CommitAsync();

            var message = $"> Review '{newReview.Comment}' on {project.Title} is added";
            Console.WriteLine(message);
            return Ok(new { message, data = review });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Failed to create review: {ex.Message}");
            return StatusCode(500, "Failed to create review.");
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<Review>>> GetReviews()
    {
        try
        {
            var reviews = await _db.Reviews
                .Include(r => r.Reactions)
                .ToListAsync();

            var message = $"> Reviews list is showed";
            Console.WriteLine(message);
            return Ok(new { message, data = reviews });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Failed to including review list: {ex.Message}");
            return StatusCode(500, "Failed to including review list.");
        }
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<Review>> EditReview(Guid review_id, [FromBody] ReviewDTO request)
    {
        try
        {
            var review = await _db.Reviews.FindAsync(review_id);
            if (review == null)
                return NotFound();

            using var transaction = await _db.Database.BeginTransactionAsync();
            if (request.Username != null) review.Username = request.Username;
            if (request.Comment != null) review.Comment = request.Comment;

            await _db.SaveChangesAsync();
            await transaction.CommitAsync();

            var message = $"> Review {review.Id} is edited";
            Console.WriteLine(message);
            return Ok(new { message, data = review });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Failed to edit review: {ex.Message}");
            return StatusCode(500, "Failed to edit review.");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Review>> GetReviewById(Guid id)
    {
        try
        {
            var review = await _db.Reviews.FindAsync(id);
            if (review == null)
                return NotFound();

            var message = $"> Review {review.Id} is showed";
            Console.WriteLine(message);
            return Ok(new { message, data = review });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Failed to including review: {ex.Message}");
            return StatusCode(500, "Failed to including review.");
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Review>> DeleteReviewById(Guid id)
    {
        try
        {
            var review = await _db.Reviews.FindAsync(id);
            if (review == null)
                return NotFound();

            using var transaction = await _db.Database.BeginTransactionAsync();
            _db.Reviews.Remove(review);
            await _db.SaveChangesAsync();
            await transaction.CommitAsync();

            var message = $"> Review {review.Id} is deleted";
            Console.WriteLine(message);
            return Ok(new { message, data = review });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Failed to delete review: {ex.Message}");
            return StatusCode(500, "Failed to delete review.");
        }
    }
}