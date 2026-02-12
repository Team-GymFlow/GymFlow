using Application.DTOs.Auth;
using Application.Services;
using Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly JwtTokenService _jwt;
    private readonly PasswordService _pw;

    public AuthController(AppDbContext db, JwtTokenService jwt, PasswordService pw)
    {
        _db = db;
        _jwt = jwt;
        _pw = pw;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto dto)
    {
        var email = dto.Email?.Trim().ToLower();
        var name = dto.Name?.Trim();

        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(dto.Password))
            return BadRequest("Email och lösenord krävs.");

        var exists = await _db.Users.AnyAsync(u => u.Email == email);
        if (exists) return BadRequest("Email finns redan.");

        var user = new Domain.Entities.User
        {
            Email = email,
            Name = string.IsNullOrWhiteSpace(name) ? "User" : name,
            Role = "User",
            PasswordHash = _pw.Hash(dto.Password)
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return Ok("User skapad.");
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginRequestDto dto)
    {
        var email = dto.Email?.Trim().ToLower();

        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(dto.Password))
            return Unauthorized("Fel email eller lösenord.");

        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user is null) return Unauthorized("Fel email eller lösenord.");

        if (!_pw.Verify(user.PasswordHash, dto.Password))
            return Unauthorized("Fel email eller lösenord.");

        var token = _jwt.CreateToken(user);

        return Ok(new LoginResponseDto
        {
            Token = token,
            Role = user.Role,
            Email = user.Email
        });
    }
}
