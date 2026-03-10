using Application.DTOs.Auth;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserRepository _userRepo;
    private readonly JwtTokenService _jwt;
    private readonly PasswordService _pw;

    public AuthController(IUserRepository userRepo, JwtTokenService jwt, PasswordService pw)
    {
        _userRepo = userRepo;
        _jwt = jwt;
        _pw = pw;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto dto)
    {
        var email = dto.Email?.Trim().ToLower();
        var name = dto.Name?.Trim();

        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(dto.Password))
            return BadRequest("Email and password are required.");

        var existing = await _userRepo.GetByEmailAsync(email);
        if (existing != null)
            return BadRequest("Email already exists.");

        var user = new User
        {
            Email = email,
            Name = string.IsNullOrWhiteSpace(name) ? "User" : name,
            Role = "User",
            PasswordHash = _pw.Hash(dto.Password)
        };

        await _userRepo.AddAsync(user);

        return Ok("User created.");
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginRequestDto dto)
    {
        var email = dto.Email?.Trim().ToLower();

        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(dto.Password))
            return Unauthorized("Wrong email or password.");

        var user = await _userRepo.GetByEmailAsync(email);
        if (user is null)
            return Unauthorized("Wrong email or password.");

        if (!_pw.Verify(user.PasswordHash, dto.Password))
            return Unauthorized("Wrong email or password.");

        var token = _jwt.CreateToken(user);

        return Ok(new LoginResponseDto
        {
            Token = token,
            Role = user.Role,
            Email = user.Email
        });
    }
}
