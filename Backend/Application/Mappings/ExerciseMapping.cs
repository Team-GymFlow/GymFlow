using Application.DTOs.Exercises;
using Domain.Entities;
using Domain.Enums;

namespace Application.Mappings;

public static class ExerciseMapping
{
    // =========================
    // Entity -> DTO
    // =========================
    public static ExerciseDto ToDto(this Exercise e)
    {
        return new ExerciseDto
        {
            Id = e.Id,
            Name = e.Name,
            Description = e.Description,
            YouTubeUrl = e.YouTubeUrl,

            // enum -> int
            DifficultyLevel = (int)e.DifficultyLevel,

            ImageUrl = e.ImageUrl,

            MuscleGroupIds = e.ExerciseMuscleGroups
                .Select(x => x.MuscleGroupId)
                .Distinct()
                .ToList()
        };
    }

    // =========================
    // Create DTO -> Entity
    // =========================
    public static Exercise ToEntity(this ExerciseCreateDto dto)
    {
        return new Exercise
        {
            Name = dto.Name.Trim(),
            Description = string.IsNullOrWhiteSpace(dto.Description)
                ? null
                : dto.Description.Trim(),

            // int -> enum
            DifficultyLevel = (DifficultyLevel)dto.DifficultyLevel,

            ImageUrl = string.IsNullOrWhiteSpace(dto.ImageUrl)
                ? null
                : dto.ImageUrl.Trim(),

            YouTubeUrl = string.IsNullOrWhiteSpace(dto.YouTubeUrl)
                ? null
                : dto.YouTubeUrl.Trim(),

            ExerciseMuscleGroups = dto.MuscleGroupIds?
                .Distinct()
                .Where(id => id > 0)
                .Select(id => new ExerciseMuscleGroup
                {
                    MuscleGroupId = id
                })
                .ToList()
                ?? new List<ExerciseMuscleGroup>()
        };
    }

    // =========================
    // Update DTO -> Entity
    // =========================
    public static void UpdateEntity(this ExerciseUpdateDto dto, Exercise exercise)
    {
        exercise.Name = dto.Name.Trim();
        exercise.Description = string.IsNullOrWhiteSpace(dto.Description)
            ? null
            : dto.Description.Trim();

        if (dto.DifficultyLevel.HasValue)
        {
            // int? -> enum
            exercise.DifficultyLevel = (DifficultyLevel)dto.DifficultyLevel.Value;
        }

        if (dto.ImageUrl != null)
            exercise.ImageUrl = string.IsNullOrWhiteSpace(dto.ImageUrl)
                ? null
                : dto.ImageUrl.Trim();

        if (dto.YouTubeUrl != null)
            exercise.YouTubeUrl = string.IsNullOrWhiteSpace(dto.YouTubeUrl)
                ? null
                : dto.YouTubeUrl.Trim();
    }
}
