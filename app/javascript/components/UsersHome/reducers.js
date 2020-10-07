import update from 'immutability-helper';

function serializeListByIds(array) {
  return Object.values(array).reduce((result, obj) => {
    result[obj.id] = {...obj};
    return result;
  }, {});
}

export const [
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES,
  INIT,
  DONE,
] = [
  'FETCH_COURSES_SUCCESS',
  'FETCH_COURSES',
  'INIT',
  'DONE',
];

export const initialState = {
  courses: [],
  status: INIT,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSES_SUCCESS:
      return {
        ...state,
        courses: serializeListByIds(action.data),
        status: DONE
      };
    default:
      return;
  }
};
