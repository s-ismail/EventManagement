using EventManagementAPI.Models;

namespace EventManagementAPI.Repositories
{
    public interface IVenueRepository
    {
        Task<IEnumerable<Venue>> GetAllAsync();
        Task<Venue> GetByIdAsync(int id);
        Task<Venue> CreateAsync(Venue venue);
        Task UpdateAsync(Venue venue);
        Task DeleteAsync(int id);
    }
}
