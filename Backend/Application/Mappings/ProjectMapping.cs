using Application.DTOs.Projects;
using Domain.Entities;

namespace Application.Mappings;

public static class ProjectMapping
{
    public static ProjectDto ToDto(this Project project)
        => new()
        {
            Id = project.Id,
            Name = project.Name,
            Description = project.Description
        };

    public static Project ToEntity(this ProjectCreateDto dto)
        => new()
        {
            Name = dto.Name,
            Description = dto.Description
        };

    public static void UpdateEntity(this ProjectUpdateDto dto, Project project)
    {
        project.Name = dto.Name;
        project.Description = dto.Description;
    }
}
