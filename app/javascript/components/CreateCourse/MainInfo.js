import React from 'react';

import {
  INIT,
  UPDATE_FIELD,
} from './reducers';

import { initialState, reducer } from './reducers';

export default function MainInfo({ setStep }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [categories, setCategories] = React.useState([]);

  function onSubmit(e) {
    e.preventDefault();
  }

  React.useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  })

  function fetchCategories() {
    fetch('/categories.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(cats) {
      setCategories(cats);
    })
  }

  function handleFormField(e) {
    dispatch({
      type: UPDATE_FIELD,
      data: e.target.value,
      name: e.target.name,
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    fetch('/courses.json', {
      method: 'POST', // or 'PUT'
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ course: state.course_fields }),
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setStep(2)
    })
    
    
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-10">
        <div className="col-span-1">
          <div className="form-field">
            <label>Course Name</label>
            <input 
              type="text" 
              className="text-field" 
              value={state.course_fields.name} 
              onChange={handleFormField}
              name="name"
            />
          </div>

          <div className="form-field">
            <div className="select-container">
              <select name="category_id" onChange={handleFormField} value={state.course_fields.category_id}>
                <option value="select_category" disabled={true}>Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-field">
            <label>Short description</label>
            <textarea 
              className="text-field" 
              onChange={handleFormField}
              name="description"
              value={state.course_fields.description}
            >
            </textarea>
          </div>

          {/* <div className="form-field">
            <label>Objetivos</label>
            <textarea 
              className="text-field"
              onChange={handleFormField}
              name="primary_objectives"
              value={state.course_fields.primary_objectives}
            >
            </textarea>
          </div> */}

          {/* <div className="form-field">
            <label>Sessions amount</label>
            <input 
              type="number" 
              className="text-field"
              onChange={handleFormField}
              name="sessions_amount"
              value={state.course_fields.sessions_amount}
            />
          </div> */}
          <div className="flex">
            <div className="form-field mr-4 flex-grow">
              <label>Price</label>
              <input 
                type="number" 
                className="text-field"
                onChange={handleFormField}
                name="price"
                value={state.course_fields.price}
              />
            </div>

            <div className="form-field ml-4 flex-grow">
              <label>Students quota</label>
              <input 
                type="number" 
                className="text-field"
                onChange={handleFormField}
                name="students_quota"
                value={state.course_fields.students_quota}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="form-field text-center">
            <div className="border-4 border-gray-300 rounded-lg p-10 border-dashed">
              <div className="text-4xl">📷</div>
              <label className="mb-3">Select an Image</label>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-between form-field flex">
        <div></div>
        <button type="submit" className="btn btn-blue">
          Next step →
        </button>
      </div>
    </form>
  )
}
