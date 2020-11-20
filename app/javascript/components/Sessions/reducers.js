import update from 'immutability-helper';

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
] = [
  'FETCH_SESSIONS_SUCCESS',
  'FETCH_SESSIONS',
  'INIT',
  'DONE',
  'CREATE_SESSION',
];

export const initialState = {
  sessions: [],
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
    default:
      return;
  }
};