import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavScroll() {
    const navigate = useNavigate();
    const role = localStorage.getItem("CC_Role");

    const handleLogout = () => {
        localStorage.removeItem("CC_Token");
        localStorage.removeItem("CC_Role");
        navigate("/login");
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand><h1>EventManager</h1></Navbar.Brand>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {role === "Admin" && (
                            <>
                                <Nav.Link href="/Dashboardpage">Home</Nav.Link>
                                <Nav.Link href="#users">Users</Nav.Link>
                                <Nav.Link href="#events">Events</Nav.Link>
                                <Nav.Link href="#categories">Categories</Nav.Link>
                                <Nav.Link href="#venues">Venues</Nav.Link>
                                <Nav.Link href="#vendors">Vendors</Nav.Link>
                                <Nav.Link href="#guests">Guests</Nav.Link>
                            </>
                        )}
                        {role === "User" && (
                            <>
                                <Nav.Link href="/Homepage">Home</Nav.Link>
                                <NavDropdown title="Category" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action2">Action</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Venue" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action4">Action</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Date" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action4">Action</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                    {role === "User" && (
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    )}
                    <br />
                    {role && (
                        <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScroll;

