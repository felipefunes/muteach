import React from 'react';

import {
  FETCH_USERS_SUCCESS,
} from './reducers';

import { initialState, reducer } from './reducers';


export default function UsersList({ courseId, sessionsToArr, handleAssistance }) {

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const usersToArr = Object.values(state.users).map(user => user);

  React.useEffect(() => {
    fetchUsers()
  }, [])

  function fetchUsers() {
    fetch(`/courses_users.json?course_id=${courseId}`)
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

  return ( 
    <tbody>
      {sessionsToArr && usersToArr && usersToArr.map(user => (
        <tr key={user.id}>
          <td>
            <div className="text-sm font-semibold">{user.name}</div>
            <div className="text-gray-500 text-xs">{user.email}</div>
          </td>
          {sessionsToArr.map(session => (
            <td key={session.id} className="text-center">
              <input 
                type="checkbox" 
                name={user.id} 
                data-session={session.id} 
                onChange={handleAssistance}
                checked={session.user_ids.includes(user.id)}
              />
              <button type="button" className="px-2">
                <span className="transform rotate-90 flex" rol="img">✏️</span>
              </button>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
