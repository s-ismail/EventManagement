import React from 'react';
import EventCard from '../events/EventCard';

const UserEventList = ({ events, onCancelAttendance }) => {
  return (
    <div className="user-event-list">
      <h2 className="text-2xl font-bold mb-4">My Events</h2>
      {events.length === 0 ? (
        <p>You havent registered for any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onGoClick={() => onCancelAttendance(event.id)}
              buttonText="Cancel"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserEventList;

