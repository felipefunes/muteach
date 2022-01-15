import React from 'react';
import { GlobeAltIcon } from '@heroicons/react/outline'
import { 
  UserGroupIcon, 
  ClipboardCheckIcon, 
  CalendarIcon,
} from '@heroicons/react/solid'

export default function Course({course, currentUser}) {
  const showCounters = (course) => course.evaluations_count || course.sessions_count || course.users_count
  
  return (
    <li>
    <a href={`/courses/${course.id}`} className="flex justify-between border-solid border border-gray-300 rounded bg-absolutewhite p-6 mb-2 text-black">
      <div className="flex">
      {course.image_url && <div><img width="240" className="inline-block mr-4 rounded" src={course.image_url} /></div>}
      <div>
        <h3 className="text-xl font-bold">
          {course.name}
          {course.public && <span className="text-sm text-gray-400"><GlobeAltIcon className="h-3 w-3 ml-2 inline-block relative" style={{top: -1}}/> Public course</span>}
          </h3>
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
      </div>
      {/* {!course.user_ids.includes(currentUser.id) && (
        <div>
          <button type="button" className="btn btn-blue text-xs " onClick={(e) => {e.preventDefault(); joinCourse(course.id)}}>Join course</button>
        </div>
      )} */}
    </a>
  </li>
  )
    
}