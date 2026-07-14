using Microsoft.AspNetCore.Mvc;
using AuthService.Application.DTOs;
using AuthService.Application.Interfaces;

namespace AuthService.Api.Controllers;

[ApiController]
[Route("api/v1/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);
        if (!result.Success)
            return Unauthorized(result);

        return Ok(result);
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);
        if (!result.Success)
            return BadRequest(result);

        return Ok(result);
    }

    [HttpGet("user/{id}")]
    public async Task<ActionResult<UserDto>> GetUser(Guid id)
    {
        var user = await _authService.GetUserByIdAsync(id);
        if (user == null)
            return NotFound(new { success = false, message = "Usuario no encontrado" });

        return Ok(user);
    }

    [HttpGet("check")]
    public IActionResult Check()
    {
        return Ok(new { message = "Auth Service is running" });
    }
}
