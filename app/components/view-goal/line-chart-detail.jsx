import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

/* components */
import GoalTileComponent from '../goal-tile.jsx';
import LineChart from './line-chart.jsx';

const LineChartDetail = ({ currentGoal, onSelectRating, dynamicStyle, }) => {

  const allRatings = currentGoal.ratings.slice(0).reverse();

  const containerStyle = {
    width: allRatings.length < 6
      ? '100%'
      : 400 + (allRatings.length - 3) * 10,
  };

  const feedbackStyle = {
    opacity: currentGoal.ratingSelected
      ? 1
      : 0,
  };

  const time = currentGoal.ratingSelected
    ? currentGoal.ratingSelected.time
    : {};

  const score = currentGoal.ratingSelected
    ? currentGoal.ratingSelected.score
    : null;

  const comment = currentGoal.ratingSelected
    ? currentGoal.ratingSelected.comment
    : '';

  return (
   <div className="line-chart-detail goal-detail-page" style={ dynamicStyle }>
     <div className="goal-detail-goal-tile-container">
       <GoalTileComponent goal={ currentGoal } />
     </div>
     <div className="line-chart-container-detail">
       <div className="line-chart-detail-feedback-container" style={ feedbackStyle }>
         <p className="detail-feedback-time">
           { moment(time).format('LLLL') }
         </p>
         <p className="detail-feedback-score">
           You rated your progress { score }/10
         </p>
         <p className="detail-feedback-comment">
           { comment }
         </p>
       </div>
       <div className="detail-chart-container">
         <div className="detail-chart-container-inner" style={ containerStyle }>
           <LineChart
             avatar={ currentGoal.avatar }
             ratings={ allRatings }
             isChartPreview={ false }
             onSelectRating={ onSelectRating }
           />
         </div>
       </div>
     </div>
   </div>
  );
};

LineChartDetail.propTypes = {
  currentGoal: PropTypes.object,
  onSelectRating: PropTypes.func,
  dynamicStyle: PropTypes.object,
};

export default LineChartDetail;
