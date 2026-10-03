import React from 'react'
import Navbar from './Navbar'

export default function About() {
  return (
    <div className="page-content">
      <Navbar />
      <div className="container">
        <h2 className="text-center">About Our Site</h2>
        <p>
          Welcome to EventManager, your one-stop solution for managing and organizing events.
          Our platform provides powerful tools for both event organizers and attendees,
          making the process of event planning and participation seamless and enjoyable.
        </p>
      </div>
    </div>
  )
}

