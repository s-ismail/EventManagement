using System.ComponentModel.DataAnnotations;

namespace EventManagementAPI.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        public string Role { get; set; }
        public string FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string ProfilePictureUrl { get; set; }
        public bool IsBanned { get; set; }
    }

}
