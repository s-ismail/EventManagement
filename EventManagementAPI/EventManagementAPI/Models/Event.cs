using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace EventManagementAPI.Models
{
    public class Event
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public int VenueId { get; set; }
        public Venue Venue { get; set; }

        [Required]
        public string Status { get; set; }

        public int CategoryId { get; set; }
        [Required]
        public Category Category { get; set; }

        [AllowNull]
        public string ImagePath { get; set; }

        public ICollection<Guest> Guests { get; set; } = new List<Guest>();
        public ICollection<Vendor> Vendors { get; set; } = new List<Vendor>();
        public int CurrentGuestCount { get; set; } = 0;
    }
}
