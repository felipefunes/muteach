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

 
  const scoreToPercentage = (evaluation_id) => {
    const id = Number(evaluation_id);
    const evaluation = evaluations.find(e => e['id'] === id);
    const score = state.scores[id] ? state.scores[id].points : newScore;
    const totalPoints = evaluation.total_points;
    if (!totalPoints || score === '') return null
    return ((score * 100) / totalPoints).toFixed(1)
  }

  const scoreOverMinimum = (evaluation_id) => {
    const id = Number(evaluation_id);
    const evaluation = evaluations.find(e => e['id'] === id);
    const approvalPercentage = evaluation.approval_percentage;
    if (!approvalPercentage) return true
    return scoreToPercentage(id) > approvalPercentage;
  }

  return (
    evaluations && evaluations.map(evaluation => (
      <td key={evaluation.id} className="text-right font-mono">
        {state.scores[evaluation.id] ? (
          <>
          <input
            style={{ width: '4em' }}
            className="text-right bg-transparent p-0"
            type="text" 
            value={state.scores[evaluation.id].points}
            name={evaluation.id}
            onChange={onChangeScore} 
            onBlur={updateScore}
            onKeyUp={event => {
              if (event.key === 'Enter') {
                event.preventDefault();
                updateScore(event);
                event.target.blur();
              }
            }}
          />
          {state.scores[evaluation.id].points && (
            <>
              <span className="text-gray-600 text-xs ml-1">p</span>
              <div 
                className={`${scoreOverMinimum(evaluation.id) ? 'text-green-600' : 'text-red'} ml-2 font-bold text-xs`}
              >
                {scoreToPercentage(evaluation.id) && `${scoreToPercentage(evaluation.id)}%`}
              </div>
            </>
          )}
          </>
        ) : (
            <>
            <input
              style={{ width: '4em' }}
              className="text-right bg-transparent p-0"
              type="text"
              value={newScore}
              name={evaluation.id}
              onChange={(e) => setNewScore(Number(e.target.value))} 
              onBlur={createScore}
              onKeyUp={event => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  createScore(event);
                  event.target.blur();
                }
              }}
            />
            {newScore && (
              <>
                <span className="text-gray-600 text-xs ml-1">p</span>
                <div 
                  className={`${scoreOverMinimum(evaluation.id) ? 'text-green-600' : 'text-red'} ml-2 font-bold text-xs`}
                >
                  {scoreToPercentage(evaluation.id) && `${scoreToPercentage(evaluation.id)}%`}
                </div>
              </>
            )}
            </>
        )}
      </td>
    ))
  )
}
