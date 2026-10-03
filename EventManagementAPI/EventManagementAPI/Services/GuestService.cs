using EventManagementAPI.Models;
using EventManagementAPI.Repositories;

namespace EventManagementAPI.Services
{
    public class GuestService
    {
        private readonly IGuestRepository _guestRepository;
        private readonly IEventRepository _eventRepository;

        public GuestService(IGuestRepository guestRepository, IEventRepository eventRepository)
        {
            _guestRepository = guestRepository;
            _eventRepository = eventRepository;
        }

        public async Task<IEnumerable<GuestReadDto>> GetAllGuestsAsync()
        {
            var guests = await _guestRepository.GetAllAsync();
            return guests.Select(g => new GuestReadDto
            {
                Id = g.Id,
                EventId = g.EventId,
                EventName = g.Event?.Name,
                Name = g.Name,
                Email = g.Email
            });
        }

        public async Task<GuestReadDto> GetGuestByIdAsync(int id)
        {
            var guest = await _guestRepository.GetByIdAsync(id);
            if (guest == null) return null;

            return new GuestReadDto
            {
                Id = guest.Id,
                EventId = guest.EventId,
                EventName = guest.Event?.Name,
                Name = guest.Name,
                Email = guest.Email
            };
        }

        public async Task<GuestReadDto> CreateGuestAsync(GuestCreateDto guestCreateDto)
        {
            var @event = await _eventRepository.GetByIdAsync(guestCreateDto.EventId);
            if (@event == null) throw new ArgumentException("Invalid event ID");

            var guest = new Guest
            {
                EventId = guestCreateDto.EventId,
                Name = guestCreateDto.Name,
                Email = guestCreateDto.Email
            };

            guest = await _guestRepository.CreateAsync(guest);

            return new GuestReadDto
            {
                Id = guest.Id,
                EventId = guest.EventId,
                EventName = @event.Name,
                Name = guest.Name,
                Email = guest.Email
            };
        }

        public async Task<GuestReadDto> UpdateGuestAsync(int id, GuestUpdateDto guestUpdateDto)
        {
            var guest = await _guestRepository.GetByIdAsync(id);
            if (guest == null) return null;

            guest.Name = guestUpdateDto.Name;
            guest.Email = guestUpdateDto.Email;

            await _guestRepository.UpdateAsync(guest);

            return new GuestReadDto
            {
                Id = guest.Id,
                EventId = guest.EventId,
                EventName = guest.Event?.Name,
                Name = guest.Name,
                Email = guest.Email
            };
        }

        public async Task<bool> DeleteGuestAsync(int id)
        {
            var guest = await _guestRepository.GetByIdAsync(id);
            if (guest == null) return false;

            await _guestRepository.DeleteAsync(id);
            return true;
        }
    }
}
