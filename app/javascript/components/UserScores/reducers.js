function serializeListByIds(array) {
  return Object.values(array).reduce((result, obj) => {
    result[obj.evaluation_id] = {...obj};
    return result;
  }, {});
}

export const [
  FETCH_SCORES_SUCCESS,
  CREATE_SCORE,
  UPDATE_SCORE,
  UPDATE_SCORE_FIELD,
  INIT,
  DONE,
] = [
  'FETCH_SCORES_SUCCESS',
  'CREATE_SCORE',
  'UPDATE_SCORE',
  'UPDATE_SCORE_FIELD',
  'INIT',
  'DONE',
];

export const initialState = {
  scores: [],
  status: INIT,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCORES_SUCCESS:
      return {
        ...state,
        scores: serializeListByIds(action.data),
        status: DONE
      };
    case CREATE_SCORE:
      return {
        ...state,
        score: {
          ...state.notes,
          [action.data.id]: action.data
        }
      }
    
    case UPDATE_SCORE_FIELD:
      return {
        ...state,
        scores: {
          ...state.scores,
          [action.name]: {
            ...state.scores[action.name],
            points: action.data
          }
        }
      };
    default:
      return;
  }
};
