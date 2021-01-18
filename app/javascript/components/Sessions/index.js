import React from 'react';
import Modal from '@material-ui/core/Modal';
import 'date-fns';
import {
  KeyboardDateTimePicker
} from '@material-ui/pickers';

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
    sessions,
    createSession,
    updateSession,
    onOpenModal,
    handleFormField,
    handleDateChange,
    sessionsToArr,
    selectedSession,
   } = props

  const [open, setOpen] = React.useState(false);

  function handleOnOpenModal(e) {
    onOpenModal(e)
    setOpen(true)
  } 

  return (
    <thead>
      <tr>
      <td></td>  
      <td>
        <form onSubmit={(e) => createSession(e)}>
          <button type="submit" className="btn btn-blue">+</button>
        </form>
      </td>  
      {sessionsToArr && sessionsToArr.map((s,i) => (
        <td key={s.id}>
          <button type="button" onClick={() => handleOnOpenModal(s)} className="px-2">
            {i + 1}           
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
        <div className={classes.paper} className="bg-white p-10">
          {selectedSession && (
            <form onSubmit={updateSession}>
              <h3 className="text-1xl font-bold mb-4">{`Edit session ${selectedSession.id}`}</h3>
              <div className="form-field">
                  <KeyboardDateTimePicker
                    variant="inline"
                    ampm={false}
                    label="Date"
                    value={selectedSession.date}
                    onChange={handleDateChange}
                    onError={console.log}
                    disablePast
                    format="yyyy/MM/dd HH:mm"
                  />
              </div>
 
              <div className="form-field">
                <label>Description</label>
                <textarea
                  className="text-field" 
                  onChange={handleFormField}
                  name="description"
                  value={selectedSession.description} 
                />
              </div>
  
              <div className="form-field">
                <label>Objectives</label>
                <textarea
                  className="text-field" 
                  onChange={handleFormField}
                  name="objectives"
                  value={selectedSession.objectives} 
                />
              </div>
              <button type="submit" className="btn btn-blue">Update</button>
            </form>
          )}
        </div>
      </Modal>
      </tr>
    </thead>
  )
}
