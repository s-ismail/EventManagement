namespace EventManagementAPI.Models
{
    public class EventReadDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public int VenueId { get; set; }
        public string VenueName { get; set; }
        public string Status { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public List<GuestReadDto> Guests { get; set; } = new List<GuestReadDto>();
        public List<VendorReadDto> Vendors { get; set; } = new List<VendorReadDto>();
        public string ImageUrl { get; set; }
        public int CurrentGuestCount { get; set; }
    }
}
