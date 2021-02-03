import React from 'react';

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

export default function UsersList({ 
  sessionsToArr, 
  handleAssistance, 
  usersToArr, 
  handleOnOpenModal, 
  onOpenModal,
}) {
  
  const classes = useStyles();
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
    <tbody>
      {sessionsToArr && usersToArr && usersToArr.map(user => (
        <tr key={user.id}>
          <td>
            <div className="text-sm font-semibold">{user.name}</div>
            <div className="text-gray-600 text-xs">{user.email}</div>
          </td>
          {sessionsToArr.map(session => (
            <td key={session.id} className="text-center">
              <input 
                type="checkbox" 
                name={user.id} 
                data-session={session.id} 
                onChange={handleAssistance}
                checked={session.user_ids.includes(user.id)}
              />
              <button type="button" className="px-2" onClick={() => handleOnOpenModal(session)}>
                <span className="transform rotate-90 flex" rol="img">✏️</span>
              </button>
            </td>
          ))}
        </tr>
      ))}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper} className="bg-white p-10">Hola Perrito</div>
      </Modal>
    </tbody>
  )
}
