import React from 'react';
import  { Line, } from 'react-chartjs-2';
import { pepper, } from './icons.js';

const tickOptions = {
  beginAtZero: true,
  stepSize: 1,
  fontColor: '#fff',
  suggestedMin: 0,
  suggestedMax: 10,
};

const axesOptions = {
  display: false,
  ticks: tickOptions,
  gridLines: {
    color: '#fff',
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

    const icon = new Image ();
    icon.src = pepper;

    const latestRatings = this.props.ratings.slice(0, 3).reverse();
    const chartData = {
      labels: Array(latestRatings.length).fill(''),
      datasets: [
        {
          data: getScores(latestRatings),
          lineTension: 0.3,
          borderColor: 'hotpink',
          fill: false,
          pointStyle: icon,
          radius: 20,
        },
      ],
      backgroundColor: 'blue',
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
