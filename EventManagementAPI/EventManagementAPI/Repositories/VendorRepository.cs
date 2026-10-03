using EventManagementAPI.Data;
using EventManagementAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace EventManagementAPI.Repositories
{
    public class VendorRepository : IVendorRepository
    {
        private readonly ApplicationDbContext _context;

        public VendorRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Vendor>> GetAllAsync()
        {
            return await _context.Vendors.ToListAsync();
        }

        public async Task<Vendor> GetByIdAsync(int id)
        {
            return await _context.Vendors.FindAsync(id);
        }

        public async Task<List<Vendor>> GetManyByIdsAsync(List<int> vendorIds)
        {
            var vendors = new List<Vendor>();

            foreach (var vendorId in vendorIds)
            {
                var vendor = await GetByIdAsync(vendorId);
                if (vendor != null)
                {
                    vendors.Add(vendor);
                }
            }

            return vendors;
        }
        public async Task<Vendor> CreateAsync(Vendor vendor)
        {
            await _context.Vendors.AddAsync(vendor);
            await _context.SaveChangesAsync();
            return vendor;
        }

        public async Task UpdateAsync(Vendor vendor)
        {
            _context.Vendors.Update(vendor);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var vendor = await _context.Vendors.FindAsync(id);
            if (vendor != null)
            {
                _context.Vendors.Remove(vendor);
                await _context.SaveChangesAsync();
            }
        }
    }
}
