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
  UPDATE_SESSION_USERS,
} from './reducers';

import { initialState, reducer } from './reducers';

export default function Course(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const sessionsToArr = Object.values(state.sessions).map(session => session);

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
        data: session.data.attributes,
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
        data: session.data.attributes,
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

  function updateAssistance(session) {
    fetch(`/courses/${id}/sessions/${session.id}.json`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session: session }),
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .then(response => response.json())
    .then(session => {
      dispatch({
        type: UPDATE_SESSION_USERS,
        data: session.data.attributes.user_ids,
        id: session.data.attributes.id,
      });
      console.log('Success:', session);
    })
  }

  function handleAssistance(e) {
    const userId = Number(e.target.name);
    const sessionId = Number(e.target.dataset.session)
    const session = state.sessions[sessionId]
    const userIds = session.user_ids.includes(userId) ? session.user_ids.filter(id => id !== userId) : session.user_ids.concat(userId)

    const updateSession = {...session, user_ids: userIds}
    updateAssistance(updateSession)
  }

  return (
    <div>
      <div className="px-20">
        <div>
          <h1 className="text-2xl font-bold mb-1">{props.name}</h1>
          <div className="text-lg">{} Students</div>
        </div>
        <div className="data-table">
          <table>
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
            <UsersList 
              courseId={props.id} 
              sessionsToArr={sessionsToArr}
              handleAssistance={handleAssistance}
            />
          </table>
        </div>
      </div>
    </div>
  )
}
