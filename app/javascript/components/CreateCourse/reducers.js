// import update from 'immutability-helper';

export const [
  INIT,
  UPDATE_FIELD,
] = [
  'INIT',
  'UPDATE_FIELD',
];

export const initialState = {
  course_fields: {
    name: '',
    category_id: 'select_category',
    description: '',
    primary_objectives: '',
    sessions_amount: '',
    price: '',
    students_quota: '',
  },
  status: INIT,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...state,
        course_fields: {
          ...state.course_fields,
          [action.name]: action.data
        }
      };
    default:
      return;
  }
};
