using EventManagementAPI.Models;

namespace EventManagementAPI.Repositories
{
    public interface IVendorRepository
    {
        Task<IEnumerable<Vendor>> GetAllAsync();
        Task<Vendor> GetByIdAsync(int id);
        Task<Vendor> CreateAsync(Vendor vendor);
        Task UpdateAsync(Vendor vendor);
        Task DeleteAsync(int id);
        Task<List<Vendor>> GetManyByIdsAsync(List<int> vendorIds);
    }
}
