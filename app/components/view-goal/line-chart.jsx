import React from 'react';
import  { Line, } from 'react-chartjs-2';
import { pepper, } from './icons.js';

const tickOptions = {
  beginAtZero: true,
  stepSize: 1,
  fontColor: '#fff',
  suggestedMin: -3,
  suggestedMax: 13,
};

const axesOptions = {
  display: false,
  ticks: tickOptions,
  gridLines: {
    color: '#fff',
    tickMarkLength: 1,
  },
  barThickness: 10,
};

const onClickNode = (e, a) => {
  if (a.length) {
    console.log('You clicked on node ' + a[0]._index);
  }
};

const getScores = arr => arr.map(rating => rating.score);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  onClick: onClickNode,
  scales: {
    yAxes: [ axesOptions, ],
    xAxes: [ axesOptions, ],
  },
  legend: {
    display: false,
  },
};

const chartHeight = 300;
const chartWidth = 1000;

const LineChart = React.createClass({

  render() {
    const latestRatings = this.props.ratings;
    const data = latestRatings.length
      ? [0,].concat(getScores(latestRatings).concat([6,]))
      : [];
    const icon = new Image ();
    icon.src = pepper;
    const pointStyle = ['circle',].concat(Array(latestRatings.length).fill(icon));


    const chartData = {
      labels: Array(latestRatings.length + 2).fill(''),
      datasets: [
        {
          data: data,
          lineTension: 0.3,
          borderColor: 'hotpink',
          fill: false,
          pointBorderColor: 'transparent',
          pointStyle: pointStyle,
          radius: 0,
        },
      ],
    };

    return <Line
      data={ chartData }
      options={ chartOptions }
      height={ chartHeight }
      width={ chartWidth }
    />;
  },
});

LineChart.propTypes = {
  ratings: React.PropTypes.array,
};

export default LineChart;
