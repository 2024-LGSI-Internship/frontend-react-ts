import '../styles/dashboard.scss';
import React, { useState,useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getPredArr, getPredData } from '../redux/reducers/DashboardReducer';
import { useAppDispatch, useAppSelector } from '../hooks';
import { changeTempFromDashboard } from '../redux/reducers/StatusReducer';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
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

const colors = {
  red: 'rgb(235, 134, 134)',
  red_bg: 'rgba(255, 99, 132, 0.5)',
  blue: 'rgb(68, 141, 219)',
  blue_bg: 'rgba(68, 141, 219, 0.5)',
  green: 'rgb(106, 224, 144)',
  green_bg: 'rgba(106, 224, 144, 0.5)',
}

export default function Dashboard() {

  const dispatch = useAppDispatch();
  const target = useAppSelector(state => { return state.dashboard.target });
  const pred = useAppSelector(state => { return state.dashboard.pred });
  const current = useAppSelector(state => { return state.dashboard.current });
  const [toggleLines, setToggleLines] = useState([true, true, true]);

  let labels = Array.from({ length: pred.length }, (v, i) => i + 1);
  const tempSets = [
    {
      label: 'Actual User Set Temperature',
      data: target,
      borderColor: colors.green,
      backgroundColor: colors.green_bg,
    },
    {
      label: 'Predicted User Set Temperature',
      data: pred,
      borderColor: colors.red,
      backgroundColor: colors.red_bg,
    },
    {
      label: 'Current Room Temperature',
      data: current,
      borderColor: colors.blue,
      backgroundColor: colors.blue_bg,
    },
  ];

  const [render, setRender] = useState(0);

  useEffect(() => {
    console.log('dashboard mounted');
    dispatch(getPredArr());
  }, [])

  useEffect(() => {
    const temps = { current: current.at(-1), pred: pred.at(-1), target: target.at(-1) };
    console.log(`changeTempFromDashboard ${temps}`);
    dispatch(changeTempFromDashboard(temps));
  }, [current, pred, target, dispatch]);
  
  const handleNewData = () => {
    dispatch(getPredData());
   
    const num:any = labels.at(-1);
    labels = [...labels, num + 1];
    setRender(render + 1);
  }

  const data = {
    labels,
    datasets: tempSets.filter((tempSet, i) => {
      if (toggleLines[i] === true)
        return tempSet;
    })
  };

  const toggleTarget = () => {
    const temp = [...toggleLines];
    temp[0] = !temp[0]
    setToggleLines(temp)
  }
  const togglePred = () => {
    const temp = [...toggleLines];
    temp[1] = !temp[1]
    setToggleLines(temp)
  }
  const toggleCurrent = () => {
    const temp = [...toggleLines];
    temp[2] = !temp[2]
    setToggleLines(temp)
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h3 className='dashboard-header-title'>AI Prediction Dashboard</h3>
      </div>
      <div className="dashboard-chart">
        <Line options={options} data={data} />
      </div>
      <div className="dashboard-content">
        <div className="dashboard-container" onClick={toggleTarget}>
          <div className='mt-4 d-flex justify-content-center'>
            <div className="mark mark-1 mx-2"></div>
            <span className='fw-light'><span className='fw-bolder'>Actual</span> User Set Temperature</span>
          </div>
          <p className="temp">{target.at(-1)}℃</p>
        </div>
        <div className="dashboard-container center" onClick={togglePred}>
          <div className='mt-4 d-flex justify-content-center'>
            <div className="mark mark-2 mx-2"></div>
            <span className='fw-light'><span className='fw-bolder'>Predicted</span> User Set Temperature</span>
          </div>
          <p className="temp">{pred.at(-1)}℃</p>
        </div>
        <div className="dashboard-container" onClick={toggleCurrent}>
        <div className='mt-4 d-flex justify-content-center'>
          <div className="mark mark-3 mx-2"></div>
          <span className='fw-light'>Current Room Temperature</span>
        </div>
          <p className="temp">{current.at(-1)}℃</p>
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
