import React from 'react';
import GoalTileComponent from '../goal-tile.jsx';

const LineChartDetail = ({ currentGoal, }) => {

  return (
   <div className="line-chart-detail goal-detail-page">
     <div className="goal-detail-goal-tile-container">
       <GoalTileComponent goal={ currentGoal } />
     </div>
     Hello
   </div>
  );
};

LineChartDetail.propTypes = {
  currentGoal: React.PropTypes.object,
};

export default LineChartDetail;
