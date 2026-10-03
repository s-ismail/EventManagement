import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/layout/Sidebar';
import UserDashboard from '../../components/user/UserDashboard';

const UserDashboardPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3} className="sidebar-wrapper">
          <Sidebar />
        </Col>
        <Col md={9}>
          <UserDashboard />
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboardPage;

