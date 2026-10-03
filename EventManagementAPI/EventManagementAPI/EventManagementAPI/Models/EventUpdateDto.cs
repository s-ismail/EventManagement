using System.Diagnostics.CodeAnalysis;

namespace EventManagementAPI.Models
{
    public class EventUpdateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public int VenueId { get; set; }
        public string Status { get; set; }
        public int CategoryId { get; set; }
        public List<int> GuestsIds { get; set; } = new List<int>();
        public List<int> VendorIds { get; set; } = new List<int>();
        [AllowNull]
        public string ImageUrl { get; set; }
        public int CurrentGuestCount { get; set; }
    }
}
