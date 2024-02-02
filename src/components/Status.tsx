import React, {useState} from 'react'
import { useAppDispatch,useAppSelector } from '../hooks';
import { applyAiTemp } from '../redux/reducers/StatusReducer';
import '../styles/status.scss'

export default function Status() {
  const isPredict = useAppSelector(state => { return state.dashboard.isPredict });
  let userStat = useAppSelector(state => { return state.status.userData });
  let aiTemp = useAppSelector(state => { return state.status.aiTemp });
  let curStat = useAppSelector(state => { return state.status.curData });
  const [showToast, setShowToast] = useState(false);
  const dispatch = useAppDispatch();

  const handleAiTemp = () => {
    dispatch(applyAiTemp());
    setShowToast(!showToast);
    setTimeout(()=>setShowToast(false), 3000);
  }

  return (
    <div className="status">
      <div className='container status-info ai mt-4 mb-4 status-1'>
        <div className="d-flex">
          <div className='info-icon ai'>
            <i className="bi bi-lightbulb"></i>
          </div>
          <div className="status-content">
            <span className='fs-6 fw-light'>Smart Recommendation</span>
            <p className='fs-3 fw-bolder'>{isPredict ? (aiTemp===undefined?'OFF':`${aiTemp}℃`):'OFF'}</p>
            <button className={`btn btn-apply ${isPredict?'':'disabled'}`} onClick={handleAiTemp}>Apply</button>
          </div>
        </div>
      </div>
      <div className='container status-info mt-4 mb-4 status-1'>
        <div className="d-flex">
          <div className='info-icon'>
           <i className="bi bi-thermometer-half"></i>
          </div>
          <div className="status-content">
            <span className='fs-6 fw-light'>Set Temperature</span>
            <p className='fs-5 fw-bolder'>{userStat.userTemp}℃</p>
          </div>
        </div>
        <div className="d-flex">
          <div className='info-icon'>
            <i className="bi bi-person-arms-up"></i>
          </div>
          <div className="status-content">
            <span className='fs-6 fw-light'>Set Mode type</span>
            <p className='fs-5 fw-bolder'>{userStat.userMode==='heating'?'HEAT':'AC'}</p>
          </div>
        </div>
      </div>
      <div className='container status-info mb-4 status-2'>
        <div className="d-flex">
          <div className='info-icon'>
            <i className="bi bi-thermometer"></i>
          </div>
          <div className="status-content">
            <span className='fs-6 fw-light'>Current Temperature</span>
            <p className='fs-5 fw-bolder'>{curStat.curTemp}℃</p>
          </div>
        </div>
        <div className="d-flex">
          <div className='info-icon'>
            <i className="bi bi-droplet-fill"></i>
          </div>
          <div className="status-content">
            <span className='fs-6 fw-light'>Current Humidty</span>
            <p className='fs-5 fw-bolder'>{curStat.curHumid}%</p>
          </div>
        </div>
      </div>
      <div className='container status-info mb-5 status-3'>
        <div className="d-flex">
          <div className='info-icon'>
            <i className="bi bi-arrows-move"></i>
          </div>
          <div className="status-content">
            <span className='fs-6 fw-light'>Wind-angle</span>
            <p className='fs-5 fw-bolder'>{userStat.userWindAngle}</p>
          </div>
        </div>
        <div className="d-flex">
          <div className='info-icon'>
            <i className="bi bi-wind"></i>
          </div>
          <div className="status-content">
            <span className='fs-6 fw-light'>Wind-strength</span>
            <p className='fs-5 fw-bolder'>{userStat.userWindStrength}</p>
          </div>
        </div>
      </div>
      {showToast &&
        <div className="toast show align-items-center toast-save" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              Smart Recommendation applied!
            </div>
            <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={()=>setShowToast(false)}></button>
          </div>
        </div>
      }
    </div>
  );
}
