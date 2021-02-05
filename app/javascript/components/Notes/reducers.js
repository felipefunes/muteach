// import update from 'immutability-helper';

function serializeListByIds(array) {
  return Object.values(array).reduce((result, obj) => {
    result[obj.id] = {...obj};
    return result;
  }, {});
}

export const [
  FETCH_NOTES,
  FETCH_NOTES_SUCCESS,
  INIT,
  DONE,
] = [
  'FETCH_NOTES',
  'FETCH_NOTES_SUCCESS',
  'INIT',
  'DONE',
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
    default:
      return;
  }
};
