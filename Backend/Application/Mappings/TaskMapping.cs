using Application.DTOs.Task;
using Domain.Entities;

namespace Application.Mappings;

public static class TaskMapping
{
    public static TaskDto ToDto(this TaskItem task)
    {
        return new TaskDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Status = task.Status,
            CreatedAt = task.CreatedAt,
            ProjectId = task.ProjectId
        };
    }

    public static TaskItem ToEntity(this TaskCreateDto dto)
    {
        return new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            ProjectId = dto.ProjectId,
            Status = "New",
            CreatedAt = DateTime.UtcNow
        };
    }

    public static void UpdateEntity(this TaskUpdateDto dto, TaskItem task)
    {
        task.Title = dto.Title;
        task.Description = dto.Description;
        task.Status = dto.Status;
        task.ProjectId = dto.ProjectId;
    }
}
