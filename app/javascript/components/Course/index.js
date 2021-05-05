import React from 'react';
import UsersList from '../UsersList'
import Sessions from '../Sessions'
import Evaluations from '../Evaluations'
import { 
  UserAddIcon, 
  ClipboardCheckIcon, 
  CalendarIcon,
  PencilAltIcon,
  ArrowSmLeftIcon,
} from '@heroicons/react/outline'
import Tooltip from '@material-ui/core/Tooltip';

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
          <div className="flex mb-4 items-center text-sm">
              <a href="/" className="text-gray-600">
                <ArrowSmLeftIcon className="h-5 w-5 text-gray-600 mr-1 inline-block align-text-top"/>
                <span>Back to courses</span>
              </a>
          </div>
          <div>
            <div className="flex mb-0 items-center">
              <h1 className="text-2xl font-bold mb-1 mr-2">{props.name}</h1>
              <Tooltip title="Edit course">
                <a href={`/courses/${props.id}/edit`}>
                  <PencilAltIcon className="h-5 w-5 text-gray-600 mr-1 inline-block align-text-top"/>
                </a>
              </Tooltip>
            </div>
            <div className="text-sm flex mb-6 items-center">
              <div className="text-gray-600">
                  {usersToArr.length} Students
                </div>
                <span className="text-gray-400 mx-2">{' • '}</span>
                <a href={`/courses/${props.id}/users/new`}>
                  <UserAddIcon className="h-4 w-4 mr-1 inline-block align-text-top"/>
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
              {/* <span className="text-gray-400 mx-3">{' | '}</span> */}
              
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="data-table">
              <table className="text-sm">
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
                )}
                
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
              </table>
            </div>
          </div>
        </div>
      </div>
    </CourseContext.Provider>
  )
}
