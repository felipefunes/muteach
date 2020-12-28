import React from 'react';

import {
  FETCH_USERS_SUCCESS,
} from './reducers';

import { initialState, reducer } from './reducers';


export default function UsersList({ courseId }) {

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
    
    <table>
      <tbody>
        {usersToArr && usersToArr.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}