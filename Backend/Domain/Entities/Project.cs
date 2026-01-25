<<<<<<< HEAD
﻿namespace Domain.Entities;
=======
namespace Domain.Entities;
>>>>>>> feature/repository-and-services

public class Project
{
    public int Id { get; set; }
<<<<<<< HEAD

    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    // Navigation
    public List<TaskItem> Tasks { get; set; } = new();
=======
    public string Name { get; set; } = null!;
    public string? Description { get; set; }

    public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
>>>>>>> feature/repository-and-services
}
