using Application.DTOs.Exercises;
using Application.Interfaces;
using Application.Mappings;

namespace Application.Services;

public class ExerciseService
{
    private readonly IExerciseRepository _repo;

    public ExerciseService(IExerciseRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<ExerciseDto>> GetAllAsync()
    {
        var exercises = await _repo.GetAllAsync();
        return exercises.Select(e => e.ToDto());
    }

    public async Task<ExerciseDto?> GetByIdAsync(int id)
    {
        var exercise = await _repo.GetByIdAsync(id);
        return exercise is null ? null : exercise.ToDto();
    }

    public async Task<ExerciseDto> CreateAsync(ExerciseCreateDto dto)
    {
        var entity = dto.ToEntity();
        await _repo.AddAsync(entity);
        return entity.ToDto();
    }

    public async Task<bool> UpdateAsync(int id, ExerciseUpdateDto dto)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing is null) return false;

        dto.UpdateEntity(existing);
        await _repo.UpdateAsync(existing);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing is null) return false;

        await _repo.DeleteAsync(existing);
        return true;
    }
}
