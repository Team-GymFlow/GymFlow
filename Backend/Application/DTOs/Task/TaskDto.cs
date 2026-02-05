namespace Application.DTOs.Task;

public class TaskDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Status { get; set; } = "New";
    public DateTime CreatedAt { get; set; }
    public int ProjectId { get; set; }
}
