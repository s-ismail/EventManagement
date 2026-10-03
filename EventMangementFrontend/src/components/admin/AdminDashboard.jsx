import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/admin/events" className="dashboard-link">Manage Events</Link>
        <Link to="/admin/categories" className="dashboard-link">Manage Categories</Link>
        <Link to="/admin/venues" className="dashboard-link">Manage Venues</Link>
        <Link to="/admin/vendors" className="dashboard-link">Manage Vendors</Link>
        <Link to="/admin/users" className="dashboard-link">Manage Users</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

