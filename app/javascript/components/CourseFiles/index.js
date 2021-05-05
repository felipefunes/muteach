import React from 'react';
import { imageUpload } from '../common/uploader'

export default function CourseFiles() {
  return (
    <>
    <thead>
      <tr>
        <td>
          <form onSubmit={() =>{}}>
            <button type="submit" className="text-blue-700">+ Add a file</button>
          </form>
        </td>  
      </tr>
    </thead>
    <tbody>
    <tr>
      <td>
        File name
      </td>  
      </tr>
    </tbody>

    </>
  )
}
