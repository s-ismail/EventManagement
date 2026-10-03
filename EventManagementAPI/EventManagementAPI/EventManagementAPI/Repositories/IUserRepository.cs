using EventManagementAPI.Models;
using BCrypt.Net;

namespace EventManagementAPI.Repositories
{
    public interface IUserRepository
    {
        Task<bool> RegisterUserAsync(RegisterDto dto);
        Task<User> ValidateUserAsync(LoginDto dto);
        User GetUserProfile(string userId);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(int userId);
        Task<bool> UpdateUserAsync(int userId, UpdateUserDto dto);
        Task<bool> DeleteUserAsync(int userId);
        Task<bool> BanUserAsync(int userId);
    }

}
