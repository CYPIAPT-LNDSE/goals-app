import React from 'react';
import GoalTileComponent from '../goal-tile.jsx';
import ProgressBarComponent from './progress-bar.jsx';
import LineChart from './line-chart.jsx';

const viewGoal = ({ currentGoal, rateGoal, }) => {

  const time = new Date().toString();
  const progressBars = currentGoal.ratings.slice(0, 3)
    .map(rating =>
      <ProgressBarComponent
        key={ rating.id }
        rating={ rating }
        time={ time }
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
        <LineChart ratings={ currentGoal.ratings }/>
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
