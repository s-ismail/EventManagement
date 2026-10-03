using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;

namespace EventManagementAPI.Models
{
    public class Vendor
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string ServiceType { get; set; }

        [Required]
        public string ContactInfo { get; set; }

        public ICollection<Event> Events { get; set; }
    }
}
