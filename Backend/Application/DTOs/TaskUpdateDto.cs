using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class TaskUpdateDto
{
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string Status { get; set; } = "New";
    public int ProjectId { get; set; }
}
