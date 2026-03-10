using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext db)
    {
        // Seed MuscleGroups if empty
        if (!await db.MuscleGroups.AnyAsync())
        {
            try
            {
                await db.Database.ExecuteSqlRawAsync(@"
                    SET IDENTITY_INSERT MuscleGroups ON;
                    INSERT INTO MuscleGroups (Id, Name) VALUES
                        (1, 'Chest'), (2, 'Biceps'), (3, 'Shoulders'), (4, 'Triceps'),
                        (5, 'Back'), (6, 'Quads'), (7, 'Hamstrings'), (8, 'Abs');
                    SET IDENTITY_INSERT MuscleGroups OFF;
                ");
            }
            catch
            {
                // Fallback: let DB assign IDs
                var names = new[] { "Chest", "Biceps", "Shoulders", "Triceps", "Back", "Quads", "Hamstrings", "Abs" };
                foreach (var name in names)
                    db.MuscleGroups.Add(new MuscleGroup { Name = name });
                await db.SaveChangesAsync();
            }
        }

        // Seed exercises if empty or only garbage data
        if (!await db.Exercises.AnyAsync(e => e.DifficultyLevel != 0 && e.YouTubeUrl != null && e.YouTubeUrl != "null" && e.YouTubeUrl != "string"))
        {
            // Remove old garbage data
            var oldExercises = await db.Exercises.ToListAsync();
            db.Exercises.RemoveRange(oldExercises);
            await db.SaveChangesAsync();

            var exercises = GetSeedExercises();
            db.Exercises.AddRange(exercises);
            await db.SaveChangesAsync();
        }
    }

    private static List<Exercise> GetSeedExercises()
    {
        return new List<Exercise>
        {
            // ========== CHEST (MuscleGroup 1) ==========
            // Easy
            Ex("Push Up", "Classic bodyweight push up for chest development.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=IODxDxX7oi4", 1),
            Ex("Dumbbell Fly", "Flat bench dumbbell fly targeting the chest.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=eozdVDA78K0", 1),
            Ex("Knee Push Up", "Modified push up on knees, great for beginners.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=jWxvty2KROs", 1),
            // Medium
            Ex("Incline Dumbbell Press", "Dumbbell press on an incline bench for upper chest.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=8iPEnn-ltC8", 1),
            Ex("Cable Chest Fly", "High cable fly for chest isolation.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=Iwe6AmxVf7o", 1),
            Ex("Dumbbell Bench Press", "Flat bench dumbbell press for overall chest.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=4Y2ZdHCOXok", 1),
            // Hard
            Ex("Barbell Bench Press", "The king of chest exercises with a barbell.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=rT7DgCr-3pg", 1),
            Ex("Weighted Dip", "Chest dips with added weight for advanced lifters.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=0326dy_-CzM", 1),
            Ex("Decline Barbell Press", "Barbell press on a decline bench for lower chest.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=rT7DgCr-3pg", 1),

            // ========== BICEPS (MuscleGroup 2) ==========
            // Easy
            Ex("Dumbbell Bicep Curl", "Standard dumbbell curls for bicep growth.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=in7PaeYlhrM", 2),
            Ex("Hammer Curl", "Neutral grip dumbbell curl targeting the brachialis.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=TwD-YGVP4Bk", 2),
            Ex("Concentration Curl", "Seated concentration curl for bicep peak.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=0AUGkch3tzc", 2),
            // Medium
            Ex("Barbell Curl", "Standing barbell curl for heavy bicep loading.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=in7PaeYlhrM", 2),
            Ex("Incline Dumbbell Curl", "Curls on an incline bench for a deep stretch.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=TwD-YGVP4Bk", 2),
            Ex("Cable Curl", "Cable machine curl for constant tension.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=0AUGkch3tzc", 2),
            // Hard
            Ex("Weighted Chin Up", "Chin ups with added weight for bicep strength.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=eGo4IYlbE5g", 2),
            Ex("Preacher Curl", "Strict curls on a preacher bench.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=in7PaeYlhrM", 2),
            Ex("Spider Curl", "Curls lying face-down on an incline bench.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=0AUGkch3tzc", 2),

            // ========== SHOULDERS (MuscleGroup 3) ==========
            // Easy
            Ex("Dumbbell Lateral Raise", "Side raises for shoulder width.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=3VcKaXpzqRo", 3),
            Ex("Dumbbell Shoulder Press", "Seated or standing dumbbell press.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=qEwKCR5JCog", 3),
            Ex("Face Pull", "Cable face pull for rear delts and posture.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=rep-qVOkqgk", 3),
            // Medium
            Ex("Arnold Press", "Rotating dumbbell press for all delt heads.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=qEwKCR5JCog", 3),
            Ex("Cable Lateral Raise", "Single arm cable lateral raise.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=3VcKaXpzqRo", 3),
            Ex("Rear Delt Fly", "Bent over fly for posterior deltoids.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=rep-qVOkqgk", 3),
            // Hard
            Ex("Barbell Overhead Press", "Standing barbell press for shoulder strength.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=qEwKCR5JCog", 3),
            Ex("Handstand Push Up", "Advanced bodyweight shoulder exercise.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=qEwKCR5JCog", 3),
            Ex("Heavy Lateral Raise", "High volume lateral raises with heavy weight.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=3VcKaXpzqRo", 3),

            // ========== TRICEPS (MuscleGroup 4) ==========
            // Easy
            Ex("Tricep Pushdown", "Cable pushdown for tricep isolation.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=2-LAMcpzODU", 4),
            Ex("Overhead Tricep Extension", "Dumbbell extension behind the head.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=nRiJVZDpdL0", 4),
            Ex("Bench Dip", "Dips using a bench, bodyweight tricep exercise.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=0326dy_-CzM", 4),
            // Medium
            Ex("Skull Crusher", "Lying tricep extension with barbell or EZ bar.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=d_KZxkY_0cM", 4),
            Ex("Close Grip Bench Press", "Narrow grip bench press targeting triceps.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=rT7DgCr-3pg", 4),
            Ex("Rope Pushdown", "Cable pushdown with rope attachment.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=2-LAMcpzODU", 4),
            // Hard
            Ex("Weighted Dip (Tricep)", "Parallel bar dips with added weight.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=0326dy_-CzM", 4),
            Ex("Diamond Push Up", "Hands close together push up for triceps.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=IODxDxX7oi4", 4),
            Ex("French Press", "Heavy overhead barbell tricep extension.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=nRiJVZDpdL0", 4),

            // ========== BACK (MuscleGroup 5) ==========
            // Easy
            Ex("Lat Pulldown", "Cable pulldown targeting the lats.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=SALxEARiMkw", 5),
            Ex("Seated Cable Row", "Cable row for mid-back thickness.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=kBWAon7ItDw", 5),
            Ex("Dumbbell Row", "Single arm dumbbell row for lat development.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=pYcpY20QaE8", 5),
            // Medium
            Ex("Barbell Row", "Bent over barbell row for back thickness.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=kBWAon7ItDw", 5),
            Ex("Pull Up", "Bodyweight pull up for lat width.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=eGo4IYlbE5g", 5),
            Ex("T-Bar Row", "T-bar row for overall back development.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=j3Igk5nyZE4", 5),
            // Hard
            Ex("Deadlift", "Full body compound lift, heavy back engagement.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=ytGaGIn3SjE", 5),
            Ex("Weighted Pull Up", "Pull ups with added weight for advanced lifters.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=XB_7En-zf_M", 5),
            Ex("Pendlay Row", "Explosive barbell row from the floor.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=kBWAon7ItDw", 5),

            // ========== QUADS (MuscleGroup 6) ==========
            // Easy
            Ex("Bodyweight Squat", "Basic squat for quad and glute development.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=aclHkVaku9U", 6),
            Ex("Walking Lunge", "Forward lunges for quads and balance.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=QOVaHwm-Q6U", 6),
            Ex("Leg Extension", "Machine exercise isolating the quadriceps.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=YyvSfVjQeL0", 6),
            // Medium
            Ex("Goblet Squat", "Dumbbell squat held at chest level.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=Dy28eq2PjcM", 6),
            Ex("Bulgarian Split Squat", "Single leg squat with rear foot elevated.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=2C-uNgKwPLE", 6),
            Ex("Leg Press", "Machine press for heavy quad loading.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=swZQC689o9U", 6),
            // Hard
            Ex("Barbell Back Squat", "Heavy barbell squat for quad strength.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=gsNoPYwWXeM", 6),
            Ex("Front Squat", "Barbell front squat for quad emphasis.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=Dy28eq2PjcM", 6),
            Ex("Hack Squat", "Machine squat targeting the quads.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=ljO4jkwv8wQ", 6),

            // ========== HAMSTRINGS (MuscleGroup 7) ==========
            // Easy
            Ex("Lying Leg Curl", "Machine leg curl for hamstring isolation.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=1Tq3QdYUuHs", 7),
            Ex("Glute Bridge", "Hip bridge for glutes and hamstrings.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=aclHkVaku9U", 7),
            Ex("Seated Leg Curl", "Machine curl in seated position.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=1Tq3QdYUuHs", 7),
            // Medium
            Ex("Romanian Deadlift", "Dumbbell or barbell RDL for hamstrings.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=ytGaGIn3SjE", 7),
            Ex("Good Morning", "Barbell hip hinge for posterior chain.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=ytGaGIn3SjE", 7),
            Ex("Nordic Curl", "Bodyweight hamstring curl for strength.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=1Tq3QdYUuHs", 7),
            // Hard
            Ex("Stiff Leg Deadlift", "Straight leg deadlift for deep hamstring stretch.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=ytGaGIn3SjE", 7),
            Ex("Single Leg RDL", "Unilateral Romanian deadlift for balance.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=ytGaGIn3SjE", 7),
            Ex("Sumo Deadlift", "Wide stance deadlift for hamstrings and glutes.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=ytGaGIn3SjE", 7),

            // ========== ABS (MuscleGroup 8) ==========
            // Easy
            Ex("Plank", "Isometric core hold for abdominal stability.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=ASdvN_XEl_c", 8),
            Ex("Crunches", "Basic abdominal crunch for upper abs.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=Xyd_fa5zoEU", 8),
            Ex("Dead Bug", "Lying core exercise for stability.", DifficultyLevel.Easy, "https://www.youtube.com/watch?v=ASdvN_XEl_c", 8),
            // Medium
            Ex("Leg Raise", "Hanging or lying leg raise for lower abs.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=l4kQd9eWclE", 8),
            Ex("Bicycle Crunch", "Rotating crunch targeting obliques.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=9FGilxCbdz8", 8),
            Ex("Russian Twist", "Seated twist with weight for obliques.", DifficultyLevel.Medium, "https://www.youtube.com/watch?v=Xyd_fa5zoEU", 8),
            // Hard
            Ex("Dragon Flag", "Advanced core exercise popularized by Bruce Lee.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=l4kQd9eWclE", 8),
            Ex("Ab Wheel Rollout", "Core rollout with an ab wheel.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=ASdvN_XEl_c", 8),
            Ex("Hanging Leg Raise", "Strict leg raise from a pull up bar.", DifficultyLevel.Hard, "https://www.youtube.com/watch?v=l4kQd9eWclE", 8),
        };
    }

    private static Exercise Ex(string name, string description, DifficultyLevel difficulty, string youtubeUrl, int muscleGroupId)
    {
        return new Exercise
        {
            Name = name,
            Description = description,
            DifficultyLevel = difficulty,
            YouTubeUrl = youtubeUrl,
            ExerciseMuscleGroups = new List<ExerciseMuscleGroup>
            {
                new ExerciseMuscleGroup { MuscleGroupId = muscleGroupId }
            }
        };
    }
}
