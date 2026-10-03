using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;

namespace EventManagementAPI.Models
{
    public class Venue
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public int Capacity { get; set; }

        public ICollection<Event> Events { get; set; }
    }
}
