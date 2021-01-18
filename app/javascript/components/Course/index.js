import React from 'react';
import UsersList from '../UsersList'
import Sessions from '../Sessions'

import {
  FETCH_SESSIONS_SUCCESS,
  UPDATE_SESSION,
  CREATE_SESSION,
  INIT,
  UPDATE_SELECTED_SESSION_FIELD,
  SET_SELECTED_SESSION,
} from './reducers';

import { initialState, reducer } from './reducers';

export default function Course(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const sessionsToArr = Object.values(state.sessions).map(session => session);

  console.log('p', props)
  const { id } = props;

  React.useEffect(() => {
    if (state.status === INIT) {
      fetchCourses();
    }
  }, [state.status])

  function fetchCourses() {
    fetch(`/courses/${id}/sessions.json`)
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
    fetch(`/courses/${id}/sessions.json`, {
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
    fetch(`/courses/${id}/sessions/${state.selected_session.id}.json`, {
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

  function onOpenModal(session) {
    dispatch({
      type: SET_SELECTED_SESSION,
      data: session,
    })
  }

  function handleFormField(e) {
    dispatch({
      type: UPDATE_SELECTED_SESSION_FIELD,
      data: e.target.value,
      name: e.target.name,
    });
  }

  function handleDateChange(e) {
    dispatch({
      type: UPDATE_SELECTED_SESSION_FIELD,
      data: e,
      name: 'date',
    });
  }

  return (
    <div>      
      <div className="flex px-20">
        <div>
          <h1 className="text-2xl font-bold mb-1">{props.name}</h1>
          <UsersList courseId={props.id} />
        </div>
        <Sessions 
          courseId={props.id} 
          sessions={sessionsToArr} 
          createSession={createSession}
          updateSession={updateSession}
          onOpenModal={onOpenModal}
          handleFormField={handleFormField}
          handleDateChange={handleDateChange}
          sessionsToArr={sessionsToArr}
          selectedSession={state.selected_session}
        />
      </div>
      
    </div>
  )
}
