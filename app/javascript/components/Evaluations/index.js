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
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Sessions(props) {
  
  const classes = useStyles();

  const { 
    createEvaluation,
    updateSession,
    onOpenModal,
    handleEvaluationField,
    handleEvaluationDateChange,
    evaluationsToArr,
    selectedEvaluation,
    setNewEvaluation,
   } = props

  const [open, setOpen] = React.useState(false);

  function handleOnOpenModal(session) {
    onOpenModal(session)
    setOpen(true)
  }

  function handleUpdateEvaluation(e) {
    updateSession(e);
    setOpen(false)
  }

  function onSetNewSession(e) {
    e.preventDefault();
    setNewEvaluation();
    setOpen(true);
  }

  function onCreateEvaluation(e) {
    e.preventDefault();
    createEvaluation();
    setOpen(false);
  }

  return (
    <thead>
      <tr>
        <td>
          <form onSubmit={onSetNewSession}>
            <button type="submit" className="text-blue-700">+ Create evaluation</button>
          </form>
        </td>  

        {evaluationsToArr && evaluationsToArr.map((e,i) => (
          <td key={e.id}>
            {`${i + 1}. `}
            {e.title}
          </td>
        ))}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
        >
          <div className={classes.paper} className="bg-white p-10">
            {selectedEvaluation && (
              <form onSubmit={onCreateEvaluation}>
                <div className="form-field">
                  <label>Title</label>
                  <input 
                    type="text" 
                    className="text-field" 
                    name="title" 
                    onChange={handleEvaluationField} 
                    value={selectedEvaluation.title}
                  />
                </div>
                <div className="form-field">
                  <label>Description</label>
                  <textarea
                    className="text-field" 
                    onChange={handleEvaluationField}
                    name="description"
                    value={selectedEvaluation.description || ''} 
                  />
                </div>
                <div className="form-field">
                  <label>Objectives</label>
                  <textarea
                    className="text-field" 
                    onChange={handleEvaluationField}
                    name="objectives"
                    value={selectedEvaluation.objectives || ''} 
                  />
                </div>
                <div className="form-field">
                  <label>Attachment url</label>
                  <input 
                    type="text" 
                    className="text-field" 
                    name="attachment_url" 
                    onChange={handleEvaluationField} 
                    value={selectedEvaluation.attachment_url}
                  />
                </div>
                <div className="form-field flex">
                  <div className="pr-3">
                    <label>Points</label>
                    <input 
                      type="text" 
                      className="text-field" 
                      name="total_points" 
                      onChange={handleEvaluationField} 
                      value={selectedEvaluation.total_points}
                    />
                  </div>
                  <div>
                  <label>Approval %</label>
                  <input 
                    type="text" 
                    className="text-field" 
                    name="approval_percentage" 
                    onChange={handleEvaluationField} 
                    value={selectedEvaluation.approval_percentage}
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
                
                <button type="submit" className="btn btn-blue">Save</button>
              </form>
            )}
          </div>
        </Modal>
      </tr>
    </thead>
  )
}
