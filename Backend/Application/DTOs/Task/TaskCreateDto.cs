namespace Application.DTOs.Task;

public class TaskCreateDto
{
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public int ProjectId { get; set; }
}