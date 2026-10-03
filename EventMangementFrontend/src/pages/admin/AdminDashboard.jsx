import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminEventsPage from './AdminEventsPage';
import AdminCategoriesPage from './AdminCategoriesPage';
import AdminVenuesPage from './AdminVenuesPage';
import AdminVendorsPage from './AdminVendorsPage';
import AdminUsersPage from './AdminUsersPage';

const AdminDashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <AdminSidebar />
        </Col>
        <Col md={9}>
          <Routes>
            <Route path="events" element={<AdminEventsPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="venues" element={<AdminVenuesPage />} />
            <Route path="vendors" element={<AdminVendorsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route index element={<h1>Welcome to Admin Dashboard</h1>} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;

