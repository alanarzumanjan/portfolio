using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
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

    [HttpPost]
    public async Task<ActionResult<Project>> AddProject([FromBody] ProjectDTO request)
    {
        var project = new Project
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Description = request.Description,
            ImageUrl = request.ImageUrl,
            GithubUrl = request.GithubUrl,
            LiveUrl = request.LiveUrl,
            Reviews = new List<Review>()
        };

        _db.Projects.Add(project);
        await _db.SaveChangesAsync();

        return Ok(project);
    }
    [HttpPatch("{id}")]
    public async Task<ActionResult<Project>> PatchProject(Guid id, [FromBody] ProjectDTO request)
    {
        var project = await _db.Projects.FindAsync(id);

        if (project == null)
            return NotFound();

        if (request.Title != null) project.Title = request.Title;
        if (request.Description != null) project.Description = request.Description;
        if (request.GithubUrl != null) project.GithubUrl = request.GithubUrl;
        if (request.LiveUrl != null) project.LiveUrl = request.LiveUrl;
        if (request.ImageUrl != null) project.ImageUrl = request.ImageUrl;

        await _db.SaveChangesAsync();

        return Ok(project);
    }

}