import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../common/LoadingIndicator'

import {
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES,
  INIT,
  DONE,
} from './reducers';

import { initialState, reducer } from './reducers';

export default function UsersHome({currentUser}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const coursesToArr = Object.values(state.courses).map(course => course);

  React.useEffect(() => {
    if (state.status === INIT) {
      fetchCourses();
    }
  }, [state.status])

  function fetchCourses() {
    fetch('/courses.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(courses) {
      dispatch({
        type: FETCH_COURSES_SUCCESS,
        data: courses,
      });
    })
  }

  function joinCourse(courseId) {
    fetch('/join_courses.json', {
      method: 'POST', // or 'PUT'
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ course_id: courseId }),
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
  }

  return (
    <div className="max-w-screen-lg container mx-auto grid grid-cols-5 gap-4 pt-10">
      <div className="col-span-1">
        
        <ul>
          <li><span className="flex text-xl font-bold mb-5"><a href="/courses/new" className="btn btn-blue">Crear curso</a></span></li>
          <li><a className="flex text-xl font-bold leading-10 mb-2" href="#">🎓 Bitácora</a></li>
          <li><a className="flex text-xl font-bold leading-10 mb-2" href="#">🗓 My schedule</a></li>
          <li><a className="flex text-xl font-bold leading-10 mb-2" href="#">🙂 Profile</a></li>
        </ul>
      </div>
      <div className="col-span-4">
        <ul>
          {state.status !== DONE ? (
              <LoadingIndicator />
            ) : (
              coursesToArr.map(course => (
                <li key={course.id}>
                  <a href={`/courses/${course.id}`} className="flex justify-between border-solid border border-gray-300 rounded bg-absolutewhite p-6 mb-2 text-black">
                    <div>
                      <h3 className="text-xl font-bold">{course.name}</h3>
                      <p className="mb-2 text-sm text-gray-500">{course.category_name}</p>
                      {course.description && <p className="mb-3 text-base text-gray-600">{course.description}</p>}
                      {course.price && <div>{`💵 $${course.price}`}</div>}
                    </div>
                    {!course.user_ids.includes(currentUser.id) && (
                      <div>
                        <button type="button" className="btn btn-blue text-xs" onClick={(e) => {e.preventDefault(); joinCourse(course.id)}}>Join course</button>
                      </div>
                    )}
                  </a>
                </li>
              ))
            )
          }
        </ul>
      </div>
    </div>
  );
}

UsersHome.propTypes = {
  
};
