import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import enUS from 'date-fns/locale/en-US';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const EventCalendar = ({ events }) => {
  const [view, setView] = useState('month');

  // Transform events to the format expected by react-big-calendar
  const calendarEvents = events.map(event => ({
    id: event._id,
    title: event.title,
    start: new Date(event.date),
    end: new Date(event.date),
    allDay: true,
    resource: event,
  }));

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: '#4caf50',
        borderRadius: '5px',
        color: 'white',
        border: 'none',
        display: 'block',
      },
    };
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month', 'week', 'day', 'agenda']}
        view={view}
        onView={(newView) => setView(newView)}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => window.location.href = `/events/${event.id}`}
        popup
      />
    </div>
  );
};

export default EventCalendar;