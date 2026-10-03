import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EntityTable from '../../components/admin/EntityTable';
import venueService from '../../api/venueService';

const AdminVenuesPage = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await venueService.getAllVenues();
        setVenues(response.data);
      } catch (error) {
        console.error('Failed to fetch venues', error);
      }
    };
    fetchVenues();
  }, []);

  const handleDelete = async (id) => {
    try {
      await venueService.deleteVenue(id);
      setVenues(venues.filter(venue => venue.id !== id));
    } catch (error) {
      console.error('Failed to delete venue', error);
    }
  };

  const columns = [
    { header: 'Name', accessor: venue => venue.name },
    { header: 'Location', accessor: venue => venue.location },
    { header: 'Capacity', accessor: venue => venue.capacity },
  ];

  return (
    <div className="admin-venues-page container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Manage Venues</h1>
      <Link
        to="/admin/venues/add"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4 inline-block"
      >
        Add New Venue
      </Link>
      <EntityTable
        data={venues}
        columns={columns}
        onDelete={handleDelete}
        onUpdate={(id) => `/admin/venues/update/${id}`}
      />
    </div>
  );
};

export default AdminVenuesPage;

