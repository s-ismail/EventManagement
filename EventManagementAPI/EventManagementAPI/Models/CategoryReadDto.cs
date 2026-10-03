namespace EventManagementAPI.Models
{
    public class CategoryReadDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int EventCount { get; set; }
    }
}
