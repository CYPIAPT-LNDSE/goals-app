import React from 'react';
import GoalTileComponent from '../goal-tile.jsx';
import ProgressBarComponent from './progress-bar.jsx';
import LineChart from './line-chart.jsx';

const viewGoal = ({ currentGoal, rateGoal, stepLineChartDetail, dynamicStyle, }) => {

  const ratings = currentGoal.ratings;
  const latestRatings = ratings.slice(0, 3).reverse();

  const time = new Date().toString();
  const progressBars = latestRatings
    .map(rating =>
      <ProgressBarComponent
        key={ rating.id }
        rating={ rating }
        time={ time }
      />
   );

  return (
    <div className="view-goal goal-detail-page" style={ dynamicStyle }>
      <div className="goal-detail-goal-tile-container">
        <GoalTileComponent goal={ currentGoal } />
      </div>
      <div className="view-goal-progress-container">
        { progressBars }
      </div>
      <div className="line-chart-container">
        <div className="line-chart-title">
          <p
            id="line-chart-title-text"
            onClick={ stepLineChartDetail }
          >Your progress so far&nbsp;&gt;</p>
        </div>
        <div className="line-chart-inner">
          <LineChart
            ratings={ latestRatings }
            avatar={ currentGoal.avatar }
            isChartPreview={ true }
          />
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
  stepLineChartDetail: React.PropTypes.func,
  dynamicStyle: React.PropTypes.object,
};

export default viewGoal;
