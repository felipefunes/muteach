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

export default function Sessions(props) {
  
  const classes = useStyles();

  const { 
    createEvaluation,
    updateEvaluation,
    onOpenEvaluationModal,
    handleEvaluationField,
    handleEvaluationDateChange,
    evaluationsToArr,
    selectedEvaluation,
    setNewEvaluation,
   } = props

  const [open, setOpen] = React.useState(false);

  function handleOnOpenModal(evaluation) {
    onOpenEvaluationModal(evaluation)
    setOpen(true)
  }

  function onSetNewEvaluation(e) {
    e.preventDefault();
    setNewEvaluation();
    setOpen(true);
  }

  function saveModalInfo(e) {
    e.preventDefault();
    if (selectedEvaluation && selectedEvaluation.id) {
      return handleUpdateEvaluation(e)
    }
    onCreateEvaluation(e)
  }

  function handleUpdateEvaluation(e) {
    updateEvaluation(e);
    setOpen(false)
  }

  function onCreateEvaluation(e) {
    createEvaluation();
    setOpen(false);
  }

  return (
    <thead>
      <tr>
        <td>
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
            >
              {e.title}
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
                    type="text" 
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
                      label="Delivery at"
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
