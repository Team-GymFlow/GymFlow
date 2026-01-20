using Domain.Enums;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
//using System.Data.Entity;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
       : base(options)
        {
        }

        public DbSet<Exercise> Exercises => Set<Exercise>();
        public DbSet<MuscleGroup> MuscleGroups => Set<MuscleGroup>();
        public DbSet<ExerciseMuscleGroup> ExerciseMuscleGroups => Set<ExerciseMuscleGroup>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Composite key for junction table
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

            // Store enum as string (important!)
            modelBuilder.Entity<Exercise>()
                .Property(e => e.DifficultyLevel)
                .HasConversion<string>();





            modelBuilder.Entity<MuscleGroup>().HasData(
               new MuscleGroup { Id = 1, Name = "Chest" },
               new MuscleGroup { Id = 2, Name = "Traps" },
               new MuscleGroup { Id = 3, Name = "Abs" },
               new MuscleGroup { Id = 4, Name = "Obliques" },
               new MuscleGroup { Id = 5, Name = "Biceps" },
               new MuscleGroup { Id = 6, Name = "Forearms" },
               new MuscleGroup { Id = 7, Name = "Quads" },
               new MuscleGroup { Id = 8, Name = "Lower legs" },
               new MuscleGroup { Id = 9, Name = "Front and side delts" },
               new MuscleGroup { Id = 10, Name = "Posterior delts" },
               new MuscleGroup { Id = 11, Name = "Upper/mid back" },
               new MuscleGroup { Id = 12, Name = "Lats" },
               new MuscleGroup { Id = 13, Name = "Lower back" },
               new MuscleGroup { Id = 14, Name = "Triceps" },
               new MuscleGroup { Id = 15, Name = "Glutes" },
                 new MuscleGroup { Id = 16, Name = "Hamstrings" }

            );


            modelBuilder.Entity<Exercise>().HasData(
                new Exercise { Id = 1, Name = "Bench Press", DifficultyLevel = DifficultyLevel.Intermediate },
                new Exercise { Id = 2, Name = "Squat", DifficultyLevel = DifficultyLevel.Intermediate },
                new Exercise { Id = 3, Name = "Deadlift", DifficultyLevel = DifficultyLevel.Advanced },
                new Exercise { Id = 4, Name = "Bicep Curl", DifficultyLevel = DifficultyLevel.Beginner },
                new Exercise { Id = 5, Name = "Tricep Pushdown", DifficultyLevel = DifficultyLevel.Beginner },
                new Exercise { Id = 6, Name = "Crunches", DifficultyLevel = DifficultyLevel.Beginner },
                new Exercise { Id = 7, Name = "Russian Twist", DifficultyLevel = DifficultyLevel.Intermediate },
                new Exercise { Id = 8, Name = "Overhead Shoulder Press", DifficultyLevel = DifficultyLevel.Intermediate },
                new Exercise { Id = 9, Name = "Rear Delt Fly", DifficultyLevel = DifficultyLevel.Intermediate },
                new Exercise { Id = 10, Name = "Barbell Row", DifficultyLevel = DifficultyLevel.Intermediate },
                new Exercise { Id = 11, Name = "Pull-Up", DifficultyLevel = DifficultyLevel.Advanced },
                new Exercise { Id = 12, Name = "Back Extension", DifficultyLevel = DifficultyLevel.Intermediate },
                new Exercise { Id = 13, Name = "Glute Bridge", DifficultyLevel = DifficultyLevel.Intermediate},
                new Exercise { Id = 14, Name = "Hamstring Curl", DifficultyLevel = DifficultyLevel.Intermediate },
                new Exercise { Id = 15, Name = "Calf Raise", DifficultyLevel = DifficultyLevel.Beginner },
                new Exercise { Id = 16, Name = "Tibialis Raise", DifficultyLevel = DifficultyLevel.Beginner },
                new Exercise { Id = 17, Name = "Forearm Curl", DifficultyLevel = DifficultyLevel.Beginner }
             );


            modelBuilder.Entity<ExerciseMuscleGroup>().HasData(
                new ExerciseMuscleGroup { ExerciseId = 1, MuscleGroupId = 1 },  // Bench Press → Chest
                new ExerciseMuscleGroup { ExerciseId = 1, MuscleGroupId = 9 },  // Bench Press → Front & Side Delts

                new ExerciseMuscleGroup { ExerciseId = 2, MuscleGroupId = 7 },  // Squat → Quads
                new ExerciseMuscleGroup { ExerciseId = 2, MuscleGroupId = 15 }, // Squat → Glutes

                new ExerciseMuscleGroup { ExerciseId = 3, MuscleGroupId = 13 }, // Deadlift → Lower Back
                new ExerciseMuscleGroup { ExerciseId = 3, MuscleGroupId = 15 }, // Deadlift → Glutes

                new ExerciseMuscleGroup { ExerciseId = 4, MuscleGroupId = 5 },  // Biceps

                new ExerciseMuscleGroup { ExerciseId = 5, MuscleGroupId = 14 }, // Triceps

                new ExerciseMuscleGroup { ExerciseId = 6, MuscleGroupId = 3 },  // Abs
                new ExerciseMuscleGroup { ExerciseId = 7, MuscleGroupId = 4 },  // Obliques

                new ExerciseMuscleGroup { ExerciseId = 8, MuscleGroupId = 9 },  // Front & Side Delts
                new ExerciseMuscleGroup { ExerciseId = 9, MuscleGroupId = 10 }, // Posterior Delts

                new ExerciseMuscleGroup { ExerciseId = 10, MuscleGroupId = 11 }, // Upper/Mid Back
                new ExerciseMuscleGroup { ExerciseId = 11, MuscleGroupId = 12 }, // Lats
                new ExerciseMuscleGroup { ExerciseId = 12, MuscleGroupId = 13 }, // Lower Back

                new ExerciseMuscleGroup { ExerciseId = 13, MuscleGroupId = 15 }, // Glutes
                new ExerciseMuscleGroup { ExerciseId = 14, MuscleGroupId = 16 }, // Hamstrings

                new ExerciseMuscleGroup { ExerciseId = 15, MuscleGroupId = 8 },  // Calves
                new ExerciseMuscleGroup { ExerciseId = 16, MuscleGroupId = 8 },  // Tibialis
                new ExerciseMuscleGroup { ExerciseId = 17, MuscleGroupId = 6 }   // Forearms
            );
        }
    }
}
