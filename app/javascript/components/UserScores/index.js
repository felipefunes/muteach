import React from 'react';
import {
  FETCH_SCORES_SUCCESS,
  CREATE_SCORE,
  UPDATE_SCORE,
  UPDATE_SCORE_FIELD,
  INIT,
} from './reducers';

import { initialState, reducer } from './reducers';

export default function UserScores({ evaluations, courseId, userId }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [newScore, setNewScore] = React.useState('')

  React.useEffect(() => {
    if (state.status === INIT) {
      fetchScores();
    }
  }, [state.status])

  function fetchScores() {
    fetch(`/courses/${courseId}/user/${userId}/scores.json`)
    .then(function(response) {
      return response.json();
    })
    .then(function(scores) {
      dispatch({
        type: FETCH_SCORES_SUCCESS,
        data: scores,
      });
    })
  }

  function createScore(event) {
    fetch(`/scores.json`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ scores: {
        points: event.target.value,
        user_id: userId,
        evaluation_id: Number(event.target.name)
      } }),
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .then(response => response.json())
    .then(score => {
      dispatch({
        type: CREATE_SCORE,
        data: score,
      });
      console.log('Success:', score);
    })
  }

  function updateScore(event) {
    const score = state.scores[Number(event.target.name)]
    fetch(`/scores/${score.id}.json`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ scores: score }),
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }

  function onChangeScore(event) {
    dispatch({
      type: UPDATE_SCORE_FIELD,
      data: event.target.value,
      name: Number(event.target.name),
    });
  }

  return (
    evaluations && evaluations.map(evaluation => (
      <td key={evaluation.id}>
        {state.scores[evaluation.id] ? (
          <input 
            type="number" 
            value={state.scores[evaluation.id].points}
            name={evaluation.id}
            onChange={onChangeScore} 
            onBlur={updateScore} 
          />
        ) : (
          <input 
            type="number"
            value={newScore}
            name={evaluation.id}
            onChange={(e) => setNewScore(e.target.value)} 
            onBlur={createScore} 
          />
        )}
      </td>
    ))
  )
}
