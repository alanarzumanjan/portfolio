using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class ReactionsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ReactionsController(AppDbContext db)
    {
        this._db = db;
    }

    [HttpPost("{review_id}")]
    public async Task<ActionResult<Reaction>> AddReaction(Guid review_id, [FromBody] ReactionDTO request)
    {
        try
        {
            var review = await _db.Reviews
                .Include(r => r.Reactions)
                .FirstOrDefaultAsync(r => r.Id == review_id);

            if (review == null)
                return NotFound($"Review with id {review_id} not found");

            using var transaction = await _db.Database.BeginTransactionAsync();

            var reaction = review.Reactions?
                .FirstOrDefault(r => r.Emoji == request.Emoji);

            if (string.IsNullOrWhiteSpace(request.Emoji) || request.Emoji.Length > 2)
                return BadRequest("Invalid emoji");

            if (reaction != null)
            {
                reaction.Count += 1;
                await _db.SaveChangesAsync();
                await transaction.CommitAsync();

                var message = $"Reaction {reaction.Emoji} updated on review {review.Id}.";
                Console.WriteLine(message);
                return Ok(new { message, data = reaction });
            }
            else
            {
                var newReaction = new Reaction
                {
                    Id = Guid.NewGuid(),
                    ReviewId = review_id,
                    Emoji = request.Emoji,
                    Count = 1,
                    CreatedAt = DateTime.UtcNow
                };

                _db.Reactions.Add(newReaction);
                await _db.SaveChangesAsync();
                await transaction.CommitAsync();

                var message = $"Reaction {newReaction.Emoji} is added on review {review.Id}.";
                Console.WriteLine(message);
                return Ok(new
                {
                    message,
                    data = new ReactionResponseDTO
                    {
                        Id = newReaction.Id,
                        Emoji = newReaction.Emoji,
                        Count = newReaction.Count,
                        CreatedAt = newReaction.CreatedAt
                    }
                });
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Failed to add reaction: {ex.Message}");
            return StatusCode(500, "Failed to add reaction.");
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<Reaction>>> GetReactions()
    {
        try
        {
            var reactions = await _db.Reactions
                .ToListAsync();

            var message = $"Reaction list is showed";
            Console.WriteLine(message);
            return Ok(new { message, data = reactions });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Failed to show reaction list: {ex.Message}");
            return StatusCode(500, "Failed to show reaction list.");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Reaction>> GetReactionById(Guid id)
    {
        try
        {
            var reaction = await _db.Reactions.FindAsync(id);
            if (reaction == null)
                return NotFound();

            var message = $"Reaction {reaction.Id} is showed";
            Console.WriteLine(message);
            return Ok(new { message, data = reaction });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Failed to show reaction: {ex.Message}");
            return StatusCode(500, "Failed to show reaction.");
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Reaction>> DeleteReaction(Guid id)
    {
        try
        {
            using var transaction = await _db.Database.BeginTransactionAsync();
            var reaction = await _db.Reactions.FindAsync(id);
            if (reaction == null)
                return NotFound();

            if (reaction.Count > 1)
            {
                reaction.Count -= 1;
            }
            else
            {
                _db.Reactions.Remove(reaction);
            }

            await _db.SaveChangesAsync();
            await transaction.CommitAsync();

            var message = $"Reaction {reaction.Id} is deleted";
            Console.WriteLine(message);
            return Ok(new { message, data = reaction });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Failed to show reaction: {ex.Message}");
            return StatusCode(500, "Failed to show reaction.");
        }
    }
    [HttpDelete("review/{reviewId}")]
    public async Task<IActionResult> RemoveReaction(Guid reviewId, [FromQuery] string emoji)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(emoji) || emoji.Length > 2)
                return BadRequest("Invalid emoji");

            using var transaction = await _db.Database.BeginTransactionAsync();

            var reaction = await _db.Reactions
                .FirstOrDefaultAsync(r => r.ReviewId == reviewId && r.Emoji == emoji);

            if (reaction == null)
                return NotFound("Reaction not found");

            if (reaction.Count > 1)
            {
                reaction.Count -= 1;
            }
            else
            {
                _db.Reactions.Remove(reaction);
            }

            await _db.SaveChangesAsync();
            await transaction.CommitAsync();

            return Ok(new
            {
                message = $"Reaction {emoji} removed from review {reviewId}.",
                data = reaction
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Failed to remove reaction: {ex.Message}");
            return StatusCode(500, "Failed to remove reaction.");
        }
    }
}