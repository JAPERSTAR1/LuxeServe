using LuxeServe.Models.DTOs;
using LuxeServe.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LuxeServe.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _authService.LoginAsync(request.Email, request.Password);
            if (token == null)
            {
                return Unauthorized(new { Message = "Invalid email or password." });
            }

            return Ok(new { Message = "Login successful.", Token = token });
        }

        [HttpPost("register/patron")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterPatron([FromBody] RegisterPatronRequest request)
        {
            var success = await _authService.RegisterPatronAsync(
                request.FirstName,
                request.LastName,
                request.PhoneNumber,
                request.Email,
                request.Password
            );

            if (!success)
            {
                return BadRequest(new { Message = "Failed to register patron. Email may already be in use or data is invalid." });
            }

            return Ok(new { Message = "Patron registered successfully." });
        }

        [HttpPost("register/staff")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterStaff([FromBody] RegisterStaffRequest request)
        {
            var success = await _authService.RegisterStaffAsync(
                request.FirstName,
                request.LastName,
                request.Email,
                request.Password,
                request.Role
            );

            if (!success)
            {
                return BadRequest(new { Message = "Failed to register staff member. Email may already be in use or data is invalid." });
            }

            return Ok(new { Message = "Staff registered successfully." });
        }
    }
}