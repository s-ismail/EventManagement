using EventManagementAPI.Models;
using EventManagementAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GuestController : ControllerBase
    {
        private readonly GuestService _guestService;

        public GuestController(GuestService guestService)
        {
            _guestService = guestService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GuestReadDto>>> GetAllGuests()
        {
            var guests = await _guestService.GetAllGuestsAsync();
            return Ok(guests);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GuestReadDto>> GetGuest(int id)
        {
            var guest = await _guestService.GetGuestByIdAsync(id);
            if (guest == null) return NotFound();
            return Ok(guest);
        }

        [HttpPost]
        public async Task<ActionResult<GuestReadDto>> CreateGuest(GuestCreateDto guestCreateDto)
        {
            var createdGuest = await _guestService.CreateGuestAsync(guestCreateDto);
            return CreatedAtAction(nameof(GetGuest), new { id = createdGuest.Id }, createdGuest);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GuestReadDto>> UpdateGuest(int id, GuestUpdateDto guestUpdateDto)
        {
            var updatedGuest = await _guestService.UpdateGuestAsync(id, guestUpdateDto);
            if (updatedGuest == null) return NotFound();
            return Ok(updatedGuest);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteGuest(int id)
        {
            var result = await _guestService.DeleteGuestAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
