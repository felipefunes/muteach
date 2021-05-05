import update from 'immutability-helper';

function serializeListFromAPIByIds(array) {
  return Object.values(array.data).reduce((result, obj) => {
    result[obj.id] = {...obj.attributes};
    return result;
  }, {});
}

function serializeListByIds(array) {
  return Object.values(array).reduce((result, obj) => {
    result[obj.id] = {...obj};
    return result;
  }, {});
}

export const [
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS,
  INIT,
  DONE,
  CREATE_SESSION,
  UPDATE_SESSION,
  UPDATE_SELECTED_SESSION_FIELD,
  DELETE_SESSION,
  SET_SELECTED_SESSION,
  UPDATE_SESSION_USERS,
  FETCH_USERS_SUCCESS,
  SET_SELECTED_USER,
  FETCH_EVALUATIONS_SUCCESS,
  SET_SELECTED_EVALUATION,
  UPDATE_SELECTED_EVALUATION_FIELD,
  UPDATE_EVALUATION,
  CREATE_EVALUATION,
  UPDATE_NOTES_COUNT,
  FETCH_CURRENT_NOTES,
  CLEAN_CURRENT_NOTES,
  CREATE_NOTE,
  UPDATE_NOTE,
  UPDATE_NOTE_FIELD,
  DELETE_NOTE,
] = [
  'FETCH_SESSIONS_SUCCESS',
  'FETCH_SESSIONS',
  'INIT',
  'DONE',
  'CREATE_SESSION',
  'UPDATE_SESSION',
  'UPDATE_SELECTED_SESSION_FIELD',
  'DELETE_SESSION',
  'SET_SELECTED_SESSION',
  'UPDATE_SESSION_USERS',
  'FETCH_USERS_SUCCESS',
  'SET_SELECTED_USER',
  'FETCH_EVALUATIONS_SUCCESS',
  'SET_SELECTED_EVALUATION',
  'UPDATE_SELECTED_EVALUATION_FIELD',
  'UPDATE_EVALUATION',
  'CREATE_EVALUATION',
  'UPDATE_NOTES_COUNT',
  'FETCH_CURRENT_NOTES',
  'CLEAN_CURRENT_NOTES',
  'CREATE_NOTE',
  'UPDATE_NOTE',
  'UPDATE_NOTE_FIELD',
  'DELETE_NOTE',
];

export const initialState = {
  sessions: [],
  evaluations: [],
  users: {},
  selected_session: null,
  selected_evaluation: null,
  current_notes: [],
  status: INIT,
  current_notes_status: INIT,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SESSIONS_SUCCESS:
      return {
        ...state,
        sessions: serializeListFromAPIByIds(action.data),
        status: DONE
      };
    case DELETE_SESSION:
      const sessions = 
        Object.values(state.sessions).filter(s => s.id !== action.data.id)
      return {
        ...state,
        sessions: serializeListByIds(sessions),
      };
    case CREATE_SESSION:
      return {
        ...state,
        sessions: {
          ...state.sessions,
          [action.data.id]: action.data
        }
      }
    case CREATE_EVALUATION:
      return {
        ...state,
        evaluations: {
          ...state.evaluations,
          [action.data.id]: action.data
        }
      }
    case UPDATE_SESSION:
      return {
        ...state,
        ...{
          sessions: update(state.sessions, {
            [action.data.id]: {
              $set: action.data,
            },
          }),
        },
      }
    case UPDATE_EVALUATION:
      return {
        ...state,
        ...{
          evaluations: update(state.evaluations, {
            [action.data.id]: {
              $set: action.data,
            },
          }),
        },
      }
    case UPDATE_NOTES_COUNT:
      const notesCount = [
        ...state.users[action.data.user_id].notes_count.filter(c => c.session_id !== action.data.session_id),
        {
          session_id: action.data.session_id, 
          count: Object.keys(state.current_notes).length,
        }
      ]
      return {
        ...state,
        ...{
          users: update(state.users, {
            [action.data.user_id]: {
              notes_count: {
                $set: notesCount,
              }
            },
          }),
        },
      }
    case UPDATE_SESSION_USERS:
        return {
          ...state,
          sessions: {
            ...state.sessions,
            [action.id]: {
              ...state.sessions[action.id],
              user_ids: action.data,
            }
          },
        }
    case SET_SELECTED_SESSION:
      return {
        ...state,
        selected_session: update(state.sessions, {
          $set: action.data,
        }),
      }
    case SET_SELECTED_EVALUATION:
      return {
        ...state,
        selected_evaluation: update(state.evaluations, {
          $set: action.data,
        })
      }
    case SET_SELECTED_USER:
        return {
          ...state,
          selected_user: update(state.user, {
            $set: action.data,
          }),
        }
    case UPDATE_SELECTED_SESSION_FIELD:
      return {
        ...state,
        selected_session: {
          ...state.selected_session,
          [action.name]: action.data
        }
      };
    case UPDATE_SELECTED_EVALUATION_FIELD:
      return {
        ...state,
        selected_evaluation: {
          ...state.selected_evaluation,
          [action.name]: action.data
        }
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: serializeListFromAPIByIds(action.data),
        status: DONE
      };
    case FETCH_EVALUATIONS_SUCCESS:
      return {
        ...state,
        evaluations: serializeListByIds(action.data),
      };
    case CLEAN_CURRENT_NOTES:
      return {
        ...state,
        current_notes: action.data,
        current_notes_status: INIT
      };
    case FETCH_CURRENT_NOTES:
      return {
        ...state,
        current_notes: serializeListByIds(action.data),
        current_notes_status: DONE
      }
    case CREATE_NOTE:
      return {
        ...state,
        current_notes: {
          ...state.current_notes,
          [action.data.id]: action.data
        }
      }
    case DELETE_NOTE:
      const notes = 
        Object.values(state.current_notes).filter(n => n.id !== action.data.id)
      return {
        ...state,
        current_notes: serializeListByIds(notes),
      }
    case UPDATE_NOTE:
      return {
        ...state,
        current_notes: {
          ...state.current_notes,
          [action.data.id]: action.data
        }
      }
    case UPDATE_NOTE_FIELD:
      return {
        ...state,
        current_notes: {
          ...state.current_notes,
          [action.name]: {
            ...state.current_notes[action.name],
            text: action.data
          }
        }
      };
    default:
      return;
  }
};
