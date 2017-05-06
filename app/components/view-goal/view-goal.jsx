import React from 'react';
import PropTypes from 'prop-types';

/* components */
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
        <div className="line-chart-title" onClick={ stepLineChartDetail }>
          <div className="line-chart-title-text">
            <p id="line-chart-title-text">Your progress so far&nbsp;</p>
          </div>
          <div className="line-chart-title-arrow">
            <div className="arrow-1" />
          </div>
        </div>
        <div className="line-chart-inner" onClick={ stepLineChartDetail }>
          <LineChart
            ratings={ latestRatings }
            avatar={ currentGoal.avatar }
            isChartPreview={ true }
          />
        </div>
      </div>
      <div className="view-goal-button-container goal-detail-button-container">
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
  currentGoal: PropTypes.object,
  rateGoal: PropTypes.func,
  stepLineChartDetail: PropTypes.func,
  dynamicStyle: PropTypes.object,
};

export default viewGoal;
