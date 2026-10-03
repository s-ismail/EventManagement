using EventManagementAPI.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using EventManagementAPI.Data;
using EventManagementAPI.Models;
using BCrypt.Net;
using EventManagementAPI.Services;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using EventManagementAPI.Repositories;

namespace EventManagementAPI.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly TokenBlacklistService _tokenBlacklistService;
        private readonly IUserRepository _userService;

        public UsersController(IConfiguration configuration, TokenBlacklistService tokenBlacklistService, IUserRepository userService)
        {
            _configuration = configuration;
            _tokenBlacklistService = tokenBlacklistService;
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (string.IsNullOrEmpty(dto.Username) || string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password))
            {
                return BadRequest(new { message = "Username, Email, and Password are required." });
            }

            var result = await _userService.RegisterUserAsync(dto);
            if (result)
            {
                return Ok(new { message = "User registered successfully." });
            }
            return BadRequest(new { message = "User registration failed." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _userService.ValidateUserAsync(dto);

            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            var token = JwtHelper.GenerateToken(user, _configuration);
            return Ok(new { message = "User logged in successfully.", token });
        }

        [Authorize]
        [HttpGet("profile")]
        public IActionResult GetProfile()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User ID is missing from token claims.");
            }

            var user = _userService.GetUserProfile(userIdClaim);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest("No token provided");
            }

            _tokenBlacklistService.BlacklistToken(token);
            _tokenBlacklistService.CleanupExpiredTokens();
            return Ok(new { message = "Logged out successfully." });
        }

        [Authorize]
        [HttpPost("refreshToken")]
        public IActionResult RefreshToken()
        {
            var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest("No token provided");
            }

            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

            if (jsonToken == null)
            {
                return BadRequest("Invalid token");
            }

            var userIdClaim = jsonToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
            {
                return BadRequest("Invalid user ID in token");
            }

            var user = _userService.GetUserProfile(userId.ToString());
            if (user == null)
            {
                return NotFound("User not found");
            }

            _tokenBlacklistService.BlacklistToken(token);
            _tokenBlacklistService.CleanupExpiredTokens();

            var newToken = JwtHelper.GenerateToken(user, _configuration);

            return Ok(new { message = "Token refreshed successfully.", token = newToken });
        }

        // New admin endpoints

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UpdateUserDto dto)
        {
            var result = await _userService.UpdateUserAsync(id, dto);
            if (!result)
                return NotFound();
            return Ok(new { message = "User updated successfully." });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUserAsync(id);
            if (!result)
                return NotFound();
            return Ok(new { message = "User deleted successfully." });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("{id}/ban")]
        public async Task<IActionResult> BanUser(int id)
        {
            var result = await _userService.BanUserAsync(id);
            if (!result)
                return NotFound();
            return Ok(new { message = "User banned successfully." });
        }
    }
}
