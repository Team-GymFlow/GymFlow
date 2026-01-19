using Application.Interfaces;
using Domain.Entities;

namespace Application.Services;

public class TaskService
{
    private readonly ITaskRepository _taskRepository;

    public TaskService(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<IEnumerable<TaskItem>> GetAllAsync()
        => await _taskRepository.GetAllAsync();

    public async Task<TaskItem> CreateAsync(TaskItem task)
    {
        task.Status ??= "New";
        task.CreatedAt = DateTime.UtcNow;

        await _taskRepository.AddAsync(task);
        return task;
    }

    public async Task UpdateAsync(TaskItem task)
        => await _taskRepository.UpdateAsync(task);

    public async Task DeleteAsync(int id)
    {
        var task = await _taskRepository.GetByIdAsync(id);
        if (task is null) return;

        await _taskRepository.DeleteAsync(task);
    }
}
