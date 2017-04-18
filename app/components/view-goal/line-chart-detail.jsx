import React from 'react';
import GoalTileComponent from '../goal-tile.jsx';

const LineChartDetail = ({ currentGoal, }) => {

  return (
   <div className="line-chart-detail goal-detail-page">
     <div className="goal-detail-goal-tile-container">
       <GoalTileComponent goal={ currentGoal } />
     </div>
     <div className="line-chart-container-detail">
       <div className="line-chart-detail-feedback-container">
         <p className="detail-feedback">
           January 1st 2017
           This is my rating
         </p>
       </div>
       <div className="detail-chart-container"></div>
     </div>
   </div>
  );
};

LineChartDetail.propTypes = {
  currentGoal: React.PropTypes.object,
};

export default LineChartDetail;
