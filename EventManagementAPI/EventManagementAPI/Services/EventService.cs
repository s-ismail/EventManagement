using EventManagementAPI.Models;
using EventManagementAPI.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EventManagementAPI.Services
{
    public class EventService
    {
        private readonly IEventRepository _eventRepository;
        private readonly IVenueRepository _venueRepository;
        private readonly IGuestRepository _guestRepository;
        private readonly IVendorRepository _vendorRepository;
        private readonly IWebHostEnvironment _environment;
        private const string DefaultImageName = "default-event-image.jpg";

        public EventService(IEventRepository eventRepository, IVenueRepository venueRepository, IGuestRepository guestRepository, IVendorRepository vendorRepository, IWebHostEnvironment environment)
        {
            _eventRepository = eventRepository;
            _venueRepository = venueRepository;
            _guestRepository = guestRepository;
            _vendorRepository = vendorRepository;
            _environment = environment;
        }

        public async Task<IEnumerable<EventReadDto>> GetAllEventsAsync(string userRole = null)
        {
            var events = await _eventRepository.GetAllAsync(include: e => e
                .Include(e => e.Venue)
                .Include(e => e.Vendors)
                .Include(e => e.Category));

            return events.Select(e => new EventReadDto
            {
                Id = e.Id,
                Name = e.Name,
                Description = e.Description,
                Date = e.Date,
                VenueId = e.VenueId,
                VenueName = e.Venue?.Name,
                Status = e.Status,
                CategoryId = e.CategoryId,
                CategoryName = e.Category?.Name,
                Guests = userRole == "Admin" ?
                    _eventRepository.GetEventGuestsAsync(e.Id).Result.Select(g => new GuestReadDto
                    {
                        Id = g.Id,
                        Name = g.Name,
                        Email = g.Email,
                    }).ToList() :
                    new List<GuestReadDto>(), // Empty list for non-admin users
                Vendors = e.Vendors.Select(v => new VendorReadDto
                {
                    Id = v.Id,
                    Name = v.Name,
                    ServiceType = v.ServiceType,
                    ContactInfo = v.ContactInfo
                }).ToList(),
                ImageUrl = e.ImagePath,
                CurrentGuestCount = e.CurrentGuestCount
            });
        }

        public async Task<EventReadDto?> GetEventByIdAsync(int id, string userRole = null)
        {
            var @event = await _eventRepository.GetByIdAsync(id, include: e => e
                .Include(e => e.Venue)
                .Include(e => e.Vendors)
                .Include(e => e.Category));

            if (@event == null) return null;

            return new EventReadDto
            {
                Id = @event.Id,
                Name = @event.Name,
                Description = @event.Description,
                Date = @event.Date,
                VenueId = @event.VenueId,
                VenueName = @event.Venue?.Name,
                Status = @event.Status,
                CategoryId = @event.CategoryId,
                CategoryName = @event.Category?.Name,
                Guests = userRole == "Admin" ?
                    _eventRepository.GetEventGuestsAsync(@event.Id).Result.Select(g => new GuestReadDto
                    {
                        Id = g.Id,
                        Name = g.Name,
                        Email = g.Email,
                    }).ToList() :
                    new List<GuestReadDto>(), // Empty list for non-admin users
                Vendors = @event.Vendors.Select(v => new VendorReadDto
                {
                    Id = v.Id,
                    Name = v.Name,
                    ServiceType = v.ServiceType,
                    ContactInfo = v.ContactInfo
                }).ToList(),
                ImageUrl = @event.ImagePath,
                CurrentGuestCount = @event.CurrentGuestCount
            };
        }

        public async Task<EventReadDto> CreateEventAsync(EventCreateDto eventCreateDto)
        {
            var venue = await _venueRepository.GetByIdAsync(eventCreateDto.VenueId);
            if (venue == null) throw new ArgumentException("Invalid venue ID");

            var vendors = await _vendorRepository.GetManyByIdsAsync(eventCreateDto.VendorIds);
            if (vendors.Count() != eventCreateDto.VendorIds.Count)
                throw new ArgumentException("One or more invalid vendor IDs");

            var @event = new Event
            {
                Name = eventCreateDto.Name,
                Description = eventCreateDto.Description,
                Date = eventCreateDto.Date,
                VenueId = eventCreateDto.VenueId,
                Status = "Available",
                CategoryId = eventCreateDto.CategoryId,
                Guests = new List<Guest>(),
                Vendors = vendors.ToList(),
                ImagePath = eventCreateDto.ImageUrl,
                CurrentGuestCount = 0
            };

            @event = await _eventRepository.CreateAsync(@event);

            return new EventReadDto
            {
                Id = @event.Id,
                Name = @event.Name,
                Description = @event.Description,
                Date = @event.Date,
                VenueId = @event.VenueId,
                VenueName = venue.Name,
                Status = @event.Status,
                CategoryId = @event.CategoryId,
                Guests = new List<GuestReadDto>(),
                Vendors = @event.Vendors.Select(v => new VendorReadDto
                {
                    Id = v.Id,
                    Name = v.Name,
                    ServiceType = v.ServiceType,
                    ContactInfo = v.ContactInfo
                }).ToList(),
                ImageUrl = @event.ImagePath,
            };
        }

        public async Task<EventReadDto?> UpdateEventAsync(int id, EventUpdateDto eventUpdateDto, string userRole = null)
        {
            var @event = await _eventRepository.GetByIdAsync(id, include: e => e
                .Include(e => e.Vendors)
                .Include(e => e.Category)
                .Include(e => e.Venue));
            if (@event == null) return null;

            @event.Id = id;
            @event.Name = eventUpdateDto.Name;
            @event.Description = eventUpdateDto.Description;
            @event.Date = eventUpdateDto.Date;
            @event.VenueId = eventUpdateDto.VenueId;
            @event.Status = eventUpdateDto.Status;
            @event.CategoryId = eventUpdateDto.CategoryId;

            var guests = await _eventRepository.GetEventGuestsAsync(id);
            if (guests.Count() != eventUpdateDto.GuestsIds.Count)
                throw new ArgumentException("One or more invalid Guests IDs");
            @event.Guests.Clear();
            foreach (var guest  in guests)
            {
                @event.Guests.Add(guest);
            }

            var vendors = await _vendorRepository.GetManyByIdsAsync(eventUpdateDto.VendorIds);
            if (vendors.Count() != eventUpdateDto.VendorIds.Count)
                throw new ArgumentException("One or more invalid vendor IDs");

            @event.Vendors.Clear();
            foreach (var vendor in vendors)
            {
                @event.Vendors.Add(vendor);
            }

            if (eventUpdateDto.ImageUrl != null)
            {
                @event.ImagePath = eventUpdateDto.ImageUrl;
            }
            @event.CurrentGuestCount = eventUpdateDto.CurrentGuestCount;

            await _eventRepository.UpdateAsync(@event);

            return new EventReadDto
            {
                Id = @event.Id,
                Name = @event.Name,
                Description = @event.Description,
                Date = @event.Date,
                VenueId = @event.VenueId,
                VenueName = @event.Venue?.Name,
                Status = @event.Status,
                CategoryId = @event.CategoryId,
                CategoryName = @event.Category?.Name,
                Guests = userRole == "Admin" ?
                    _eventRepository.GetEventGuestsAsync(@event.Id).Result.Select(g => new GuestReadDto
                    {
                        Id = g.Id,
                        Name = g.Name,
                        Email = g.Email,
                    }).ToList() :
                    new List<GuestReadDto>(), // Empty list for non-admin users
                Vendors = @event.Vendors.Select(v => new VendorReadDto
                {
                    Id = v.Id,
                    Name = v.Name,
                    ServiceType = v.ServiceType,
                    ContactInfo = v.ContactInfo
                }).ToList(),
                ImageUrl = @event.ImagePath,
                CurrentGuestCount = @event.CurrentGuestCount
            };
        }

        public async Task<bool> DeleteEventAsync(int id)
        {
            var @event = await _eventRepository.GetByIdAsync(id);
            if (@event == null) return false;

            await _eventRepository.DeleteAsync(id);
            return true;
        }


        public async Task<IEnumerable<EventReadDto>> GetEventsByCategoryAsync(int CategoryId, string? userRole = null)
        {
            var events = await _eventRepository.GetEventsByCategoryAsync(CategoryId);
            return events.Select(e => new EventReadDto
            {
                Id = e.Id,
                Name = e.Name,
                Description = e.Description,
                Date = e.Date,
                VenueId = e.VenueId,
                VenueName = e.Venue?.Name,
                Status = e.Status,
                CategoryId = e.CategoryId,
                CategoryName = e.Category?.Name,
                Guests = userRole == "Admin" ?
                    _eventRepository.GetEventGuestsAsync(e.Id).Result.Select(g => new GuestReadDto
                    {
                        Id = g.Id,
                        Name = g.Name,
                        Email = g.Email,
                    }).ToList() :
                    new List<GuestReadDto>(), // Empty list for non-admin users
                Vendors = e.Vendors.Select(v => new VendorReadDto
                {
                    Id = v.Id,
                    Name = v.Name,
                    ServiceType = v.ServiceType,
                    ContactInfo = v.ContactInfo
                }).ToList(),
                ImageUrl = e.ImagePath,
                CurrentGuestCount = e.CurrentGuestCount
            });
        }

        public async Task<IEnumerable<EventReadDto>> GetEventsByVenueAsync(int venueId, string? userRole = null)
        {
            var events = await _eventRepository.GetEventsByVenueAsync(venueId);
            return events.Select(e => MapEventToEventReadDto(e, userRole));
        }

        public async Task<IEnumerable<EventReadDto>> GetEventsByDateAsync(DateTime date, string? userRole = null)
        {
            var events = await _eventRepository.GetEventsByDateAsync(date);
            return events.Select(e => MapEventToEventReadDto(e, userRole));
        }

        public async Task<IEnumerable<GuestReadDto>> GetEventGuestsAsync(int eventId)
        {
            var guests = await _eventRepository.GetEventGuestsAsync(eventId);
            return guests.Select(g => new GuestReadDto
            {
                Id = g.Id,
                EventId = g.EventId,
                EventName = _eventRepository.GetByIdAsync(eventId).Result.Name,
                Name = g.Name,
                Email = g.Email,
            });
        }

        public async Task<IEnumerable<VendorReadDto>> GetEventVendorsAsync(int eventId)
        {
            var vendors = await _eventRepository.GetEventVendorsAsync(eventId);
            return vendors.Select(v => new VendorReadDto
            {
                Id = v.Id,
                Name = v.Name,
                ServiceType = v.ServiceType,
                ContactInfo = v.ContactInfo
            });
        }

        private EventReadDto MapEventToEventReadDto(Event @event, string? userRole = null)
        {
            return new EventReadDto
            {
                Id = @event.Id,
                Name = @event.Name,
                Description = @event.Description,
                Date = @event.Date,
                VenueId = @event.VenueId,
                VenueName = @event.Venue?.Name,
                Status = @event.Status,
                CategoryId = @event.CategoryId,
                CategoryName = @event.Category?.Name,
                Guests = userRole == "Admin" ?
                    _eventRepository.GetEventGuestsAsync(@event.Id).Result.Select(g => new GuestReadDto
                    {
                        Id = g.Id,
                        Name = g.Name,
                        Email = g.Email,
                    }).ToList() :
                    new List<GuestReadDto>(), // Empty list for non-admin users
                Vendors = @event.Vendors.Select(v => new VendorReadDto
                {
                    Id = v.Id,
                    Name = v.Name,
                    ServiceType = v.ServiceType,
                    ContactInfo = v.ContactInfo
                }).ToList(),
                ImageUrl = @event.ImagePath,
                CurrentGuestCount = @event.CurrentGuestCount
            };
        }

        public async Task<IEnumerable<EventReadDto>> SearchEventsAsync(string keyword, string? userRole = null)
        {
            var events = await _eventRepository.SearchEventsAsync(keyword);
            return events.Select(e => MapEventToEventReadDto(e, userRole));
        }

        public async Task<GuestReadDto> ParticipateInEventAsync(int eventId, string userFullName, string userEmail)
        {
            var @event = await _eventRepository.GetByIdAsync(eventId, include: e => e
                .Include(e => e.Venue)
                .Include(e => e.Guests)
                .Include(e => e.Category));

            if (@event == null)
                throw new ArgumentException("Invalid event ID");

            if (@event.Status != "Available")
                throw new InvalidOperationException("This event is not available for participation");

            if (@event.Guests.Count >= @event.Venue.Capacity)
                throw new InvalidOperationException("This event has reached its maximum capacity");

            var guest = new Guest
            {
                EventId = eventId,
                Name = userFullName,
                Email = userEmail
            };

            guest = await _guestRepository.CreateAsync(guest);
            @event.Guests.Add(guest);

            @event.CurrentGuestCount++;

            if (@event.Guests.Count == @event.Venue.Capacity)
            {
                @event.Status = "Fully-booked";
            }

            await _eventRepository.UpdateAsync(@event);

            return new GuestReadDto
            {
                Id = guest.Id,
                EventId = guest.EventId,
                EventName = @event.Name,
                Name = guest.Name,
                Email = guest.Email
            };
        }

        public async Task<bool> UnregisterFromEventAsync(int eventId, string userEmail)
        {
            var @event = await _eventRepository.GetByIdAsync(eventId, include: e => e
                .Include(e => e.Venue)
                .Include(e => e.Guests)
                .Include(e => e.Category));

            if (@event == null)
                throw new ArgumentException("Invalid event ID");

            // Find the guest with the matching email
            var guest = @event.Guests.FirstOrDefault(g => g.Email.ToLower() == userEmail.ToLower());

            if (guest == null)
                throw new InvalidOperationException("You are not registered for this event");

            // Remove the guest
            @event.Guests.Remove(guest);
            await _guestRepository.DeleteAsync(guest.Id);

            // Update guest count
            @event.CurrentGuestCount = Math.Max(0, @event.CurrentGuestCount - 1);

            // If the event was fully booked, update its status back to available
            if (@event.Status == "Fully-booked")
            {
                @event.Status = "Available";
            }

            await _eventRepository.UpdateAsync(@event);

            return true;
        }
    }
}
