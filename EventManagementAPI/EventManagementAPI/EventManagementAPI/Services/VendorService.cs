using EventManagementAPI.Models;
using EventManagementAPI.Repositories;

namespace EventManagementAPI.Services
{
    public class VendorService
    {
        private readonly IVendorRepository _vendorRepository;

        public VendorService(IVendorRepository vendorRepository)
        {
            _vendorRepository = vendorRepository;
        }

        public async Task<IEnumerable<VendorReadDto>> GetAllVendorsAsync()
        {
            var vendors = await _vendorRepository.GetAllAsync();
            return vendors.Select(v => new VendorReadDto
            {
                Id = v.Id,
                Name = v.Name,
                ServiceType = v.ServiceType,
                ContactInfo = v.ContactInfo
            });
        }

        public async Task<VendorReadDto> GetVendorByIdAsync(int id)
        {
            var vendor = await _vendorRepository.GetByIdAsync(id);
            if (vendor == null) return null;

            return new VendorReadDto
            {
                Id = vendor.Id,
                Name = vendor.Name,
                ServiceType = vendor.ServiceType,
                ContactInfo = vendor.ContactInfo
            };
        }

        public async Task<VendorReadDto> CreateVendorAsync(VendorCreateDto vendorCreateDto)
        {
            var vendor = new Vendor
            {
                Name = vendorCreateDto.Name,
                ServiceType = vendorCreateDto.ServiceType,
                ContactInfo = vendorCreateDto.ContactInfo
            };

            vendor = await _vendorRepository.CreateAsync(vendor);

            return new VendorReadDto
            {
                Id = vendor.Id,
                Name = vendor.Name,
                ServiceType = vendor.ServiceType,
                ContactInfo = vendor.ContactInfo
            };
        }

        public async Task<VendorReadDto> UpdateVendorAsync(int id, VendorUpdateDto vendorUpdateDto)
        {
            var vendor = await _vendorRepository.GetByIdAsync(id);
            if (vendor == null) return null;

            vendor.Name = vendorUpdateDto.Name;
            vendor.ServiceType = vendorUpdateDto.ServiceType;
            vendor.ContactInfo = vendorUpdateDto.ContactInfo;

            await _vendorRepository.UpdateAsync(vendor);

            return new VendorReadDto
            {
                Id = vendor.Id,
                Name = vendor.Name,
                ServiceType = vendor.ServiceType,
                ContactInfo = vendor.ContactInfo
            };
        }

        public async Task<bool> DeleteVendorAsync(int id)
        {
            var vendor = await _vendorRepository.GetByIdAsync(id);
            if (vendor == null) return false;

            await _vendorRepository.DeleteAsync(id);
            return true;
        }
    }
}
