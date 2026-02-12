using Application.DTOs.Exercises;
using Domain.Entities;
using Domain.Enums;

namespace Application.Mappings;

public static class ExerciseMapping
{
    public static ExerciseDto ToDto(this Exercise e)
    {
        return new ExerciseDto
        {
            Id = e.Id,
            Name = e.Name,
            Description = e.Description,
            DifficultyLevel = (int)e.DifficultyLevel,
            ImageUrl = e.ImageUrl, // ✅ NYTT
            YouTubeUrl = e.YouTubeUrl,
            MuscleGroupIds = e.ExerciseMuscleGroups
                .Select(x => x.MuscleGroupId)
                .Distinct()
                .ToList()
        };
    }

    public static Exercise ToEntity(this ExerciseCreateDto dto)
    {
        var exercise = new Exercise
        {
            Name = dto.Name.Trim(),
            Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim(),
            DifficultyLevel = MapDifficulty(dto.DifficultyLevel),
            YouTubeUrl = string.IsNullOrWhiteSpace(dto.YouTubeUrl) ? null : dto.YouTubeUrl.Trim(),
            ImageUrl = string.IsNullOrWhiteSpace(dto.ImageUrl) ? null : dto.ImageUrl.Trim(), // ✅ NYTT
            ExerciseMuscleGroups = new List<ExerciseMuscleGroup>() // ✅ viktigt om den inte initieras i entity
        };

        // ✅ skapa kopplingar i join-tabellen
        if (dto.MuscleGroupIds != null)
        {
            foreach (var mgId in dto.MuscleGroupIds.Distinct())
            {
                if (mgId <= 0) continue;

                exercise.ExerciseMuscleGroups.Add(new ExerciseMuscleGroup
                {
                    Exercise = exercise,   // ✅ säkert (valfritt men bra)
                    MuscleGroupId = mgId
                });
            }
        }

        return exercise;
    }

    public static void UpdateEntity(this ExerciseUpdateDto dto, Exercise exercise)
    {
        exercise.Name = dto.Name.Trim();
        exercise.Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim();

        if (dto.DifficultyLevel.HasValue)
            exercise.DifficultyLevel = MapDifficulty(dto.DifficultyLevel);

        // ✅ NYTT
        if (dto.ImageUrl is not null)
            exercise.ImageUrl = string.IsNullOrWhiteSpace(dto.ImageUrl) ? null : dto.ImageUrl.Trim();

        if (dto.YouTubeUrl != null)
            exercise.YouTubeUrl = string.IsNullOrWhiteSpace(dto.YouTubeUrl) ? null : dto.YouTubeUrl.Trim();
     }


    private static DifficultyLevel MapDifficulty(int? level)
    {
        var v = level ?? (int)DifficultyLevel.Easy;

        if (!Enum.IsDefined(typeof(DifficultyLevel), v))
            throw new ArgumentException("DifficultyLevel måste vara 1, 2 eller 3.");

        return (DifficultyLevel)v;
    }
}
