using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;

namespace EventManagementAPI.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public string Description { get; set; }

        public ICollection<Event> Events { get; set; }
    }
}
