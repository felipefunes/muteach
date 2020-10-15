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

export default function UsersHome() {
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
  
  return (
    <div className="max-w-screen-lg container mx-auto grid grid-cols-5 gap-4 pt-10">
      <div className="col-span-1">
        
        <ul>
          <li><span className="flex text-xl font-bold mb-5"><a href="/courses/new" className="btn btn-blue">Crear curso</a></span></li>
          <li><a className="flex text-xl font-bold leading-10 mb-2" href="#">📝 Bitácora</a></li>
          <li><a className="flex text-xl font-bold leading-10 mb-2" href="#">🎓 Mis cursos</a></li>
        </ul>
      </div>
      <div className="col-span-4">
        <ul>
          {state.status !== DONE ? (
              <LoadingIndicator />
            ) : (
              coursesToArr.map(course => (
                <li className="flex border-solid border border-gray-400 rounded-xlg p-6 mb-5">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{course.name}</h3>
                    {/* <div className="mb-2">3 julio 2020 - 10 octubre 2020</div> */}
                    <p className="mb-3">{course.description}</p>
                    <div>{`💵 $${course.price}`}</div>
                  </div>
                  <img src="https://pbs.twimg.com/ad_img/1305151499081785345/Zd9bXo-Q?format=jpg&name=900x900" alt="" style={{width: '180px'}} className="ml-4" />
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
