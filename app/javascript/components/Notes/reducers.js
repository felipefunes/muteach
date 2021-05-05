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
    
    default:
      return;
  }
};
