import React from 'react';
import moment from 'moment';

import GoalTileComponent from '../goal-tile.jsx';
import LineChart from './line-chart.jsx';

const defaultWidth = 400;
const animationName = 'scroll';

const customWidth = (defaultWidth, ratings) =>
  ratings.length < 6
    ? 0
    : defaultWidth + (ratings.length - 3) * 10;

class LineChartDetail extends React.Component {

  componentDidMount() {
    const currentGoal = this.props.currentGoal;
    const latestRating = currentGoal.ratings[0];
    window.setTimeout(() => {
      if (latestRating) {
        this.props.onSelectRating(latestRating.id);
        document.querySelector('.detail-chart-container')
          .scrollLeft += defaultWidth + customWidth(defaultWidth, currentGoal.ratings);
      }
    }, 2000);
  }

  render() {

    const currentGoal = this.props.currentGoal;
    const allRatings = currentGoal.ratings.slice(0).reverse();
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

    const animation = `
          @keyframes ${animationName} {
            from {
              margin-left: 0;
            }
            to {
              margin-left: ${0 - customWidth(defaultWidth, currentGoal.ratings) + defaultWidth}px;
            }
          }
      `;

    const stylesheet = document.styleSheets[0];
    stylesheet.insertRule(animation, stylesheet.cssRules.length);

    const containerStyle = (!customWidth(defaultWidth, currentGoal.ratings))
      ? { width: '100%', }
      : {
        width: customWidth(defaultWidth, currentGoal.ratings),
        animationName: animationName,
        animationTimingFunction: 'ease-in-out',
        animationDuration: '2s',
      };

    return (
      <div className="line-chart-detail goal-detail-page" style={ this.props.dynamicStyle }>
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
             onSelectRating={ this.props.onSelectRating }
           />
          </div>
        </div>
      </div>
    </div>
    );
  }
}

LineChartDetail.propTypes = {
  currentGoal: React.PropTypes.object,
  onSelectRating: React.PropTypes.func,
  dynamicStyle: React.PropTypes.object,
};

export default LineChartDetail;
