import update from 'immutability-helper';

function serializeListByIds(array) {
  return Object.values(array).reduce((result, obj) => {
    result[obj.id] = {...obj};
    return result;
  }, {});
}

export const [
  FETCH_NOTES,
  FETCH_NOTES_SUCCESS,
  CREATE_NOTE,
  INIT,
  DONE,
  UPDATE_NOTE,
  UPDATE_NOTE_FIELD,
  DELETE_NOTE,
] = [
  'FETCH_NOTES',
  'FETCH_NOTES_SUCCESS',
  'CREATE_NOTE',
  'INIT',
  'DONE',
  'UPDATE_NOTE',
  'UPDATE_NOTE_FIELD',
  'DELETE_NOTE',
];

export const initialState = {
  notes: [],
  status: INIT,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTES_SUCCESS:
      return {
        ...state,
        notes: serializeListByIds(action.data),
        status: DONE
      };
    case CREATE_NOTE:
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.data.id]: action.data
        }
      }
    case DELETE_NOTE:
      // debugger
      // const notes = state.notes.filter(n => n.id !== action.data)
      return {
        ...state,
        notes: notes,
      }
    case UPDATE_NOTE:
      return {
        ...state,
        notes: {
          ...state.notes,
          // [action.data.id]: action.data
        }
      }
    case UPDATE_NOTE_FIELD:
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.name]: {
            ...state.notes[action.name],
            text: action.data
          }
        }
      };
    default:
      return;
  }
};
