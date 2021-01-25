import React from 'react';

export default function UsersList({ sessionsToArr, handleAssistance, usersToArr }) {

  return ( 
    <tbody>
      {sessionsToArr && usersToArr && usersToArr.map(user => (
        <tr key={user.id}>
          <td>
            <div className="text-sm font-semibold">{user.name}</div>
            <div className="text-gray-600 text-xs">{user.email}</div>
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
