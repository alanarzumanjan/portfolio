using Microsoft.EntityFrameworkCore;
using Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Reaction> Reactions { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Project> Projects { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Review>()
            .HasMany(r => r.Reactions)
            .WithOne(r => r.Review)
            .HasForeignKey(r => r.ReviewId);

        builder.Entity<Project>()
            .HasMany(p => p.Reviews)
            .WithOne(r => r.Project)
            .HasForeignKey(r => r.ProjectId);
    }
}