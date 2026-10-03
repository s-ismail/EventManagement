using EventManagementAPI.Data;
using EventManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EventManagementAPI.Repositories
{
    public class GuestRepository : IGuestRepository
    {
        private readonly ApplicationDbContext _context;

        public GuestRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Guest>> GetAllAsync()
        {
            return await _context.Guests
                .Include(g => g.Event)
                .ToListAsync();
        }

        public async Task<Guest> GetByIdAsync(int id)
        {
            return await _context.Guests
                .Include(g => g.Event)
                .FirstOrDefaultAsync(g => g.Id == id);
        }

        public async Task<List<Guest>> GetManyByIdsAsync(List<int> guestIds)
        {
            var guests = new List<Guest>();

            foreach (var guestId in guestIds)
            {
                var guest = await GetByIdAsync(guestId);
                if (guest != null)
                {
                    guests.Add(guest);
                }
            }

            return guests;
        }

        public async Task<Guest> CreateAsync(Guest guest)
        {
            await _context.Guests.AddAsync(guest);
            await _context.SaveChangesAsync();
            return guest;
        }

        public async Task UpdateAsync(Guest guest)
        {
            _context.Guests.Update(guest);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var guest = await _context.Guests.FindAsync(id);
            if (guest != null)
            {
                _context.Guests.Remove(guest);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Guest>> GetGuestsByEventIdAsync(int eventId)
        {
            return await _context.Guests
                .Where(g => g.EventId == eventId)
                .ToListAsync();
        }
    }
}
