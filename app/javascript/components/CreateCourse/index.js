import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import MainInfo from './MainInfo'

const localizer = momentLocalizer(moment);

const myEventsList= [
  {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2020, 3, 0),
      end: new Date(2020, 3, 1),
  },
  {
      id: 1,
      title: 'Long Event',
      start: new Date(2015, 3, 7),
      end: new Date(2015, 3, 10),
  },
]

export default function CreateCourse() {

  const [step, setStep] = React.useState(1);

  function renderStep() {
    switch (step) {
      case 1:
        return (
          <MainInfo 
            setStep={setStep}
          />
        )
      case 2:
        return (
          <div>
            <div style={{ height: '450px'}}>
              <Calendar
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                defaultDate={moment().toDate()}
                localizer={localizer}
              />
            </div>
            <div className="justify-between form-field flex">
              <button type="button" className="btn " onClick={() => setStep(1)}>
                ← Previous step
              </button>
              <button type="button" className="btn btn-blue" onClick={() => setStep(1)}>
                Skip this step →
              </button>
            </div>
          </div>
        )
      default:
        break;
    }
  }
  
  return (
    <div className="max-w-screen-lg container mx-auto mb-10">
       <h1 className="text-4xl font-bold mb-4">Create course</h1>
      {renderStep()}
    </div>
  )
}
