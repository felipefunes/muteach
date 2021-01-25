import update from 'immutability-helper';

function serializeListByIds(array) {
  return Object.values(array.data).reduce((result, obj) => {
    result[obj.id] = {...obj.attributes};
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
  SET_SELECTED_SESSION,
  UPDATE_SESSION_USERS,
] = [
  'FETCH_SESSIONS_SUCCESS',
  'FETCH_SESSIONS',
  'INIT',
  'DONE',
  'CREATE_SESSION',
  'UPDATE_SESSION',
  'UPDATE_SELECTED_SESSION_FIELD',
  'SET_SELECTED_SESSION',
  'UPDATE_SESSION_USERS',
];

export const initialState = {
  sessions: [],
  selected_session: null,
  status: INIT,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SESSIONS_SUCCESS:
      return {
        ...state,
        sessions: serializeListByIds(action.data),
        status: DONE
      };
    case CREATE_SESSION:
      return {
        ...state,
        sessions: {
          ...state.sessions,
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
    case UPDATE_SELECTED_SESSION_FIELD:
      return {
        ...state,
        selected_session: {
          ...state.selected_session,
          [action.name]: action.data
        }
      };
    default:
      return;
  }
};