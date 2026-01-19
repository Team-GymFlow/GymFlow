using Domain.Models;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // ===== ANNAS BEFINTLIGA DBSETS (RÖR EJ) =====
        public DbSet<Exercise> Exercises => Set<Exercise>();
        public DbSet<MuscleGroup> MuscleGroups => Set<MuscleGroup>();
        public DbSet<ExerciseMuscleGroup> ExerciseMuscleGroups => Set<ExerciseMuscleGroup>();

        // ===== ERA NYA DBSETS =====
        public DbSet<TaskItem> Tasks => Set<TaskItem>();
        public DbSet<Project> Projects => Set<Project>();
        public DbSet<User> Users => Set<User>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ===== ANNAS KONFIGURATION (RÖR EJ) =====
            modelBuilder.Entity<ExerciseMuscleGroup>()
                .HasKey(emg => new { emg.ExerciseId, emg.MuscleGroupId });

            modelBuilder.Entity<ExerciseMuscleGroup>()
                .HasOne(emg => emg.Exercise)
                .WithMany(e => e.ExerciseMuscleGroups)
                .HasForeignKey(emg => emg.ExerciseId);

            modelBuilder.Entity<ExerciseMuscleGroup>()
                .HasOne(emg => emg.MuscleGroup)
                .WithMany(m => m.ExerciseMuscleGroups)
                .HasForeignKey(emg => emg.MuscleGroupId);

            modelBuilder.Entity<Exercise>()
                .Property(e => e.DifficultyLevel)
                .HasConversion<string>();

            // ===== ERA NYA RELATIONER =====
            modelBuilder.Entity<Project>()
                .HasMany(p => p.Tasks)
                .WithOne(t => t.Project)
                .HasForeignKey(t => t.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
