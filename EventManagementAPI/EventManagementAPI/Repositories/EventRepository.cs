using EventManagementAPI.Data;
using EventManagementAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Security.Claims;

namespace EventManagementAPI.Repositories
{


    public class EventRepository : IEventRepository
    {
        private readonly ApplicationDbContext _context;

        public EventRepository(ApplicationDbContext context)
        {
            _context = context;

        }

        public async Task<IEnumerable<Event>> GetAllAsync(Expression<Func<Event, bool>> filter = null,
            Func<IQueryable<Event>, IQueryable<Event>> include = null)
        {
            IQueryable<Event> query = _context.Events;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (include != null)
            {
                query = include(query);
            }

            return await query.ToListAsync();
        }

        public async Task<Event> GetByIdAsync(int id, Func<IQueryable<Event>, IQueryable<Event>> include = null)
        {
            IQueryable<Event> query = _context.Events;

            if (include != null)
            {
                query = include(query);
            }

            return await query.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Event> CreateAsync(Event @event)
        {
            await _context.Events.AddAsync(@event);
            await _context.SaveChangesAsync();
            return @event;
        }

        public async Task UpdateAsync(Event @event)
        {
            _context.Entry(@event).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var @event = await _context.Events.FindAsync(id);
            if (@event != null)
            {
                _context.Events.Remove(@event);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Event>> GetEventsByCategoryAsync(int categoryId)
        {
            return await _context.Events
                .Where(e => e.CategoryId == categoryId)
                .Include(e => e.Venue)
                .Include(e => e.Vendors)
                .Include(e => e.Guests)
                .Include(e => e.Category)
                .ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetEventsByVenueAsync(int venueId)
        {
            return await _context.Events
                .Where(e => e.VenueId == venueId)
                .Include(e => e.Venue)
                .Include(e => e.Vendors)
                .Include(e => e.Guests)
                .Include(e => e.Category)
                .ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetEventsByDateAsync(DateTime date)
        {
            return await _context.Events
                .Where(e => e.Date.Date == date.Date)
                .Include(e => e.Venue)
                .Include(e => e.Vendors)
                .Include(e => e.Category)
                .ToListAsync();
        }

        public async Task<IEnumerable<Guest>> GetEventGuestsAsync(int eventId)
        {

            return await _context.Guests
                .Where(g => g.EventId == eventId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Vendor>> GetEventVendorsAsync(int eventId)
        {
            return await _context.Events
                .Where(e => e.Id == eventId)
                .SelectMany(e => e.Vendors)
                .ToListAsync();
        }
        public async Task<IEnumerable<Event>> SearchEventsAsync(string keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
                return await _context.Events
                    .Include(e => e.Venue)
                    .Include(e => e.Vendors)
                    .Include(e => e.Category)
                    .ToListAsync();

            return await _context.Events
                .Where(e => (e.Name.Contains(keyword) || e.Description.Contains(keyword)||e.Venue.Name.Contains(keyword)||e.Category.Name.Contains(keyword)))
                .Include(e => e.Venue)
                .Include(e => e.Vendors)
                .Include(e => e.Category)
                .ToListAsync();
        }
    }
}