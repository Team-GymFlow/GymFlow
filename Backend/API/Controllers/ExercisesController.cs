using Application.DTOs.Exercises;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExercisesController : ControllerBase
{
    private readonly ExerciseService _service;

    public ExercisesController(ExerciseService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<ExerciseDto>>> GetAll()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ExerciseDto>> GetById(int id)
    {
        var exercise = await _service.GetByIdAsync(id);
        return exercise is null ? NotFound() : Ok(exercise);
    }

    [HttpGet("by-muscle/{muscleGroupId:int}")]
    public async Task<ActionResult<List<ExerciseDto>>> GetByMuscle(int muscleGroupId)
        => Ok(await _service.GetByMuscleGroupAsync(muscleGroupId));

    [HttpPost]
    public async Task<ActionResult<ExerciseDto>> Create([FromBody] ExerciseCreateDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] ExerciseUpdateDto dto)
        => (await _service.UpdateAsync(id, dto)) ? NoContent() : NotFound();

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
        => (await _service.DeleteAsync(id)) ? NoContent() : NotFound();
}
