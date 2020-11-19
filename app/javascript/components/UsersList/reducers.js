import update from 'immutability-helper';

function serializeListByIds(array) {
  return Object.values(array).reduce((result, obj) => {
    result[obj.id] = {...obj};
    return result;
  }, {});
}

export const [
  FETCH_USERS_SUCCESS,
  DONE,
] = [
  'FETCH_USERS_SUCCESS',
  'DONE',
];

export const initialState = {
  users: {},
  status: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: serializeListByIds(action.data),
        status: DONE
      };
    default:
      return;
  }
};
