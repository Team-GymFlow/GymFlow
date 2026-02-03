using Application.DTOs.Exercises;
using Domain.Entities;
using Domain.Enums;

namespace Application.Mappings;

public static class ExerciseMapping
{
    public static ExerciseDto ToDto(this Exercise exercise)
    {
        return new ExerciseDto
        {
            Id = exercise.Id,
            Name = exercise.Name,
            Description = exercise.Description,
            DifficultyLevel = exercise.DifficultyLevel.ToString()
        };
    }

    public static Exercise ToEntity(this ExerciseCreateDto dto)
    {
        return new Exercise
        {
            Name = dto.Name,
            Description = dto.Description ?? "",

            DifficultyLevel = dto.DifficultyLevel.HasValue
                ? (DifficultyLevel)dto.DifficultyLevel.Value
                : DifficultyLevel.Easy
        };
    }

    public static void UpdateEntity(this ExerciseUpdateDto dto, Exercise exercise)
    {
        exercise.Name = dto.Name;
        exercise.Description = dto.Description ?? "";

        if (dto.DifficultyLevel.HasValue)
            exercise.DifficultyLevel = (DifficultyLevel)dto.DifficultyLevel.Value;
    }
}
