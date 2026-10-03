import { Table, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import NavScroll from '../NavScroll';

const ListVendors = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await API.get('/Vendor');
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await API.delete(`/api/Vendor/${id}`);
        fetchVendors();
      } catch (error) {
        console.error('Error deleting vendor:', error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <NavScroll/>
      <h1 className="mb-4">Vendors</h1>
      <Link to="/vendors/add" className="btn btn-primary mb-3">
        <FontAwesomeIcon icon={faPlus} /> Add New Vendor
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Service Type</th>
            <th>Contact Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.name}</td>
              <td>{vendor.serviceType}</td>
              <td>{vendor.contactInfo}</td>
              <td>
                <Link to={`/vendors/edit/${vendor.id}`} className="btn btn-warning btn-sm me-2">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(vendor.id)}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListVendors;

