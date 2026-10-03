namespace EventManagementAPI.Models
{
    public class GuestReadDto
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public string EventName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
