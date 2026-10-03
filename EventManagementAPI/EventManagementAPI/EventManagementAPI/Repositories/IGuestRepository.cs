using EventManagementAPI.Models;

namespace EventManagementAPI.Repositories
{
    public interface IGuestRepository
    {
        Task<IEnumerable<Guest>> GetAllAsync();
        Task<Guest> GetByIdAsync(int id);
        Task<Guest> CreateAsync(Guest guest);
        Task UpdateAsync(Guest guest);
        Task DeleteAsync(int id);
        Task<IEnumerable<Guest>> GetGuestsByEventIdAsync(int eventId);
        Task<List<Guest>> GetManyByIdsAsync(List<int> guestIds);
    }
}
