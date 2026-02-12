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

    public async Task<List<ExerciseDto>> GetAllAsync()
    {
        var exercises = await _repo.GetAllAsync();
        return exercises.Select(x => x.ToDto()).ToList();
    }

    public async Task<ExerciseDto?> GetByIdAsync(int id)
    {
        var exercise = await _repo.GetByIdAsync(id);
        return exercise is null ? null : exercise.ToDto();
    }

    public async Task<ExerciseDto> CreateAsync(ExerciseCreateDto dto)
    {
        var entity = dto.ToEntity();
        var created = await _repo.AddAsync(entity);
        return created.ToDto();
    }

    public async Task<bool> UpdateAsync(int id, ExerciseUpdateDto dto)
    {
        var exercise = await _repo.GetByIdAsync(id);
        if (exercise is null) return false;

        dto.UpdateEntity(exercise);
        return await _repo.UpdateAsync(exercise);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var exercise = await _repo.GetByIdAsync(id);
        if (exercise is null) return false;

        return await _repo.DeleteAsync(exercise);
    }

    public async Task<List<ExerciseDto>> GetByMuscleGroupAsync(int muscleGroupId)
    {
        var exercises = await _repo.GetByMuscleGroupAsync(muscleGroupId);
        return exercises.Select(x => x.ToDto()).ToList();
    }
}
