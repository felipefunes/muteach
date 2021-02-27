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
    createSession,
    updateSession,
    onOpenModal,
    handleFormField,
    handleDateChange,
    sessionsToArr,
    selectedSession,
   } = props

  const [open, setOpen] = React.useState(false);

  function handleOnOpenModal(session) {
    onOpenModal(session)
    setOpen(true)
  }

  function handleUpdateSession(e) {
    updateSession(e);
    setOpen(false)
  }

  return (
    <thead>
      <tr>
        <td>
          <form onSubmit={createSession}>
            <button type="submit" className="text-blue-700">+ Add new session</button>
          </form>
        </td>  
        {sessionsToArr && sessionsToArr.map((s,i) => (
          <td key={s.id}>
            <button type="button" onClick={() => handleOnOpenModal(s)} className="px-2 text-center">
              <span className="block text-sm font-semibold mb-1">{i + 1}</span>
              <span className="block text-xs text-gray-600">
                { s.date ? format(new Date(s.date), 'dd/MM/yy') : '🗓' }
              </span>          
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
              <form onSubmit={handleUpdateSession}>
                <h3 className="text-1xl font-bold mb-4">{`Edit session ${selectedSession.id}`}</h3>
                <div className="form-field">
                    <KeyboardDateTimePicker
                      variant="inline"
                      ampm={false}
                      label="Date"
                      value={selectedSession.date}
                      onChange={handleDateChange}
                      onError={console.log}
                      format="yyyy/MM/dd HH:mm"
                    />
                </div>
  
                <div className="form-field">
                  <label>Description</label>
                  <textarea
                    className="text-field" 
                    onChange={handleFormField}
                    name="description"
                    value={selectedSession.description || ''} 
                  />
                </div>
    
                <div className="form-field">
                  <label>Objectives</label>
                  <textarea
                    className="text-field" 
                    onChange={handleFormField}
                    name="objectives"
                    value={selectedSession.objectives || ''} 
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
