import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// import './style.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const myEventsList= [
  {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2015, 3, 0),
      end: new Date(2015, 3, 1),
  },
  {
      id: 1,
      title: 'Long Event',
      start: new Date(2015, 3, 7),
      end: new Date(2015, 3, 10),
  },
]

export default function CreateCourse() {
  return (
    <div style={{ height: '500pt'}}>
      <Calendar
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        localizer={localizer}
      />
    </div>
  )
}
