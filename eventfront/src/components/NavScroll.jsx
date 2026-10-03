import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import API from '../api/axios';

function NavScroll() {
    const navigate = useNavigate();
    const role = localStorage.getItem("CC_Role");
    const [categories, setCategories] = useState([]);
    const [venues, setVenues] = useState([]);
    const [events, setEvents] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        if (role === "User") {
            fetchCategories();
            fetchVenues();
            fetchEvents();
        }
    }, [role]);

    const fetchCategories = async () => {
        try {
            const response = await API.get('/Category');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchVenues = async () => {
        try {
            const response = await API.get('/Venue');
            setVenues(response.data);
        } catch (error) {
            console.error('Error fetching venues:', error);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await API.get('/Event');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("CC_Token");
        localStorage.removeItem("CC_Role");
        navigate("/login");
    };

    const handleCategoryClick = (categoryId) => {
        navigate(`/events/category/${categoryId}`);
    };

    const handleVenueClick = (venueId) => {
        navigate(`/events/venue/${venueId}`);
    };

    const handleDateFilter = (period) => {
        const today = new Date();
        let selectedDate;

        switch (period) {
            case 'today':
                selectedDate = today.toISOString().split('T')[0];
                break;
            case 'tomorrow':
                selectedDate = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0];
                break;
            case 'this-week':
                // Set to next Sunday
                selectedDate = new Date(today.setDate(today.getDate() + (7 - today.getDay()))).toISOString().split('T')[0];
                break;
            case 'next-week':
                // Set to next Monday
                selectedDate = new Date(today.setDate(today.getDate() + (8 - today.getDay()))).toISOString().split('T')[0];
                break;
            case 'this-month':
                // Set to last day of current month
                selectedDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
                break;
            default:
                return;
        }

        navigate(`/events/date/${selectedDate}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchKeyword.trim() !== '') {
            navigate(`/events/search?keyword=${encodeURIComponent(searchKeyword)}`);
        }
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
                                <Nav.Link href="/admin/users">Users</Nav.Link>
                                <Nav.Link href="/events">Events</Nav.Link>
                                <Nav.Link href="/categories">Categories</Nav.Link>
                                <Nav.Link href="/venues">Venues</Nav.Link>
                                <Nav.Link href="/vendors">Vendors</Nav.Link>
                                <Nav.Link href="/guests">Guests</Nav.Link>
                            </>
                        )}
                        {role === "User" && (
                            <>
                                <Nav.Link href="/Homepage">Home</Nav.Link>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                                <NavDropdown title="Category" id="category-dropdown">
                                    {categories.map((category) => (
                                        <NavDropdown.Item 
                                            key={category.id}
                                            onClick={() => handleCategoryClick(category.id)}
                                        >
                                            {category.name}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                                <NavDropdown title="Venue" id="venue-dropdown">
                                    {venues.map((venue) => (
                                        <NavDropdown.Item 
                                            key={venue.id}
                                            onClick={() => handleVenueClick(venue.id)}
                                        >
                                            {venue.name}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                                <NavDropdown title="Date" id="date-dropdown">
                                    <NavDropdown.Item onClick={() => handleDateFilter('today')}>
                                        Today
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleDateFilter('tomorrow')}>
                                        Tomorrow
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleDateFilter('this-week')}>
                                        This Week
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleDateFilter('next-week')}>
                                        Next Week
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleDateFilter('this-month')}>
                                        This Month
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                    {role === "User" && (
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <Form.Control
                                type="search"
                                placeholder="Search events..."
                                className="me-2"
                                aria-label="Search"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <Button variant="outline-success" type="submit">Search</Button>
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

