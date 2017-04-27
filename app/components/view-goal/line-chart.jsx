import React from 'react';
import  { Line, } from 'react-chartjs-2';

import icons from './../../avatars.js';

const getRatingFromIndex = (index, ratings) => ratings[index - 1].id;

const getScaleLabelOptions = (label) => ({
  display: true,
  labelString: label,
  fontColor: 'white',
  fontSize: 16,
});

const getAxesOptions = (axis, isChartPreview) => {

  const gridLineColors = Array(2).fill('transparent')
    .concat(Array(10).fill('#fff'));

  const tickOptions = {
    beginAtZero: true,
    stepSize: 1,
    suggestedMin: -1,
    suggestedMax: 12,
    display: false,
  };

  const defaultOptions = {
    display: false,
    ticks: tickOptions,
    barThickness: 5,
  };

  return isChartPreview
    ? defaultOptions
    : axis === 'x'
        ? {
          ...defaultOptions,
          scaleLabel: getScaleLabelOptions('Time'),
          display: true,
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent',
          },
        }
        : {
          ...defaultOptions,
          scaleLabel: getScaleLabelOptions('Ratings'),
          display: true,
          gridLines: {
            color: gridLineColors,
            lineWidth: 0.5,
            zeroLineColor: '#fff',
            zeroLineWidth: 2,
          },
        };
};

const getOptions = (isChartPreview, fn) => {

  return {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    onClick: isChartPreview
      ? null
      : fn,
    scales: {
      yAxes: isChartPreview
        ? [ getAxesOptions('y', true), ]
        : [ getAxesOptions('y', false), ],
      xAxes: isChartPreview
        ? [ getAxesOptions('x', true), ]
        : [ getAxesOptions('x', false), ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  };
};

const chartHeight = 260;
const chartWidth = 1000;

const getScores = arr => arr.map(rating => rating.score);

const compileData = arr => arr.length
  ? [0,].concat(getScores(arr)).concat(arr[arr.length - 1].score)
  : [];

const getStyles = (arr, avatar, selectedIndex) =>
  Array(arr.length + 1).fill('circle')
    .map((point, index) => index === selectedIndex ? avatar : point);

const getLabels = arr => Array(arr.length + 2).fill('');

const getIconSrc = (icons, avatar) =>
  icons.find(icon => icon.avatar === avatar).image;

class LineChart extends React.Component {

  constructor(props) {
    super(props);
    this.changeRatings = this.changeRatings.bind(this);
    this.state = {
      ratingSelected: this.props.ratings.length,
    };
  }

  changeRatings(rating) {
    this.props.onSelectRating(rating);
  }

  componentDidMount() {
    this.setState({ ...this.state, });
  }

  render() {

    const avatar = this.props.avatar;
    const latestRatings = this.props.ratings;
    const icon = new Image ();
    icon.src = getIconSrc(icons, avatar);

    const clickFunction = (_, activePoints) => {
      const index = activePoints[0]._index;
      this.setState({...this.state, ratingSelected: index, });
      const rating = getRatingFromIndex(index, latestRatings);
      this.changeRatings(rating);
    };

    const chartOptions = getOptions(this.props.isChartPreview, clickFunction);

    const chartData = {
      labels: getLabels(latestRatings),
      datasets: [
        {
          data: compileData(latestRatings),
          label: 'Ratings',
          lineTension: 0.3,
          borderColor: '#fff',
          fill: false,
          pointBorderColor: 'transparent',
          radius: 10,
          backgroundColor: '#fff',
          pointStyle: getStyles(latestRatings, icon, this.state.ratingSelected),
          hitRadius: 25,
        },
      ],
    };

    return <Line
      data={ chartData }
      options={ chartOptions }
      width={ chartWidth }
      height={ chartHeight }
      redraw={ !this.props.isChartPreview }
    />;
  }
}

LineChart.propTypes = {
  ratings: React.PropTypes.array,
  avatar: React.PropTypes.string,
  isChartPreview: React.PropTypes.boolean,
  onSelectRating: React.PropTypes.func,
};

export default LineChart;
