import React from 'react';
import LoadingIndicator from '../common/LoadingIndicator'

import {
  FETCH_CURRENT_NOTES,
  CREATE_NOTE,
  INIT,
  DONE,
  UPDATE_NOTE,
  UPDATE_NOTE_FIELD,
  DELETE_NOTE,
  UPDATE_NOTES_COUNT,
} from '../Course/reducers';

import { CourseContext } from '../Course/index'

export default function Notes({
  courseId,
  sessionId,
  user,
}) {
  const { state, dispatch } = React.useContext(CourseContext);
  const notesToArr = Object.values(state.current_notes).map(note => note);

  React.useEffect(() => {
    if (state.current_notes_status === INIT) {
      fetchNotes();
    }
  }, [state.current_notes_status], user, sessionId)

  function fetchNotes() {
    fetch(`/courses/${courseId}/sessions/${sessionId}/users/${user.id}/notes.json`)
    .then(function(response) {
      return response.json();
    })
    .then(function(notes) {
      dispatch({
        type: FETCH_CURRENT_NOTES,
        data: notes,
      });
    })
  }

  function createNote(e) {
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
    }).then(()=>{
      dispatch({
        type: UPDATE_NOTES_COUNT,
        data: {
          user_id: user.id,
          session_id: sessionId,
        },
      });
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
        data: note,
      });
      console.log('Success:', note);
    })
  }

  function deleteNote(note) {
    fetch(`/courses/${courseId}/sessions/${sessionId}/users/${user.id}/notes/${note.id}.json`, {
      method: 'DELETE',
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
        type: DELETE_NOTE,
        data: note,
      });
      console.log('Success:', note);
    }).then(()=>{
      dispatch({
        type: UPDATE_NOTES_COUNT,
        data: {
          user_id: user.id,
          session_id: sessionId,
        },
      });
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
      <form onSubmit={createNote}>
        <button type="submit" className="text-blue-700 mb-3">+ Add a note</button>
      </form>
      
      {state.current_notes_status === DONE ? (
        notesToArr.reverse().map(note => (
          <div key={note.id} className="mb-4">
            <div className="py-2">
              <textarea
                className="text-field"
                name={note.id}
                onChange={onChangeNote}
                value={note.text || ''} 
                onBlur={() => updateNote(note)}
              />
            </div>
            <button className="text-xs text-gray-600" type="button" onClick={() => deleteNote(note)}>
              🗑
              Delete note
            </button>
          </div>
        ))
      ) : <LoadingIndicator />}
    </div>
  );
}
