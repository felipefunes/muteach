import React from 'react';
import LoadingIndicator from '../common/LoadingIndicator'
import Course from './Course'
import { UserIcon, LogoutIcon,  } from '@heroicons/react/outline'

import {
  FETCH_COURSES_SUCCESS,
  FETCH_PUBLIC_COURSES_SUCCESS,
  INIT,
  DONE,
} from './reducers';

import { initialState, reducer } from './reducers';

export default function UsersHome({currentUser}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const coursesToArr = Object.values(state.courses).map(course => course);
  const publicCoursesToArr = Object.values(state.public_courses).map(course => course);

  React.useEffect(() => {
    if (state.status === INIT) {
      fetchCourses();
    }
  }, [state.status])

  React.useEffect(() => {
    if (state.status === FETCH_COURSES_SUCCESS) {
      fetchPublicCourses();
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

  function fetchPublicCourses() {
    fetch('/public.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(public_courses) {
      dispatch({
        type: FETCH_PUBLIC_COURSES_SUCCESS,
        data: public_courses,
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
          <li>
            <span className="flex text-xl font-bold mb-6">
              <a href="/courses/new" className="btn btn-blue">+ New course</a>
            </span>
          </li>
          <li className="mb-4">
            <a className="flex items-center text-xl font-bold leading-9" href={`/users/${currentUser.id}/edit`}>
              <UserIcon className="h-8 w-8 text-gray-600 mr-2"/>
              Your profile
            </a>
          </li>
          <li>
            <form className="button_to flex items-center" method="post" action="/users/sign_out">
              <LogoutIcon className="h-8 w-8 text-gray-600 mr-2"/>
              <input type="hidden" name="_method" value="delete" />
              <button className="text-xl font-bold leading-9 bg-transparent text-blue-700 " type="submit">
                Logout
              </button>
            </form>
          </li>
        </ul>
      </div>
      <div className="col-span-4">
        <ul className='mb-10'>
          {state.status !== DONE ? (
              <div className="text-center border-solid border border-gray-300 rounded bg-absolutewhite p-10 mb-2 text-black">
                <LoadingIndicator />
              </div>
            ) : (coursesToArr.length > 0 ? (
                <React.Fragment>
                  <h3 className="text-2xl mb-3 font-extrabold leading-snug">
                    {`Your courses (${coursesToArr.length})`}
                  </h3>
                  {coursesToArr.sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).map(course => (
                    <Course course={course} currentUser={currentUser} key={course.id}/>
                  ))}
                </React.Fragment>
              ) : (
                <div className="text-center border-solid border border-gray-300 rounded bg-absolutewhite p-10 mb-10 text-black">
                  <p className="text-4xl">🤓</p>
                  <p className="text-xl font-bold mb-1">You haven't created any course yet.</p>
                  <p>Press the blue button to create the first one and start managing your classes.</p>
                </div>
              )
            )
          }
        </ul>
        {publicCoursesToArr.length > 0 && (
          <ul className='mb-10'>
            <React.Fragment>
              <h3 className="text-2xl mb-3 font-extrabold leading-snug">
                {`Courses from our community (${publicCoursesToArr.length})`}
              </h3>
              {publicCoursesToArr.sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).map(course => (
                <Course course={course} currentUser={currentUser} key={course.id}/>
              ))}
            </React.Fragment>
          </ul>
        )}
      </div>
    </div>
  );
}

UsersHome.propTypes = {
  
};
