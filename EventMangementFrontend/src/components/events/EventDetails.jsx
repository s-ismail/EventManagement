import React from 'react';
import { useCart } from '../../hooks/useCart';
import { formatDate } from '../../utils/formatDate';
import './EventDetails.css';

const EventDetails = ({ event }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(event);
  };

  return (
    <div className="event-details">
      <img src={event.imagePath || '/placeholder.svg'} alt={event.name} className="event-image" />
      <h1 className="event-title">{event.name}</h1>
      <p className="event-date">Date: {formatDate(event.date)}</p>
      <p className="event-venue">Venue: {event.venue.name}</p>
      <p className="event-address">Address: {event.venue.location}</p>
      <p className="event-category">Category: {event.category.name}</p>
      <p className="event-description">{event.description}</p>
      <p className="event-organizer">Organizer: {event.organizer.fullName}</p>
      <h2 className="vendors-title">Vendors</h2>
      <ul className="vendors-list">
        {event.vendors.map(vendor => (
          <li key={vendor.id} className="vendor-item">{vendor.name} - {vendor.serviceType}</li>
        ))}
      </ul>
      <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
};

export default EventDetails;

