using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace EventManagementAPI.Models
{
    public class EventCreateDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int VenueId { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public List<int> VendorIds { get; set; }

        [Required]
        public string ImageUrl { get; set; }
    }
}
