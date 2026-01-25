<<<<<<< HEAD
﻿using Domain.Entities;
using Domain.Models;
=======
﻿using Domain.Models;
using Domain.Entities;
>>>>>>> feature/repository-and-services
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

<<<<<<< HEAD
        // ===== ANNAS DBSETS =====
=======
        // ===== ANNAS BEFINTLIGA DBSETS (RÖR EJ) =====
>>>>>>> feature/repository-and-services
        public DbSet<Exercise> Exercises => Set<Exercise>();
        public DbSet<MuscleGroup> MuscleGroups => Set<MuscleGroup>();
        public DbSet<ExerciseMuscleGroup> ExerciseMuscleGroups => Set<ExerciseMuscleGroup>();

<<<<<<< HEAD
        // ===== ERA DBSETS =====
=======
        // ===== ERA NYA DBSETS =====
>>>>>>> feature/repository-and-services
        public DbSet<TaskItem> Tasks => Set<TaskItem>();
        public DbSet<Project> Projects => Set<Project>();
        public DbSet<User> Users => Set<User>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

<<<<<<< HEAD
            // ===== ANNAS KONFIGURATION =====
=======
            // ===== ANNAS KONFIGURATION (RÖR EJ) =====
>>>>>>> feature/repository-and-services
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

<<<<<<< HEAD
            // ===== ERA RELATIONER =====
=======
            // ===== ERA NYA RELATIONER =====
>>>>>>> feature/repository-and-services
            modelBuilder.Entity<Project>()
                .HasMany(p => p.Tasks)
                .WithOne(t => t.Project)
                .HasForeignKey(t => t.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
