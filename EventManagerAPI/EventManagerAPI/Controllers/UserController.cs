using EventManagerAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using EventManagerAPI.Models;

namespace EventManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDto registrationDto)
        {
            var user = new User
            {
                Email = registrationDto.Email,
                Name = registrationDto.Name,
                Role = "User" // Default role
            };

            var result = await _userService.RegisterAsync(user, registrationDto.Password);

            if (result)
                return Ok(new { message = "User registered successfully" });

            return BadRequest(new { message = "Email already exists" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto loginDto)
        {
            var (accessToken, refreshToken) = await _userService.AuthenticateAsync(loginDto.Email, loginDto.Password);

            if (accessToken == null)
                return Unauthorized(new { message = "Invalid email or password" });

            return Ok(new { accessToken, refreshToken });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenDto tokenDto)
        {
            var (accessToken, refreshToken) = await _userService.RefreshTokenAsync(tokenDto.AccessToken, tokenDto.RefreshToken);

            if (accessToken == null)
                return BadRequest(new { message = "Invalid token" });

            return Ok(new { accessToken, refreshToken });
        }

        [Authorize]
        [HttpGet("profile")]
        public IActionResult GetProfile()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userEmail = User.FindFirst(ClaimTypes.Email).Value;
            var userRole = User.FindFirst(ClaimTypes.Role).Value;

            return Ok(new { userId, userEmail, userRole });
        }
    }
}
