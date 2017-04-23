import React from 'react';
import GoalTileComponent from '../goal-tile.jsx';
import LineChart from './line-chart.jsx';

const LineChartDetail = ({ currentGoal, }) => {

  const allRatings = currentGoal.ratings.slice(0).reverse();

  const style = {
    width: allRatings.length < 6
      ? '100%'
      : 400 + (allRatings.length - 3) * 10,
  };

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
       <div className="detail-chart-container">
         <div className="detail-chart-container-inner" style={ style }>
           <LineChart
             avatar={ currentGoal.avatar }
             ratings={ allRatings }
             isChartPreview={ false }
           />
         </div>
       </div>
     </div>
   </div>
  );
};

LineChartDetail.propTypes = {
  currentGoal: React.PropTypes.object,
};

export default LineChartDetail;
