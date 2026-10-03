import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/Homepage";
import Dashboardpage from "./components/Dashboardpage";
import Navbar from "./components/Navbar";
import About from "./components/About";
import ListCategories from "./components/Categories/listcategories";
import InsertCategory from "./components/Categories/insertcategorie";
import UpdateCategory from "./components/Categories/updatecategorie";
import ListVenues from "./components/Venues/listvenues";
import InsertVenue from "./components/Venues/insertvenue";
import UpdateVenue from "./components/Venues/updatevenue";
import ListVendors from "./components/Vendors/listvendors";
import InsertVendor from "./components/Vendors/insertvendor";
import UpdateVendor from "./components/Vendors/updatevendor";
import ListEvents from "./components/Events/listevents";
import UpdateEvent from "./components/Events/updateevent";
import InsertEvent from "./components/Events/insertevent";
import EventDetails from "./components/client/eventdetails";
import EventCard from "./components/client/eventcard";
import ListUsers from "./components/users/listusers";
import ListGuests from "./components/Guests/listguests";
import InsertGuest from "./components/Guests/insertguest";
import UpdateGuest from "./components/Guests/updateguest";
import Profile from "./components/users/profile";
import ListEventsByCategory from "./components/Events/ListEventsByCategory";
import ListEventsByVenue from "./components/Events/ListEventByVenue";
import ListEventsByDate from "./components/Events/ListEventByDate";
import SearchEvents from "./components/Events/SearchEvents";

const App = () => {
  const role = localStorage.getItem("CC_Role");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/Navbar" element={<Navbar/>}/>
        <Route path="/Homepage" element={role === "User" ? <Homepage /> : <Navigate to="/login" />} />
        <Route path="/Dashboardpage" element={role === "Admin" ? <Dashboardpage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/categories" element={<ListCategories/>} />
        <Route path="/categories/add" element={<InsertCategory />} />
        <Route path="/categories/edit/:id" element={<UpdateCategory />} />
        <Route path="/venues" element={<ListVenues />} />
        <Route path="/venues/add" element={<InsertVenue />} />
        <Route path="/venues/edit/:id" element={<UpdateVenue />} />
        <Route path="/vendors" element={<ListVendors />} />
        <Route path="/vendors/add" element={<InsertVendor />} />
        <Route path="/vendors/edit/:id" element={<UpdateVendor />} />
        <Route path="/events" element={<ListEvents />} />
        <Route path="/events/add" element={<InsertEvent />} />
        <Route path="/events/edit/:id" element={<UpdateEvent />} />
        <Route path="/events/category/:id" element={<ListEventsByCategory />} />
        <Route path="/events/venue/:id" element={<ListEventsByVenue />} />
        <Route path="/events/date/:date" element={<ListEventsByDate />} />
        <Route path="/events/search" element={<SearchEvents />} />
        <Route path="/events/:id" element={<EventDetails/>} />
        <Route path="/eventcard" element={<EventCard />} />
        <Route path="/admin/users" element={<ListUsers />} />
        <Route path="/guests" element={<ListGuests />} />
        <Route path="/guests/add" element={<InsertGuest />} />
        <Route path="/guests/edit/:id" element={<UpdateGuest />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;

