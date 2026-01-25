using Application.DTOs.Exercises;
using Domain.Models;

namespace Application.Mapping;

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

    public static Exercise ToEntity(this CreateExerciseDto dto)
    {
        return new Exercise
        {
            Name = dto.Name,
            Description = dto.Description,
            DifficultyLevel = Enum.Parse<DifficultyLevel>(dto.DifficultyLevel)
        };
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> feature/repository-and-services
