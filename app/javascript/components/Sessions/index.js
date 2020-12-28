import React from 'react';
import Modal from '@material-ui/core/Modal';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

import {
  FETCH_SESSIONS_SUCCESS,
  UPDATE_SESSION,
  CREATE_SESSION,
  INIT,
  UPDATE_SELECTED_SESSION_FIELD,
  SET_SELECTED_SESSION,
} from './reducers';

import { initialState, reducer } from './reducers';

export default function Sessions(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const sessionsToArr = Object.values(state.sessions).map(session => session);
  const classes = useStyles();

  const { courseId } = props

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (state.status === INIT) {
      fetchCourses();
    }
  }, [state.status])

  function fetchCourses() {
    fetch(`/courses/${courseId}/sessions.json`)
    .then(function(response) {
      return response.json();
    })
    .then(function(sessions) {
      dispatch({
        type: FETCH_SESSIONS_SUCCESS,
        data: sessions,
      });
    })
  }

  function createSession(e) {
    e.preventDefault();
    fetch(`/courses/${courseId}/sessions.json`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session: {} }),
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .then(response => response.json())
    .then(session => {
      dispatch({
        type: CREATE_SESSION,
        data: session,
      });
      console.log('Success:', session);
    })
  }


  function updateSession(e) {
    e.preventDefault();
    fetch(`/courses/${courseId}/sessions/${state.selected_session.id}.json`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session: state.selected_session }),
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .then(response => response.json())
    .then(session => {
      dispatch({
        type: UPDATE_SESSION,
        data: session,
      });
      console.log('Success:', session);
    })
  }
  console.log('state', state)

  function handleOnOpenModal(session) {
    setOpen(true)
    dispatch({
      type: SET_SELECTED_SESSION,
      data: session,
    })
  }

  function handleFormField(e) {
    // const isDateType = e.target.type === 'date'
    // const value = isDateType ? new Date(e.target.value) : e.target.value

    // const data = isDateType ? value.toISOString() : value.value;

    const value = e.target.value
    const date = new Date(value)
    const now_date = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
                     date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
    const data = new Date(now_date)
    console.log('data', data)
    dispatch({
      type: UPDATE_SELECTED_SESSION_FIELD,
      data: data,
      name: e.target.name,
    });
  }

  function formatedDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    const finalDate = [year, month, day].join('-');
    console.log('date', finalDate)
    return finalDate; 
  }

  return (
    <div className="flex">
      <form onSubmit={(e) => createSession(e)}>
        <button type="submit" className="btn btn-blue">+</button>
      </form>
      {sessionsToArr && sessionsToArr.map((s,i) => (
        <>
          <button type="button" onClick={() => handleOnOpenModal(s)} className="px-2">
            {i + 1}           
          </button>
        </>
      ))}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper} className="bg-white p-10">
          {state.selected_session && (
            <form onSubmit={updateSession}>
              <h3 className="text-1xl font-bold mb-4">{`Edit session ${state.selected_session.id}`}</h3>
              <div className="form-field">
                <label>Date</label>
                <div>
                  <input 
                    type="date"
                    name="date"
                    value={formatedDate(state.selected_session.date)}
                    onChange={handleFormField}
                  />
                </div>
              </div>
              <div className="form-field">
                <div className="flex">
                  <div className="mr-1">
                    <label>From</label>
                    <div>
                      <input 
                        type="time"
                        name="from_hour"
                        value={state.selected_session.from_hour}
                        onChange={handleFormField}
                      />
                    </div>
                  </div>
                  <div>
                    <label>To</label>
                    <div>
                      <input 
                        type="time"
                        name="to_hour"
                        value={state.selected_session.to_hour}
                        onChange={handleFormField}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-field">
                <label>Description</label>
                <textarea
                  className="text-field" 
                  onChange={handleFormField}
                  name="description"
                  value={state.selected_session.description} 
                />
              </div>
  
              <div className="form-field">
                <label>Objectives</label>
                <textarea
                  className="text-field" 
                  onChange={handleFormField}
                  name="objectives"
                  value={state.selected_session.objectives} 
                />
              </div>
              <button type="submit" className="btn btn-blue">Update</button>
            </form>
          )}
        </div>
      </Modal>
    </div>
  )
}
