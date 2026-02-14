using Application.DTOs.Projects;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ProjectService _service;

    public ProjectsController(ProjectService service)
    {
        _service = service;
    }

    // ✅ Alla får läsa
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetAll()
        => Ok(await _service.GetAllAsync());

    // ✅ Alla får läsa
    [HttpGet("{id:int}")]
    [AllowAnonymous]
    public async Task<ActionResult<ProjectDto>> GetById(int id)
    {
        var project = await _service.GetByIdAsync(id);
        if (project is null) return NotFound();
        return Ok(project);
    }

    // 🔒 Bara Admin får skapa
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProjectDto>> Create([FromBody] ProjectCreateDto dto)
    {
        var userIdClaim =
            User.FindFirstValue(ClaimTypes.NameIdentifier) ??
            User.FindFirstValue("nameid") ??
            User.FindFirstValue("sub");

        if (!int.TryParse(userIdClaim, out var userId))
            return Unauthorized("Invalid user id in token.");

        var created = await _service.CreateAsync(dto, userId);
        return Ok(created);
    }

    // 🔒 Bara Admin får uppdatera
    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] ProjectUpdateDto dto)
    {
        var ok = await _service.UpdateAsync(id, dto);
        if (!ok) return NotFound();
        return NoContent();
    }

    // 🔒 Bara Admin får ta bort
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var ok = await _service.DeleteAsync(id);
        if (!ok) return NotFound();
        return NoContent();
    }
}
