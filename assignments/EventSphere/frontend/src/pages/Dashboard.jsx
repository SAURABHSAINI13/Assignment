import React from 'react';
import ProfileSummary from '../components/ProfileSummary';
import UpcomingEvents from '../components/UpcomingEvents';
import RegisteredEvents from '../components/RegisteredEvents';

const Dashboard = ({ user, upcomingEvents }) => {
  return (
    <>
      <div>Dashboard Page</div>
      <div className="dashboard container">
        <h1>🚀 Welcome to EventSphere, {user.name}</h1>
        <ProfileSummary user={user} />
        <UpcomingEvents events={upcomingEvents} />
        <RegisteredEvents events={upcomingEvents.filter(e => e.isRegistered)} />
      </div>
    </>
  );
};

export default Dashboard;
