import React from 'react';
import UsersList from '../UsersList'
import Sessions from '../Sessions'
import Evaluations from '../Evaluations'
import CourseFiles from '../CourseFiles'
import { 
  UserAddIcon, 
  ClipboardCheckIcon, 
  CalendarIcon, 
  FolderOpenIcon 
} from '@heroicons/react/outline'

import {
  SET_SELECTED_SESSION,
  UPDATE_SESSION_USERS,
  FETCH_USERS_SUCCESS,
  SET_SELECTED_USER,
} from './reducers';

import { initialState, reducer } from './reducers';

export const CourseContext = React.createContext()

export default function Course(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const [viewMode, setViewMode] = React.useState('sessions')
  const usersToArr = Object.values(state.users).map(user => user);
  const sessionsToArr = Object.values(state.sessions).map(session => session);
  const evaluationsToArr = Object.values(state.evaluations).map(evaluation => evaluation)

  const { id, sessionsCount, evaluationsCount } = props;

  React.useEffect(() => {
    fetchUsers()
  }, [])

  function fetchUsers() {
    fetch(`/courses/${id}/users.json`)
    .then(function(response) {
      return response.json();
    })
    .then(function(users) {
      dispatch({
        type: FETCH_USERS_SUCCESS,
        data: users,
      });
    })
  }

  function onOpenSessionUser(session, user) {
    dispatch({
      type: SET_SELECTED_SESSION,
      data: session,
    })

    dispatch({
      type: SET_SELECTED_USER,
      data: user,
    })
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
    <CourseContext.Provider value={{state, dispatch}}>
      <div>
        <div className="px-6">
          <div>
            <div className="flex mb-3 items-center">
              <h1 className="text-2xl font-bold mb-1">{props.name}</h1>
              <span className="text-gray-400 mx-2">{' • '}</span>
              <div className="text-base text-gray-600">
                {usersToArr.length} Students
              </div>
              <span className="text-gray-400 mx-2">{' • '}</span>
              <a href={`/courses/${props.id}/users/new`}>
                <UserAddIcon className="h-5 w-5 mr-1 inline-block align-text-top"/>
                Add student
              </a>
            </div>
            <div>
              <button 
                type="submit" 
                className={viewMode === 'sessions' ? 'text-gray-700 font-bold cursor-default' : 'text-gray-600 hover:text-blue-700'} 
                onClick={() => setViewMode('sessions')}
              >
                <CalendarIcon className="h-6 w-6 mr-2 inline-block align-text-top"/>
                {`Sessions (${sessionsToArr?.length || sessionsCount})`}
              </button>
              <span className="text-gray-400 mx-3">{' | '}</span>
              <button 
                type="submit" 
                className={viewMode === 'evaluations' ? 'text-gray-700 font-bold cursor-default' : 'text-gray-600 hover:text-blue-700'} 
                onClick={() => setViewMode('evaluations')}
              >
                <ClipboardCheckIcon className="h-6 w-6 mr-2 inline-block align-text-top"/>
                {`Evaluations (${evaluationsToArr?.length || evaluationsCount})`}
              </button>
              <span className="text-gray-400 mx-3">{' | '}</span>
              <button 
                type="submit" 
                className={viewMode === 'files' ? 'text-gray-700 font-bold cursor-default' : 'text-gray-600 hover:text-blue-700'} 
                onClick={() => setViewMode('files')}
              >
                <FolderOpenIcon className="h-6 w-6 mr-2 inline-block align-text-top"/>
                {`Files (0)`}
              </button>
              
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="data-table">
              <table className="text-sm">
                {viewMode === 'files' ? (
                    <CourseFiles />
                  ) : (
                    <React.Fragment>
                      {viewMode === 'sessions' ? (
                          <Sessions 
                            courseId={props.id}
                          />
                        ) : (
                          <Evaluations 
                            courseId={id}
                            isActive={viewMode === 'evaluations'}
                            selectedEvaluation={state.selected_evaluation}
                          />
                        )
                      }
                      <UsersList 
                        courseId={props.id} 
                        sessionsToArr={sessionsToArr}
                        evaluationsToArr={evaluationsToArr}
                        handleAssistance={handleAssistance}
                        usersToArr={usersToArr}
                        onOpenSessionUser={onOpenSessionUser}
                        selectedSession={state.selected_session}
                        selectedUser={state.selected_user}
                        viewMode={viewMode}
                      />
                  </React.Fragment>
                  )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </CourseContext.Provider>
  )
}
