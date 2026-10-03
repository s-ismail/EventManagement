using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;

namespace EventManagementAPI.Models
{
    public class Guest
    {
        [Key]
        public int Id { get; set; }

        public int EventId { get; set; }
        public Event Event { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

    }
}
