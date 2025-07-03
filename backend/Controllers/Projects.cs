using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Text.RegularExpressions;

namespace Controllers;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ProjectsController(AppDbContext db)
    {
        this._db = db;
    }

    [HttpPost]
    public async Task<ActionResult<Project>> AddProject([FromBody] ProjectDTO request)
    {
        try
        {
            var project = new Project
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Description = request.Description,
                Languages = request.Languages,
                Technologies = request.Technologies,
                ImageUrl = request.ImageUrl,
                GithubUrl = request.GithubUrl,
                LiveUrl = request.LiveUrl,
                Reviews = new List<Review>()
            };

            using var transaction = await _db.Database.BeginTransactionAsync();
            _db.Projects.Add(project);
            await _db.SaveChangesAsync();
            await transaction.CommitAsync();

            var message = $"> Project {project.Title} is added";
            Console.WriteLine(message);
            return Ok(new { message, data = project });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Failed to create project: {ex.Message}");
            return StatusCode(500, "Failed to create project.");
        }
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<Project>> PatchProject(Guid id, [FromBody] ProjectDTO request)
    {
        try
        {
            var project = await _db.Projects.FindAsync(id);

            if (project == null)
                return NotFound();

            var message = $"> Project {project.Title} is edited";

            using var transaction = await _db.Database.BeginTransactionAsync();
            if (request.Title != null) project.Title = request.Title;
            if (request.Description != null) project.Description = request.Description;
            if (request.Languages != null) project.Languages = request.Languages;
            if (request.Technologies != null) project.Technologies = request.Technologies;
            if (request.GithubUrl != null) project.GithubUrl = request.GithubUrl;
            if (request.LiveUrl != null) project.LiveUrl = request.LiveUrl;
            if (request.ImageUrl != null) project.ImageUrl = request.ImageUrl;

            await _db.SaveChangesAsync();
            await transaction.CommitAsync();

            Console.WriteLine(message);
            return Ok(new { message, data = project });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Failed to edit project: {ex.Message}");
            return StatusCode(500, "Failed to edit project.");
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<Project>>> GetProjects()
    {
        try
        {
            var projects = await _db.Projects
             .Include(p => p.Reviews)
             .ThenInclude(r => r.Reactions)
             .ToListAsync();

            var message = $"> Projects list is showed";
            Console.WriteLine(message);
            return Ok(new { message, data = projects });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error with including project list: {ex.Message}");
            return StatusCode(500, "Error with including project list.");
        }
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

            var message = $"> Project {project.Title} is showed";
            Console.WriteLine(message);
            return Ok(new { message, data = project });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error with including project: {ex.Message}");
            return StatusCode(500, "Error with including project.");
        }
    }

    [HttpGet("{id}/readme")]
    public async Task<ActionResult> GetReadme(Guid id)
    {
        try
        {
            var project = await _db.Projects.FindAsync(id);
            if (project == null || string.IsNullOrWhiteSpace(project.GithubUrl))
                return NotFound("Project or GitHub URL not found");

            var match = Regex.Match(project.GithubUrl, @"github\.com/([^/]+)/([^/]+)");
            if (!match.Success)
                return BadRequest("Invalid GitHub URL");

            var username = match.Groups[1].Value;
            var repo = match.Groups[2].Value;

            var readmeUrl = $"https://raw.githubusercontent.com/{username}/{repo}/main/README.md";

            using var httpClient = new HttpClient();
            var readme = await httpClient.GetStringAsync(readmeUrl);
            var message = $"Readme for id:{project.Id} showed";
            Console.WriteLine(message);
            return Ok(new { message, content = readme });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Failed to show readme: {ex.Message}");
            return StatusCode(500, "Failed to show readme.");
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Project>> DeleteProject(Guid id)
    {
        try
        {
            var project = await _db.Projects.FindAsync(id);

            if (project == null)
                return NotFound();

            using var transaction = await _db.Database.BeginTransactionAsync();
            _db.Projects.Remove(project);
            await _db.SaveChangesAsync();
            await transaction.CommitAsync();

            var message = $"> Project {project.Title} is deleted";
            Console.WriteLine(message);
            return Ok(new { message, data = project });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Failed to delete project: {ex.Message}");
            return StatusCode(500, "Failed to delete project.");
        }
    }
}