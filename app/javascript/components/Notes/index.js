import React from 'react';
import LoadingIndicator from '../common/LoadingIndicator'

import {
  FETCH_NOTES_SUCCESS,
  INIT,
  DONE,
} from './reducers';

import { initialState, reducer } from './reducers';

export default function Notes({
  courseId,
  sessionId,
  userId,
}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const notesToArr = Object.values(state.notes).map(note => note);

  React.useEffect(() => {
    if (state.status === INIT) {
      fetchCourses();
    }
  }, [state.status])

  function fetchCourses() {
    fetch(`/courses/${courseId}/sessions/${sessionId}/users/${userId}/notes`)
    .then(function(response) {
      return response.json();
    })
    .then(function(notes) {
      dispatch({
        type: FETCH_NOTES_SUCCESS,
        data: notes,
      });
    })
  }

  return (
    <div className="">
      <h3>Notes</h3>
      {state.status === DONE ? (
        notesToArr.map(note => (
          <div>{note.text}</div>
        ))
      ) : <LoadingIndicator />}
    </div>
  );
}
