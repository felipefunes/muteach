import React from 'react';
import LoadingIndicator from '../common/LoadingIndicator'

import {
  FETCH_NOTES_SUCCESS,
  CREATE_NOTE,
  INIT,
  DONE,
  UPDATE_NOTE,
  UPDATE_NOTE_FIELD,
} from './reducers';

import { initialState, reducer } from './reducers';

export default function Notes({
  courseId,
  sessionId,
  user,
}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const notesToArr = Object.values(state.notes).map(note => note);

  React.useEffect(() => {
    if (state.status === INIT) {
      fetchCourses();
    }
  }, [state.status])

  function fetchCourses() {
    fetch(`/courses/${courseId}/sessions/${sessionId}/users/${user.id}/notes.json`)
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

  function newNote(e) {
    e.preventDefault();
    fetch(`/courses/${courseId}/sessions/${sessionId}/users/${user.id}/notes.json`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notes: {} }),
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .then(response => response.json())
    .then(note => {
      dispatch({
        type: CREATE_NOTE,
        data: note,
      });
      console.log('Success:', note);
    })
  }

  function updateNote(note) {
    fetch(`/courses/${courseId}/sessions/${sessionId}/users/${user.id}/notes/${note.id}.json`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notes: note }),
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .then(response => response.json())
    .then(note => {
      dispatch({
        type: UPDATE_NOTE,
        data: note.data.attributes,
      });
      console.log('Success:', note);
    })
  }

  function onChangeNote(e) {
    dispatch({
      type: UPDATE_NOTE_FIELD,
      data: e.target.value,
      name: Number(e.target.name),
    });
  }

  return (
    <div>
      <div className="font-bold">Notes</div>
      <form onSubmit={newNote}>
        <button type="submit" className="text-blue-700">New Note</button>
      </form>
      
      {state.status === DONE ? (
        notesToArr.map(note => (
          <div key={note.id}>
            <div className="form-field">
              <textarea
                className="text-field"
                name={note.id}
                onChange={onChangeNote}
                value={note.text || ''} 
              />
            </div>
            <button type="button" onClick={() => updateNote(note)}>
              Save
            </button>
          </div>
        ))
      ) : <LoadingIndicator />}
    </div>
  );
}