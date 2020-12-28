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
                  <a href={`/courses/${course.id}`} className="flex border-solid border border-gray-400 rounded-xlg p-6 mb-5 text-black">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{course.name}</h3>
                      {/* <div className="mb-2">3 julio 2020 - 10 octubre 2020</div> */}
                      <p className="mb-3">{course.description}</p>
                      <div>{`💵 $${course.price}`}</div>
                    </div>
                    <img src="https://pbs.twimg.com/ad_img/1305151499081785345/Zd9bXo-Q?format=jpg&name=900x900" alt="" style={{width: '180px'}} className="ml-4" />
                    {!course.user_ids.includes(currentUser.id) && (
                      <div>
                        <button type="button" className="btn btn-blue" onClick={(e) => {e.preventDefault(); joinCourse(course.id)}}>Join now</button>
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
