import React from 'react';
import  { Line, } from 'react-chartjs-2';

const tickOptions = {
  beginAtZero: true,
  stepSize: 1,
  fontColor: '#fff',
};

const gridLinesOptions = {
  color: '#fff',
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  onClick: function(e, a) {
    if (a.length) {
      // replace with function for displaying actual details
      document.getElementById('show-message').innerHTML = 'You clicked on node ' + a[0]._index;
    }
  },
  scales: {
    yAxes: [
      {
        display: true,
        ticks: tickOptions,
        gridLines: gridLinesOptions,
      },
    ],
    xAxes: [
      {
        display: false,
        ticks: tickOptions,
        gridLines: gridLinesOptions,
      },
    ],
  },
  legend: {
    display: false,
  },
};


const getScores = arr => arr.map(rating => rating.score);

const LineChart = React.createClass({

  render() {

    const ratings = this.props.ratings.slice(0).reverse();

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
