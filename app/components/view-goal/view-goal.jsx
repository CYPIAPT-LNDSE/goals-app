import React from 'react';
import GoalTileComponent from '../goal-tile.jsx'
import ProgressBarComponent from './progress-bar.jsx'

const viewGoal = ( { currentGoal } ) => {
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

    {/* button to rate process */}
  </div>
  )
}

export default viewGoal;
