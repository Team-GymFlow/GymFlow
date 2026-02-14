using Application.DTOs.Projects;
using Domain.Entities;

namespace Application.Mappings;

public static class ProjectMappings
{
    public static Project ToEntity(this ProjectCreateDto dto)
    {
        return new Project
        {
            Name = dto.Name,
            Description = dto.Description
            // UserId sätts i service från token
        };
    }

    public static ProjectDto ToDto(this Project entity)
    {
        return new ProjectDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            UserId = entity.UserId
        };
    }

    public static void UpdateEntity(this ProjectUpdateDto dto, Project entity)
    {
        entity.Name = dto.Name;
        entity.Description = dto.Description;
    }
}
