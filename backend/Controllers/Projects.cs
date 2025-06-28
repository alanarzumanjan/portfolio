using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ProjectsController(AppDbContext db)
    {
        this._db = db;
    }

    [HttpGet]
    public async Task<ActionResult<List<Project>>> GetProjects()
    {
        var projects = await _db.Projects
            .Include(p => p.Reviews)
            .ThenInclude(r => r.Reactions)
            .ToListAsync();

        return Ok(projects);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Project>> GetProjectById(Guid id)
    {
        try
        {
            var project = await _db.Projects
                .Include(p => p.Reviews)
                .ThenInclude(r => r.Reactions)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error with including project: {ex.Message}");
            return StatusCode(500, "Error with including project.");
        }
    }

    // [HttpPost]
    // public async Task<ActionResult<Project>> AddProject()
    // {

    // }

}