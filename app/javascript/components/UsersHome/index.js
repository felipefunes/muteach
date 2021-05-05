import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../common/LoadingIndicator'
import { UserIcon, LogoutIcon } from '@heroicons/react/outline'
import { 
  UserGroupIcon, 
  ClipboardCheckIcon, 
  CalendarIcon,
} from '@heroicons/react/solid'
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
  const showCounters = (course) => course.evaluations_count || course.sessions_count || course.users_count

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
        <ul>
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
                    <li key={course.id}>
                      <a href={`/courses/${course.id}`} className="flex justify-between border-solid border border-gray-300 rounded bg-absolutewhite p-6 mb-2 text-black">
                        <div>
                          <h3 className="text-xl font-bold">{course.name}</h3>
                          <p className="mb-1 text-sm text-gray-500">{course.category_name}</p>
                          {course.description && <p className={` text-base text-gray-600 mb-${showCounters(course) ? '5' : '2'}`}>{course.description}</p>}
                          {/* {course.price && <div>{`💵 $${course.price}`}</div>} */}
                          {
                            (showCounters(course)) ? (
                              <div className="text-gray-500 text-xs flex items-center">
                                { 
                                  <span className="mr-4">
                                    <UserGroupIcon className="h-3 w-3 mr-1 inline-block relative" style={{top: -2}}/>
                                    {`${course.users_count} Students`}
                                  </span> 
                                }
                                { 
                                  <span className="mr-4">
                                    <CalendarIcon className="h-3 w-3 mr-1 inline-block relative" style={{top: -2}}/>
                                    {`${course.sessions_count} Sessions`}
                                  </span> 
                                  }
                                { 
                                  <span className="">
                                    <ClipboardCheckIcon className="h-3 w-3 mr-1 inline-block relative" style={{top: -2}}/>
                                    {`${course.evaluations_count} Evaluations`}
                                  </span> 
                                }
                              </div>
                            ) : null
                          }
                        </div>
                        {!course.user_ids.includes(currentUser.id) && (
                          <div>
                            <button type="button" className="btn btn-blue text-xs " onClick={(e) => {e.preventDefault(); joinCourse(course.id)}}>Join course</button>
                          </div>
                        )}
                      </a>
                    </li>
                ))}
                  </React.Fragment>
              ) : (
                <div className="text-center border-solid border border-gray-300 rounded bg-absolutewhite p-10 mb-2 text-black">
                  <p className="text-4xl">🤓</p>
                  <p className="text-xl font-bold mb-1">You haven't created any course yet.</p>
                  <p>Press the blue button to create the first one and start managing your classes.</p>
                </div>
              )
            )
          }
        </ul>
      </div>
    </div>
  );
}

UsersHome.propTypes = {
  
};
