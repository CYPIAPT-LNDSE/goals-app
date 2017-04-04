import React from 'react';
import  { Line, } from 'react-chartjs-2';

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  onClick: function(e, a) {
    if (a.length) {
      document.getElementById('show-message').innerHTML = 'You clicked on node ' + a[0]._index;
    }
  },
  scales: {
    yAxes: [{
      display: true,
      ticks: {
        beginAtZero: true,   // minimum value will be 0.
        stepSize: 1,
        fontColor: '#fff',

      },
      gridLines: {
        color: '#fff',
      },
    },],
    xAxes: [{
      display: false,
      ticks: {
        beginAtZero: true,   // minimum value will be 0.
        stepSize: 1,
      },
      gridLines: {
        color: '#fff',
      },
    },],

  },
  legend: {
    display: false,
  },


};


const getScores = arr => arr.map(rating => rating.score);

const LineChart = React.createClass({
  render() {
    const ratings = this.props.ratings.reverse();

    const chartData = {
      labels: Array(ratings.length).fill(''),
      datasets: [
        {
          data: getScores(ratings),
          pointStyle: 'circle',
          lineTension: 0.3,
          borderColor: 'hotpink',
          fill: false,
          radius: 20,
        },
      ],
      backgroundColor: 'blue',
    };

    return <Line data={ chartData } options={ chartOptions }/>;
  },
});

LineChart.propTypes = {
  ratings: React.PropTypes.array,
};

export default LineChart;
