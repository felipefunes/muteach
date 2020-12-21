import React from 'react';
import UsersList from '../UsersList'
import Sessions from '../Sessions'

export default function Course(props) {

  return (
    <div>      
      <div className="flex px-10">
        <div>
          <h1 className="text-2xl font-bold mb-1">{props.name}</h1>
          <UsersList courseId={props.id} />
        </div>
        <Sessions courseId={props.id} />
      </div>
      
    </div>
  )
}