import React from 'react';
import GoalTileComponent from '../goal-tile.jsx';
import ProgressBarComponent from './progress-bar.jsx';

const viewGoal = ( { currentGoal, rateGoal } ) => {
  const progressBars = currentGoal.ratings.slice(0, 3).map( rating =>
     <ProgressBarComponent
       rating={ rating }
       key={ rating.id }
     />
   );

  return (
    <div className="view-goal goal-detail-page">
      <div className="goal-detail-goal-tile-container">
        <GoalTileComponent goal={ currentGoal } />
      </div>
      <div className="view-goal-progress-container">
        { progressBars }
      </div>
      <div className="line-chart-container">
        <div className="line-chart-title">
          <p>Line chart</p>
          <img src="./images/icons/arrow_right.svg" className="line-chart-arrow" />
        </div>
        <div className="line-chart-img">
          <img src="images/line-chart-placeholder.png" />
        </div>
      </div>
      <div className="view-goal-buttonContainer goal-detail-buttonContainer">
        <div className="button-outer">
          <button
            type="button"
            name="button"
            className="new-rating-button"
            onClick = { rateGoal }
          >New Rating</button>
        </div>
      </div>
    </div>
  );
};

viewGoal.propTypes = {
  currentGoal: React.PropTypes.object,
  rateGoal: React.PropTypes.func,
};

export default viewGoal;
