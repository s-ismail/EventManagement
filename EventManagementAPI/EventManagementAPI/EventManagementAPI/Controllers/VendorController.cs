using EventManagementAPI.Models;
using EventManagementAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class VendorController : ControllerBase
    {
        private readonly VendorService _vendorService;

        public VendorController(VendorService vendorService)
        {
            _vendorService = vendorService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VendorReadDto>>> GetAllVendors()
        {
            var vendors = await _vendorService.GetAllVendorsAsync();
            return Ok(vendors);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VendorReadDto>> GetVendor(int id)
        {
            var vendor = await _vendorService.GetVendorByIdAsync(id);
            if (vendor == null) return NotFound();
            return Ok(vendor);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VendorReadDto>> CreateVendor(VendorCreateDto vendorCreateDto)
        {
            var createdVendor = await _vendorService.CreateVendorAsync(vendorCreateDto);
            return CreatedAtAction(nameof(GetVendor), new { id = createdVendor.Id }, createdVendor);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VendorReadDto>> UpdateVendor(int id, VendorUpdateDto vendorUpdateDto)
        {
            var updatedVendor = await _vendorService.UpdateVendorAsync(id, vendorUpdateDto);
            if (updatedVendor == null) return NotFound();
            return Ok(updatedVendor);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteVendor(int id)
        {
            var result = await _vendorService.DeleteVendorAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
