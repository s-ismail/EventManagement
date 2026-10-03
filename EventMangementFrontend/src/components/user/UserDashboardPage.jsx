import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="user-dashboard">
      <h1 className="dashboard-title">Welcome, {user.fullName}!</h1>
      <div className="dashboard-links">
        <Link to="/user/events" className="dashboard-link">My Events</Link>
        <Link to="/events" className="dashboard-link">Browse Events</Link>
        <Link to="/cart" className="dashboard-link">My Cart</Link>
      </div>
    </div>
  );
};

export default UserDashboard;

