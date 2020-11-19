import React from 'react';

export default function Sessions(props) {
  return (
    <div className="flex">
      {[1,2,3,4,5,6,7,8].map(s => (
        <div className="px-2">{s}</div>
      ))}
    </div>
  )
}