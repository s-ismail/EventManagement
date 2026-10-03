using EventManagementAPI.Models;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EventManagementAPI.Repositories
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetAllAsync(Expression<Func<Event, bool>> filter = null,
            Func<IQueryable<Event>, IQueryable<Event>> include = null);
        Task<Event> GetByIdAsync(int id, Func<IQueryable<Event>, IQueryable<Event>> include = null);
        Task<Event> CreateAsync(Event @event);
        Task UpdateAsync(Event @event);
        Task DeleteAsync(int id);
        Task<IEnumerable<Event>> GetEventsByCategoryAsync(int categoryId);
        Task<IEnumerable<Event>> GetEventsByVenueAsync(int venueId);
        Task<IEnumerable<Event>> GetEventsByDateAsync(DateTime date);
        Task<IEnumerable<Guest>> GetEventGuestsAsync(int eventId);
        Task<IEnumerable<Vendor>> GetEventVendorsAsync(int eventId);
        Task<IEnumerable<Event>> SearchEventsAsync(string keyword);
    }
}
