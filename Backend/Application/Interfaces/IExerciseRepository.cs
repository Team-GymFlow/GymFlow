using Domain.Entities;

namespace Application.Interfaces;

public interface IExerciseRepository
{
    Task<List<Exercise>> GetAllAsync();
    Task<Exercise?> GetByIdAsync(int id);
    Task<Exercise> AddAsync(Exercise exercise);
    Task<bool> UpdateAsync(Exercise exercise);
    Task<bool> DeleteAsync(Exercise exercise);
}
