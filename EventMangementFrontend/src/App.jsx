import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import AttendedEventsPage from './pages/AttendedEventsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminVenuesPage from './pages/admin/AdminVenuesPage';
import AdminVendorsPage from './pages/admin/AdminVendorsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Assuming you store role in localStorage as well

  // Check if the token exists and if the user has the required role
  if (!token || (allowedRoles && !allowedRoles.includes(userRole))) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/events" element={
          <PrivateRoute allowedRoles={['User']}>
            <EventsPage />
          </PrivateRoute>
        } />
        <Route path="/events/:id" element={
          <PrivateRoute allowedRoles={['User']}>
            <EventDetailsPage />
          </PrivateRoute>
        } />
        <Route path="/attended-events" element={
          <PrivateRoute allowedRoles={['User']}>
            <AttendedEventsPage />
          </PrivateRoute>
        } />
        <Route path="/admin/*" element={
          <PrivateRoute allowedRoles={['Admin']}>
            <AdminDashboard />
          </PrivateRoute>
        } />
        <Route path="/admin/events" element={
          <PrivateRoute allowedRoles={['Admin']}>
            <AdminEventsPage />
          </PrivateRoute>
        } />
        <Route path="/admin/categories" element={
          <PrivateRoute allowedRoles={['Admin']}>
            <AdminCategoriesPage />
          </PrivateRoute>
        } />
        <Route path="/admin/venues" element={
          <PrivateRoute allowedRoles={['Admin']}>
            <AdminVenuesPage />
          </PrivateRoute>
        } />
        <Route path="/admin/vendors" element={
          <PrivateRoute allowedRoles={['Admin']}>
            <AdminVendorsPage />
          </PrivateRoute>
        } />
        <Route path="/admin/users" element={
          <PrivateRoute allowedRoles={['Admin']}>
            <AdminUsersPage />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
