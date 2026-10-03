using EventManagementAPI.Models;
using EventManagementAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EventManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EventController : ControllerBase
    {
        private readonly EventService _eventService;

        public EventController(EventService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventReadDto>>> GetAllEvents()
        {
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            var events = await _eventService.GetAllEventsAsync(userRole);
            return Ok(events);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EventReadDto>> GetEvent(int id)
        {
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            var @event = await _eventService.GetEventByIdAsync(id, userRole);
            if (@event == null) return NotFound();
            return Ok(@event);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<EventReadDto>> CreateEvent([FromBody] EventCreateDto eventCreateDto)
        {
            var createdEvent = await _eventService.CreateEventAsync(eventCreateDto);
            return CreatedAtAction(nameof(GetEvent), new { id = createdEvent.Id }, createdEvent);
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<EventReadDto>> UpdateEvent(int id, [FromBody] EventUpdateDto eventUpdateDto)
        {
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            var updatedEvent = await _eventService.UpdateEventAsync(id, eventUpdateDto);
            if (updatedEvent == null) return NotFound();
            return Ok(updatedEvent);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteEvent(int id)
        {
            var result = await _eventService.DeleteEventAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<EventReadDto>>> GetEventsByCategory(int categoryId)
        {
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            var events = await _eventService.GetEventsByCategoryAsync(categoryId, userRole);
            return Ok(events);
        }

        [HttpGet("venue/{venueId}")]
        public async Task<ActionResult<IEnumerable<EventReadDto>>> GetEventsByVenue(int venueId)
        {
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            var events = await _eventService.GetEventsByVenueAsync(venueId, userRole);
            return Ok(events);
        }

        [HttpGet("date/{date}")]
        public async Task<ActionResult<IEnumerable<EventReadDto>>> GetEventsByDate(DateTime date)
        {
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            var events = await _eventService.GetEventsByDateAsync(date, userRole);
            return Ok(events);
        }
        [Authorize(Roles = "Admin,User")]
        [HttpGet("{id}/guests")]
        public async Task<ActionResult<IEnumerable<GuestReadDto>>> GetEventGuests(int id)
        {
            var guests = await _eventService.GetEventGuestsAsync(id);
            return Ok(guests);
        }

        [HttpGet("{id}/vendors")]
        public async Task<ActionResult<IEnumerable<VendorReadDto>>> GetEventVendors(int id)
        {
            var vendors = await _eventService.GetEventVendorsAsync(id);
            return Ok(vendors);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string keyword)
        {
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            var events = await _eventService.SearchEventsAsync(keyword, userRole);
            if (!events.Any())
                return NotFound("No events found matching your criteria.");

            return Ok(events);
        }

        [HttpPost("{id}/participate")]
        public async Task<ActionResult<GuestReadDto>> ParticipateInEvent(int id)
        {
            var userFullName = User.FindFirst(ClaimTypes.Name)?.Value;
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(userFullName) || string.IsNullOrEmpty(userEmail))
            {
                return BadRequest("User information is incomplete");
            }

            try
            {
                var guestDto = await _eventService.ParticipateInEventAsync(id, userFullName, userEmail);
                return Ok(guestDto);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{id}/unregister")]
        public async Task<ActionResult> UnregisterFromEvent(int id)
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(userEmail))
            {
                return BadRequest("User email is missing");
            }

            try
            {
                var result = await _eventService.UnregisterFromEventAsync(id, userEmail);
                return Ok(new { message = "Successfully unregistered from event" });
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
