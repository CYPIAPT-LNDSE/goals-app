import React from 'react';
import GoalTileComponent from '../goal-tile.jsx'
import ProgressBarComponent from './progress-bar.jsx'

const viewGoal = ( { currentGoal } ) => {
  const rateGoal = (goal) => {
    console.log("hello");
  };
  const rating = [5, 6, 7];
  const progressBars = rating.map( rating =>
     <ProgressBarComponent key={rating} rating={rating} time={"today"} />
   ); {/* Change the key to id */}

  return (
    <div>
    <GoalTileComponent goal={currentGoal} className="viewGoal" />
    <div>
      {progressBars}
    </div>
    <div className="line-chart-container">
      {/* Line chart placeholder*/}
    </div>

    <div className="view-goal-buttonContainer">
      <div className="button-outer">
        <button
          type="button"
          name="button"
          className="new-rating-button"
          onClick={ () => rateGoal(currentGoal) }
        >ADD</button>
      </div>
    </div>

  </div>
  )
}

export default viewGoal;
