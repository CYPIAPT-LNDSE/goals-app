import React from 'react';
import  { Line, } from 'react-chartjs-2';
import icons from './../../avatars.js';

const getOptions = (isChartPreview) => {

  const gridLineColors = Array(2).fill('transparent')
    .concat(Array(10).fill('#fff'));

  const tickOptions = {
    beginAtZero: true,
    stepSize: 1,
    suggestedMin: -1,
    suggestedMax: 12,
    display: false,
  };

  const axesOptions = {
    display: false,
    ticks: tickOptions,
    barThickness: 5,
  };

  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: isChartPreview
        ? [ axesOptions, ]
        : [ {
          ...axesOptions,
          display: true,
          gridLines: {
            color: gridLineColors,
            lineWidth: 0.5,
            zeroLineColor: '#fff',
            zeroLineWidth: 2,
          },
        }, ],
      xAxes: [ axesOptions, ],
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

const getStyles = (arr, avatar) =>
  ['circle',].concat(Array(arr.length).fill(avatar));

const getLabels = arr => Array(arr.length + 2).fill('');
const getIconSrc = (icons, avatar) =>
  icons.find(icon => icon.avatar === avatar).image;

const LineChart = React.createClass({

  render() {
    const avatar = this.props.avatar;
    const latestRatings = this.props.ratings;
    const icon = new Image ();
    icon.src = getIconSrc(icons, avatar);

    const chartOptions = getOptions(this.props.isChartPreview);

    const chartData = {
      labels: getLabels(latestRatings),
      datasets: [
        {
          data: compileData(latestRatings),
          lineTension: 0.3,
          borderColor: '#fff',
          fill: false,
          pointBorderColor: 'transparent',
          pointStyle: getStyles(latestRatings, icon),
          radius: 0,
        },
      ],
    };

    return <Line
      data={ chartData }
      options={ chartOptions }
      width={ chartWidth }
      height={ chartHeight }
    />;
  },
});

LineChart.propTypes = {
  ratings: React.PropTypes.array,
  avatar: React.PropTypes.string,
  isChartPreview: React.PropTypes.boolean,
};

export default LineChart;
