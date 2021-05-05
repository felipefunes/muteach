import React from 'react';
import 'date-fns';
import { format } from 'date-fns';
import {
  KeyboardDateTimePicker
} from '@material-ui/pickers';
import Tooltip from '@material-ui/core/Tooltip';
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
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
}));

import {
  FETCH_SESSIONS_SUCCESS,
  UPDATE_SESSION,
  CREATE_SESSION,
  DELETE_SESSION,
  INIT,
  UPDATE_SELECTED_SESSION_FIELD,
  SET_SELECTED_SESSION,
} from '../Course/reducers';

import { CourseContext } from '../Course/index'

export default function Sessions({ courseId }) {
  const { state, dispatch } = React.useContext(CourseContext);
  const sessionsToArr = Object.values(state.sessions).map(session => session);
  
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (state.status === INIT) {
      fetchSessions();
    }
  }, [state.status])

  function fetchSessions() {
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
        data: session.data.attributes,
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
        data: session.data.attributes,
      });
      setOpen(false)
      console.log('Success:', session);
    })
  }

  function deleteSession(session) {
    if (!window.confirm("Do you relly want to delete this session?")) return
    fetch(`/courses/${courseId}/sessions/${session.id}.json`, {
      method: 'DELETE',
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
        type: DELETE_SESSION,
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
    setOpen(true)
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

  async function handleDeleteSession(session) {
    const deletion = await deleteSession(session);
    return setOpen(false)
  }

  return (
    <thead>
      <tr>
        <td>
          <form onSubmit={createSession}>
            <button type="submit" className="text-blue-700">+ Add new session</button>
          </form>
        </td>  
        {sessionsToArr && sessionsToArr.map((s,i) => (
          <td key={s.id}>
            <button type="button" onClick={() => onOpenModal(s)} className="px-2 text-center hover:text-blue-700">
              <Tooltip title="Edit session">
                <span className="block text-xs font-semibold mb-1 font-mono hover:text-blue-700">
                  {i + 1}{') '}
                  <span className="text-gray-600 font-normal hover:text-blue-700">
                    { s.date ? format(new Date(s.date), 'dd/MM/yy') : '--/--/--' }
                  </span>
                </span>
              </Tooltip>
            </button>
          </td>
        ))}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
        >
          <div className={`${classes.paper} modal-container`}>
            {state.selected_session && (
              <form onSubmit={updateSession}>
                <h3 className="text-xl font-bold mt-1">
                  {`Edit session ${sessionsToArr.indexOf(state.selected_session) + 1}`}
                </h3>
                <div className="form-field">
                    <KeyboardDateTimePicker
                      variant="inline"
                      ampm={false}
                      label="Date and hour"
                      value={state.selected_session.date}
                      onChange={handleDateChange}
                      onError={console.log}
                      format="yyyy/MM/dd HH:mm"
                    />
                </div>
  
                <div className="form-field">
                  <label>Description</label>
                  <textarea
                    className="text-field" 
                    onChange={handleFormField}
                    name="description"
                    value={state.selected_session.description || ''} 
                  />
                </div>
    
                <div className="form-field">
                  <label>Objectives</label>
                  <textarea
                    className="text-field" 
                    onChange={handleFormField}
                    name="objectives"
                    value={state.selected_session.objectives || ''} 
                  />
                </div>
                <div className="flex justify-between pb-3 pt-8 text-gray-600">
                  <button type="button" className="text-xs" onClick={()=> handleDeleteSession(state.selected_session)}>
                    🗑 Delete session
                  </button>
                  <button type="submit" className="btn btn-blue">Update session</button>
                </div>
              </form>
            )}
          </div>
        </Modal>
      </tr>
    </thead>
  )
}
