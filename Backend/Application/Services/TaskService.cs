using Application.DTOs.Task;
using Application.Interfaces;
using Application.Mappings;

namespace Application.Services;

public class TaskService
{
    private readonly ITaskRepository _repo;

    public TaskService(ITaskRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<TaskDto>> GetAllAsync()
    {
        var tasks = await _repo.GetAllAsync();
        return tasks.Select(t => t.ToDto());
    }

    public async Task<TaskDto?> GetByIdAsync(int id)
    {
        var task = await _repo.GetByIdAsync(id);
        return task is null ? null : task.ToDto();
    }

    public async Task<TaskDto> CreateAsync(TaskCreateDto dto)
    {
        var entity = dto.ToEntity();
        await _repo.AddAsync(entity);
        return entity.ToDto();
    }

    public async Task<bool> UpdateAsync(int id, TaskUpdateDto dto)
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
