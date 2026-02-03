namespace Application.DTOs.Task;

public class TaskUpdateDto
{
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string Status { get; set; } = "New";
    public int ProjectId { get; set; }
}
