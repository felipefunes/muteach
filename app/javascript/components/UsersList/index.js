import React from 'react';
import UserScores from '../UserScores';
import Notes from '../Notes';
import Modal from '@material-ui/core/Modal';
import Tooltip from '@material-ui/core/Tooltip';
import { DocumentTextIcon, CalendarIcon, CheckIcon, MailIcon } from '@heroicons/react/outline'
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
    padding: theme.spacing(4),
  },
}));

import {
  CLEAN_CURRENT_NOTES,
} from '../Course/reducers';
import { CourseContext } from '../Course/index'

export default function UsersList({ 
  courseId,
  sessionsToArr, 
  evaluationsToArr,
  handleAssistance, 
  usersToArr, 
  handleOnOpenModal, 
  onOpenSessionUser,
  selectedSession,
  selectedUser,
  viewMode,
}) {
  
  const classes = useStyles();
  const { state, dispatch } = React.useContext(CourseContext);
  const [open, setOpen] = React.useState(false);
  
  function handleCloseModal() {
    setOpen(false)
    dispatch({
      type: CLEAN_CURRENT_NOTES,
      data: [],
    });
  }

  function handleOnOpenModal(session, user) {
    onOpenSessionUser(session, user)
    setOpen(true)
  }

  function handleUpdateSession(e) {
    updateSession(e);
    setOpen(false)
  }

  function sortByName(a, b) {
    const handledA = a.name || a.email;
    const handledB = b.name || b.email;
    const nameA = handledA.toUpperCase(); // ignore upper and lowercase
    const nameB = handledB.toUpperCase(); // ignore upper and lowercase
    
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  }

  return ( 
    <tbody>
      {usersToArr && usersToArr.sort((a,b) => sortByName(a, b)).map((user, index) => (
        <tr key={user.id}>
          <td className="sticky z-10 bg-absolutewhite" style={{left: 0}}>
            <Tooltip title={`View ${user.name || user.email}'s details`}>
              <a href={`/courses/${courseId}/users/${user.id}`} className="text-sm font-semibold text-black">
                {index + 1}
                {'. '}
                {user.name || user.email}
              </a>
            </Tooltip>
            {!(user.email.includes('_user_') && user.email.includes('@muteach.com')) && (
              <Tooltip title={`Send an email to ${user.name || user.email}`}>
                <a href={`mailto:${user.email}`}>
                  <MailIcon className="ml-1 h-4 w-4 text-gray-600 hover:text-blue-600 inline-block"/>
                </a>
              </Tooltip>
            )}
          </td>
          {viewMode === 'sessions' ? (
            sessionsToArr && sessionsToArr.map(session => (
              <td key={session.id} className="text-center">
                <Tooltip title="Student notes">
                  <button type="button" className="mr-1 px-2 inline-flex align-middle" onClick={() => handleOnOpenModal(session, user)}>
                    <span className="text-gray-600 text-xs">{user.notes_count.find(c => c.session_id === session.id)?.count}</span>
                    <DocumentTextIcon className="h-4 w-4 text-gray-600 hover:text-blue-700"/>
                  </button>
                </Tooltip>
                <Tooltip title={session.user_ids.includes(user.id) ? 'Remove attendance' : 'Mark as present'}>
                  <span className="inline-block relative align-middle">
                    <input 
                      type="checkbox"
                      name={user.id} 
                      data-session={session.id} 
                      onChange={handleAssistance}
                      checked={session.user_ids.includes(user.id)}
                      className="absolute inset-0 z-10 opacity-0 w-full h-full cursor-pointer"
                    />
                    {session.user_ids.includes(user.id) ? (
                      <CheckIcon className="h-4 w-4 hover:text-red-600 z-0 text-green-600"/>
                    ) : (
                      <CalendarIcon className="h-4 w-4 hover:text-green-600 z-0 text-gray-600"/>
                    )}
                    
                  </span>
                </Tooltip>
                
              </td>
            ))
          ) : (
            <UserScores 
              courseId={courseId}
              evaluations={evaluationsToArr}
              userId={user.id}
            />
          )}
        </tr>
      ))}
      <Modal
        open={open}
        onClose={() => handleCloseModal()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={`${classes.paper} modal-container`}>

          {selectedSession && selectedUser && (
            <>
              <h4 className="text-md font-bold mt-1 leading-tight text-gray-600">{`Session ${sessionsToArr.findIndex(s => s.id === selectedSession.id) + 1}: `}</h4>
              <h3 className="text-xl font-bold mb-3">
                {`${selectedUser.name}'s notes`}
              </h3>
              <Notes
                courseId={courseId}
                sessionId={selectedSession.id}
                user={selectedUser}
              />
            </>
          )}
          <div className="flex text-rifth">
            <button type="button" className="btn btn-blue mt-4" onClick={() => handleCloseModal()}>
              Save notes
            </button>
          </div>
        </div>
      </Modal>
    </tbody>
  )
}
