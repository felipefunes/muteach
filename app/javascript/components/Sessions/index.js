import React from 'react';
import Modal from '@material-ui/core/Modal';

import {
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS,
  CREATE_SESSION,
  INIT,
  DONE,
} from './reducers';

import { initialState, reducer } from './reducers';

export default function Sessions(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const sessionsToArr = Object.values(state.sessions).map(session => session);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (state.status === INIT) {
      fetchCourses();
    }
  }, [state.status])

  function fetchCourses() {
    fetch('/courses/1/sessions.json')
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
    fetch('/courses/1/sessions.json', {
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

  return (
    <div className="flex">
      <form onSubmit={(e) => createSession(e)}>
        <button type="submit" className="btn btn-blue">+</button>
      </form>
      {sessionsToArr && sessionsToArr.map((s,i) => (
        <>
        <button type="button" onClick={() => setOpen(true)} className="px-2">
          {i + 1}
          
        </button>
        <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="text-white">Edit session</div>
      </Modal>
      </>
      ))}
    </div>
  )
}