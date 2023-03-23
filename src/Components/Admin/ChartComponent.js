import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import axios from "axios";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const ChartComponent = () => {
 


  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Submission',
        data: [30, 19, 13, 25, 18, 13, 24],
        borderColor: 'rgb(0,0,255)',
        borderWidth: 2,
      },
    ],
  };



  const options = {
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
    <h3 className="text-primary">Total Submission of Last Six Months</h3>
    



    <div className="w-75">
      <Bar data={data} options={options} />
    </div>
  

    </div>
  );
};
            export default ChartComponent;