using EventManagementAPI.Data;
using EventManagementAPI.Models;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using EventManagementAPI.Repositories;
using System.Linq;

namespace EventManagementAPI.Services
{
    public class UserService : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IGuestRepository _guestRepository;
        private readonly IEventRepository _eventRepository;

        public UserService(
            ApplicationDbContext context,
            IGuestRepository guestRepository,
            IEventRepository eventRepository)
        {
            _context = context;
            _guestRepository = guestRepository;
            _eventRepository = eventRepository;
        }

        public async Task<String> RegisterUserAsync(RegisterDto dto)
        {
            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "User",
                FullName = string.IsNullOrEmpty(dto.FullName) ? "Default FullName" : dto.FullName,
                ProfilePictureUrl = "https://example.com/default-profile.jpg"
            };
            var i = _context.Users.Any(u => user.Email == u.Email);

            if (i)
            {
                return "email_exists";
            }
            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
            catch
            {
                return "db_error";
            }

            return "success";
        }

        public async Task<User> ValidateUserAsync(LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null || user.Password == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return null;
            }

            return user;
        }

        public User GetUserProfile(string userId)
        {
            return _context.Users.Find(int.Parse(userId));
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await _context.Users.FindAsync(userId);
        }

        public async Task<bool> UpdateUserAsync(int userId, UpdateUserDto dto)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return false;

            user.Username = dto.Username ?? user.Username;
            user.Email = dto.Email ?? user.Email;
            user.FullName = dto.FullName ?? user.FullName;
            user.Role = dto.Role ?? user.Role;
            user.DateOfBirth = dto.DateOfBirth ?? user.DateOfBirth;
            if (!string.IsNullOrEmpty(dto.Password))
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return false;

            // Get the user's email before deleting
            string userEmail = user.Email;

            // Find all guests with the same email as the user
            var guests = await _context.Guests
                .Where(g => g.Email == userEmail)
                .ToListAsync();

            // Process each guest
            foreach (var guest in guests)
            {
                // Get the event associated with this guest (including Venue)
                var eventItem = await _eventRepository.GetByIdAsync(guest.EventId, include: e => e.Include(e => e.Venue));
                if (eventItem != null)
                {
                    // Decrement the guest count
                    eventItem.CurrentGuestCount = Math.Max(0, eventItem.CurrentGuestCount - 1);

                    // If the event was fully booked, update its status
                    if (eventItem.Status == "Fully-booked" && eventItem.Venue != null)
                    {
                        if (eventItem.CurrentGuestCount < eventItem.Venue.Capacity)
                        {
                            eventItem.Status = "Available";
                        }
                    }

                    // Update the event
                    await _eventRepository.UpdateAsync(eventItem);
                }

                // Delete the guest
                await _guestRepository.DeleteAsync(guest.Id);
            }

            // Finally, delete the user
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> BanUserAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return false;

            user.IsBanned = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
