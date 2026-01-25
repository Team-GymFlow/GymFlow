namespace Domain.Entities;

public class Project
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    // Navigation
    public List<TaskItem> Tasks { get; set; } = new();
}
