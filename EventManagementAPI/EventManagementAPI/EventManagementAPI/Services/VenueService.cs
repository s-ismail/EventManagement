using EventManagementAPI.Models;
using EventManagementAPI.Repositories;

namespace EventManagementAPI.Services
{
    public class VenueService
    {
        private readonly IVenueRepository _venueRepository;

        public VenueService(IVenueRepository venueRepository)
        {
            _venueRepository = venueRepository;
        }

        public async Task<IEnumerable<VenueReadDto>> GetAllVenuesAsync()
        {
            var venues = await _venueRepository.GetAllAsync();
            return venues.Select(v => new VenueReadDto
            {
                Id = v.Id,
                Name = v.Name,
                Location = v.Location,
                Capacity = v.Capacity
            });
        }

        public async Task<VenueReadDto> GetVenueByIdAsync(int id)
        {
            var venue = await _venueRepository.GetByIdAsync(id);
            if (venue == null) return null;

            return new VenueReadDto
            {
                Id = venue.Id,
                Name = venue.Name,
                Location = venue.Location,
                Capacity = venue.Capacity
            };
        }

        public async Task<VenueReadDto> CreateVenueAsync(VenueCreateDto venueCreateDto)
        {
            var venue = new Venue
            {
                Name = venueCreateDto.Name,
                Location = venueCreateDto.Location,
                Capacity = venueCreateDto.Capacity
            };

            venue = await _venueRepository.CreateAsync(venue);

            return new VenueReadDto
            {
                Id = venue.Id,
                Name = venue.Name,
                Location = venue.Location,
                Capacity = venue.Capacity
            };
        }

        public async Task<VenueReadDto> UpdateVenueAsync(int id, VenueUpdateDto venueUpdateDto)
        {
            var venue = await _venueRepository.GetByIdAsync(id);
            if (venue == null) return null;

            venue.Name = venueUpdateDto.Name;
            venue.Location = venueUpdateDto.Location;
            venue.Capacity = venueUpdateDto.Capacity;

            await _venueRepository.UpdateAsync(venue);

            return new VenueReadDto
            {
                Id = venue.Id,
                Name = venue.Name,
                Location = venue.Location,
                Capacity = venue.Capacity
            };
        }

        public async Task<bool> DeleteVenueAsync(int id)
        {
            var venue = await _venueRepository.GetByIdAsync(id);
            if (venue == null) return false;

            await _venueRepository.DeleteAsync(id);
            return true;
        }
    }
}
