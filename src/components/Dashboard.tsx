import '../styles/dashboard.scss';
import React, { useState,useEffect, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { changeIsPredict, getPredArr, getPredData } from '../redux/reducers/DashboardReducer';
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
      display: true,
      position: 'top' as const,
    },
    // title: {
    //   display: true,
    //   text: 'Prediction Line Chart',
    // },
  },
  scales: {
    y: {
        max: 30,
        min: 18,
      },
    },
};

// const colors = {
//   red: 'rgb(235, 134, 134)',
//   red_bg: 'rgba(255, 99, 132, 0.5)',
//   blue: 'rgb(68, 141, 219)',
//   blue_bg: 'rgba(68, 141, 219, 0.5)',
//   green: 'rgb(106, 224, 144)',
//   green_bg: 'rgba(106, 224, 144, 0.5)',
// }

const colors = {
  darkTeal: '#1F484C',
  darkTeal_bg: '#1F484C66',
  teal: '#00CCC0',
  teal_bg: '#00CCC066',
  purple: '#7885FF',
  purple_bg: '#7885FF66',
}

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const isPredict = useAppSelector(state => { return state.dashboard.isPredict });
  const target:number[] = useAppSelector(state => { return state.dashboard.target });
  const pred:number[] = useAppSelector(state => { return state.dashboard.pred });
  const current:number[] = useAppSelector(state => { return state.dashboard.current });
  const [toggleLines, setToggleLines] = useState([true, true, true]);

  const temps = useMemo(() => {
    if (current === undefined)
      return { 'current': 0, 'pred': 0, 'target': 0 };
    if (Array.isArray(current) && current.length === 0) {
      return { current: 0, pred: 0, target: 0 };
    }
    return {'current': current[current.length-1], 'pred': pred[pred.length-1], 'target': target[target.length-1]}
  },[current, pred, target]);

  const diff = useMemo(() => {
    if (target === undefined)
      return 0;
    if (Array.isArray(target) && target.length === 0) {
      return 0;
    }
    return Math.abs(target[target.length-1]! - pred[pred.length-1]!).toFixed(1);
  }, [target, pred]);
  
  let labels = Array.from({ length: pred.length }, (v, i) => i + 1);

  const tempSets = useMemo(() => {
    return [
      {
        label: 'Actual User Set Temperature',
        data: target,
        borderColor: colors.darkTeal,
        backgroundColor: colors.darkTeal_bg,
        tension: 0.1,
      },
      {
        label: 'Predicted User Set Temperature',
        data: pred,
        borderColor: colors.teal,
        backgroundColor: colors.teal_bg,
        tension: 0.1,
      },
      {
        label: 'Current Room Temperature',
        data: current,
        borderColor: colors.purple,
        backgroundColor: colors.purple_bg,
        tension: 0.1,
      },
    ];
  }, [target, pred, current]);

  const tempData = {
    labels,
    datasets: tempSets.filter((tempSet, i) => {
      if (toggleLines[i] === true)
        return tempSet;
    })
  };
  
  useEffect(() => {
    console.log('dashboard mounted');
    dispatch(getPredArr());
  }, [dispatch])

  useEffect(() => {
    if (isPredict === true) {
      console.log('changeTempFromDashboard called');
      dispatch(changeTempFromDashboard(temps));
    }
  }, [isPredict, temps, dispatch]);
  
  const handleNewData = () => {
    const start = performance.now();
    dispatch(getPredData()); //get data from server
    const end = performance.now();
    const duration = end - start;
    console.log(`Rendering took ${duration} milliseconds`);

    //add new label
    const num: any = labels.at(-1);
    labels = [...labels, num + 1];
  }

  const handleToggleLines = (e: any) => {
    const val = parseInt(e.currentTarget.value);
    const temp = [...toggleLines];
    temp[val] = !temp[val];
    setToggleLines(temp);
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h3 className='dashboard-header-title'>AI Prediction Dashboard</h3>
      </div>
      <div className="dashboard-chart">
        <Line options={options} data={tempData} />
      </div>
      <div className="dashboard-content">
        <button className='dashboard-container diff disabled'>
          <div className='mt-3 d-flex justify-content-center'>
            <span className='fw-light temp-title'>Difference in Set Temp</span>
          </div>
          <p className="temp">{diff}℃</p>
        </button>
        <button className={`dashboard-container actual ${toggleLines[0]?'active':'deactivated'}`} value={0} onClick={handleToggleLines}>
          <div className='mt-3 d-flex justify-content-center'>
            <div className="mark mark-1 mx-2"></div>
            <span className='fw-light temp-title marked'><span className='fw-bolder'>Actual</span> User Set Temp</span>
          </div>
          <p className="temp">{temps.target}℃</p>
        </button>
        <button className={`dashboard-container predicted ${toggleLines[1]?'active':'deactivated'}`} value={1} onClick={handleToggleLines}>
          <div className='mt-3 d-flex justify-content-center'>
            <div className="mark mark-2 mx-2"></div>
            <span className='fw-light temp-title marked'><span className='fw-bolder'>Predicted</span> User Set Temp</span>
          </div>
          <p className="temp">{temps.pred}℃</p>
        </button>
        <button className={`dashboard-container current ${toggleLines[2]?'active':'deactivated'}`} value={2} onClick={handleToggleLines}>
          <div className='mt-3 d-flex justify-content-center'>
            <div className="mark mark-3 mx-2"></div>
            <span className='fw-light temp-title marked'>Current Room Temp</span>
          </div>
            <p className="temp">{temps.current}℃</p>
        </button>
      </div>
      <div className="container dashboard-footer">
        {isPredict ? 
          <>
          <button className="btn dashboard-footer-btn" type="button" onClick={()=>dispatch(changeIsPredict(0))}>
            <i className="dashboard-footer-bi bi bi-stop-fill"></i>
            <span className='dashboard-footer-btn-text'>Stop Prediction</span>
          </button>
          <button className="btn dashboard-footer-btn" type="button" onClick={handleNewData}>
            <i className="dashboard-footer-bi bi bi-caret-right-fill"></i>
            <span className='dashboard-footer-btn-text'>See Next Prediction</span>
          </button>
          </>
          :
          <button className="btn dashboard-footer-btn" type="button" onClick={()=>dispatch(changeIsPredict(1))}>
            <i className="dashboard-footer-bi bi bi-caret-right-fill"></i>
            <span className='dashboard-footer-btn-text'>Start Prediction</span>
          </button>
        }

      </div>
    </div>
  )
}
