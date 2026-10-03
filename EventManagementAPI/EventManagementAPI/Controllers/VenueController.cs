using EventManagementAPI.Models;
using EventManagementAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class VenueController : ControllerBase
    {
        private readonly VenueService _venueService;

        public VenueController(VenueService venueService)
        {
            _venueService = venueService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VenueReadDto>>> GetAllVenues()
        {
            var venues = await _venueService.GetAllVenuesAsync();
            return Ok(venues);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VenueReadDto>> GetVenue(int id)
        {
            var venue = await _venueService.GetVenueByIdAsync(id);
            if (venue == null) return NotFound();
            return Ok(venue);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VenueReadDto>> CreateVenue(VenueCreateDto venueCreateDto)
        {
            var createdVenue = await _venueService.CreateVenueAsync(venueCreateDto);
            return CreatedAtAction(nameof(GetVenue), new { id = createdVenue.Id }, createdVenue);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VenueReadDto>> UpdateVenue(int id, VenueUpdateDto venueUpdateDto)
        {
            var updatedVenue = await _venueService.UpdateVenueAsync(id, venueUpdateDto);
            if (updatedVenue == null) return NotFound();
            return Ok(updatedVenue);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteVenue(int id)
        {
            var result = await _venueService.DeleteVenueAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
