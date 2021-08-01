import React from 'react';
import 'date-fns';
import { format } from 'date-fns';
import {
  KeyboardDateTimePicker
} from '@material-ui/pickers';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

import {
  FETCH_EVALUATIONS_SUCCESS,
  SET_SELECTED_EVALUATION,
  UPDATE_SELECTED_EVALUATION_FIELD,
  CREATE_EVALUATION,
  UPDATE_EVALUATION,
} from '../Course/reducers';

import { CourseContext } from '../Course/index'

export default function Sessions({ 
  selectedEvaluation,
  courseId,
  isActive,
 }) {
  const { state, dispatch } = React.useContext(CourseContext);
  
  const classes = useStyles();

  const evaluationsToArr = Object.values(state.evaluations).map(evaluation => evaluation)

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (isActive && state.evaluations.length === 0) {
      fetchEvaluations();
    }

  }, [isActive])

  function fetchEvaluations() {
    fetch(`/courses/${courseId}/evaluations.json`)
    .then(function(response) {
      return response.json();
    })
    .then(function(evaluations) {
      dispatch({
        type: FETCH_EVALUATIONS_SUCCESS,
        data: evaluations,
      });
    })
  }

  function createEvaluation() {
    fetch(`/courses/${courseId}/evaluations.json`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ evaluation: state.selected_evaluation }),
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .then(response => response.json())
    .then(evaluation => {
      dispatch({
        type: CREATE_EVALUATION,
        data: evaluation,
      });
      setOpen(false)
      console.log('Success:', evaluation);
    })
  }

  function updateEvaluation() {
    fetch(`/courses/${courseId}/evaluations/${state.selected_evaluation.id}.json`, {
      method: 'PUT', // or 'PUT'
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ evaluation: state.selected_evaluation }),
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .then(response => response.json())
    .then(evaluation => {
      dispatch({
        type: UPDATE_EVALUATION,
        data: evaluation,
      });
      setOpen(false)
      console.log('Success:', evaluation);
    })
  }

  function handleOnOpenModal(evaluation) {
    dispatch({
      type: SET_SELECTED_EVALUATION,
      data: evaluation,
    })
    setOpen(true)
  }

  function handleEvaluationField(e) {
    dispatch({
      type: UPDATE_SELECTED_EVALUATION_FIELD,
      data: e.target.value,
      name: e.target.name,
    });
  }

  function onSetNewEvaluation(e) {
    e.preventDefault();
    setNewEvaluation();
    setOpen(true);
  }

  function saveModalInfo(e) {
    e.preventDefault();
    if (selectedEvaluation && selectedEvaluation.id) {
      return updateEvaluation(e)
    }
    createEvaluation(e)
  }

  function setNewEvaluation() {
    const evaluation = {
      title: '',
      description: '',
      objectives: '',
      total_points: '',
      approval_percentage: '',
      delivery_date: null,
      attachment_url: '',
    }

    dispatch({
      type: SET_SELECTED_EVALUATION,
      data: evaluation,
    })
  }

  function handleEvaluationDateChange(e) {
    dispatch({
      type: UPDATE_SELECTED_EVALUATION_FIELD,
      data: e,
      name: 'delivery_date',
    });
  }

  return (
    <thead>
      <tr>
        <td className="sticky z-10 bg-absolutewhite" style={{left: 0}}>
          <form onSubmit={onSetNewEvaluation}>
            <button type="submit" className="text-blue-700">
              + Create evaluation
            </button>
          </form>
        </td>  

        {evaluationsToArr && evaluationsToArr.map(e => (
          <td key={e.id} className="text-right">
            <button 
              type="button" 
              onClick={() => handleOnOpenModal(e)} 
              className="w-full h-full"
            >
              {e.title ? e.title : 'Edit'}
            </button>
          </td>
        ))}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
        >
          <div className={`${classes.paper} modal-container`}>
            {selectedEvaluation && (
              <form onSubmit={saveModalInfo}>
                <div className="form-field">
                  <input 
                    type="text" 
                    placeholder="Add title"
                    className="text-field font-bold text-base" 
                    name="title" 
                    onChange={handleEvaluationField} 
                    value={selectedEvaluation.title || ''}
                  />
                </div>
                <div className="form-field">
                  <textarea
                    placeholder="Add description"
                    className="text-field" 
                    onChange={handleEvaluationField}
                    name="description"
                    value={selectedEvaluation.description || ''} 
                  />
                </div>
                <div className="form-field">
                  <textarea
                    placeholder="Add objectives"
                    className="text-field" 
                    onChange={handleEvaluationField}
                    name="objectives"
                    value={selectedEvaluation.objectives || ''} 
                  />
                </div>
                <div className="form-field">
                  <input 
                    placeholder="Add attachment url"
                    type="url" 
                    className="text-field" 
                    name="attachment_url" 
                    onChange={handleEvaluationField} 
                    value={selectedEvaluation.attachment_url || ' '}
                  />
                </div>
                <div className="form-field flex">
                  <div className="pr-3">
                    <input 
                      placeholder="Add total points"
                      type="text" 
                      className="text-field" 
                      name="total_points" 
                      onChange={handleEvaluationField} 
                      value={selectedEvaluation.total_points || ''}
                    />
                  </div>
                  <div>
                  <input 
                    type="text" 
                    placeholder="Add approval %"
                    className="text-field" 
                    name="approval_percentage" 
                    onChange={handleEvaluationField} 
                    value={selectedEvaluation.approval_percentage || ''}
                  />
                  </div>
                  
                </div>
                <div className="form-field">
                    <KeyboardDateTimePicker
                      variant="inline"
                      ampm={false}
                      label="Delivery at (Date and hour)"
                      value={selectedEvaluation.delivery_date}
                      onChange={handleEvaluationDateChange}
                      onError={console.log}
                      format="yyyy/MM/dd HH:mm"
                    />
                </div>
                <div className="flex justify-between pb-3 pt-8 text-gray-600">
                  <button type="submit" className="text-xs">🗑 Delete evaluation</button>
                  <button type="submit" className="btn btn-blue">Save</button>
                </div>
              </form>
            )}
          </div>
        </Modal>
      </tr>
    </thead>
  )
}
