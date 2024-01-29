import '../styles/dashboard.scss';
import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    // title: {
    //   display: true,
    //   text: 'Prediction Line Chart',
    // },
  },
};

let labels = ['1','2','3','4','5','6','7'];
let datas = [[19,20,18,18,18,22,23], [18,20,19,19,18,20,21], [25, 26, 27, 30, 29, 28, 28]];
const colors = {
  red: 'rgb(235, 134, 134)',
  red_bg: 'rgba(255, 99, 132, 0.5)',
  blue: 'rgb(68, 141, 219)',
  blue_bg: 'rgba(68, 141, 219, 0.5)',
  green: 'rgb(106, 224, 144)',
  green_bg: 'rgba(106, 224, 144, 0.5)',
}

export default function Dashboard() {
  const [render, setRender] = useState(0);
  
  const handleNewData = () => {
    for (let i = 0; i < 3; i++) {
      const rand = Math.floor(Math.random() * (30 - 18 + 1)) + 18;
      datas[i] = [...datas[i], rand];
    }
    labels = [...labels, 'new'];
    setRender(render+1);
  }
  console.log('rerender dashboard');

  const data = {
  labels,
  datasets: [
    {
      label: 'Actual User Set Temperature',
      data: datas[0],
      borderColor: colors.green,
      backgroundColor: colors.green_bg,
    },
    {
      label: 'Predicted User Set Temperature',
      data: datas[1],
      borderColor: colors.red,
      backgroundColor: colors.red_bg,
    },
    {
      label: 'Current Room Temperature',
      data: datas[2],
      borderColor: colors.blue,
      backgroundColor: colors.blue_bg,
    },
  ],
};

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h3 className='dashboard-header-title'>AI Prediction Dashboard</h3>
      </div>
      <div className="dashboard-chart">
        <Line options={options} data={data} />
      </div>
      <div className="dashboard-content">
        <div className="dashboard-container">
          <div className='mt-4 d-flex justify-content-center'>
            <div className="mark mark-1 mx-2"></div>
            <span className='fw-light'><span className='fw-bolder'>Actual</span> User Set Temperature</span>
          </div>
          <p className="temp">{datas[0].at(-1)}℃</p>
        </div>
        <div className="dashboard-container center">
          <div className='mt-4 d-flex justify-content-center'>
            <div className="mark mark-2 mx-2"></div>
            <span className='fw-light'><span className='fw-bolder'>Predicted</span> User Set Temperature</span>
          </div>
          <p className="temp">{datas[1].at(-1)}℃</p>
        </div>
        <div className="dashboard-container">
        <div className='mt-4 d-flex justify-content-center'>
          <div className="mark mark-3 mx-2"></div>
          <span className='fw-light'>Current Room Temperature</span>
        </div>
          <p className="temp">{datas[2].at(-1)}℃</p>
        </div>
      </div>
      <div className="container dashboard-footer">
        <button className="btn dashboard-footer-btn" type="button" onClick={handleNewData}>
          <i className="dashboard-footer-bi bi bi-caret-right-fill"></i>
          <span className='dashboard-footer-btn-text'>Predict</span>
        </button>
      </div>
    </div>
  )
}
