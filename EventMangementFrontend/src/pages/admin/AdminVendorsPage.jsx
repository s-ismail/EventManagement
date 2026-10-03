import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EntityTable from '../../components/admin/EntityTable';
import vendorService from '../../api/vendorService';

const AdminVendorsPage = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await vendorService.getAllVendors();
        setVendors(response.data);
      } catch (error) {
        console.error('Failed to fetch vendors', error);
      }
    };
    fetchVendors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await vendorService.deleteVendor(id);
      setVendors(vendors.filter(vendor => vendor.id !== id));
    } catch (error) {
      console.error('Failed to delete vendor', error);
    }
  };

  const columns = [
    { header: 'Name', accessor: vendor => vendor.name },
    { header: 'Service Type', accessor: vendor => vendor.serviceType },
    { header: 'Contact Info', accessor: vendor => vendor.contactInfo },
  ];

  return (
    <div className="admin-vendors-page container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Manage Vendors</h1>
      <Link
        to="/admin/vendors/add"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4 inline-block"
      >
        Add New Vendor
      </Link>
      <EntityTable
        data={vendors}
        columns={columns}
        onDelete={handleDelete}
        onUpdate={(id) => `/admin/vendors/update/${id}`}
      />
    </div>
  );
};

export default AdminVendorsPage;

