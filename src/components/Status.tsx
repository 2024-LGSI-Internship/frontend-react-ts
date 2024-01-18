import React from 'react'
import { useAppDispatch,useAppSelector } from '../hooks';
import { useEffect } from 'react';
import { getCurData, getUserData } from '../redux/reducers/StatusReducer';
import '../styles/status.css'

export default function Status() {
  let userStat = useAppSelector(state => { return state.status.userData });
  let curStat = useAppSelector(state => { return state.status.curData });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserData());
    dispatch(getCurData());
  })
  return (
    <div>
      <div className='container status-info mt-4 mb-4 info-1'>
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
            <span className='fs-6 fw-light'>set Motion type</span>
            <p className='fs-5 fw-bolder'>{userStat.userMode}</p>
          </div>
        </div>
      </div>
      <div className='container status-info mb-4 info-2'>
        <div className="d-flex">
          <div className='info-icon'>
            <i className="bi bi-thermometer"></i>
          </div>
          <div className="status-content">
            <span className='fs-6 fw-light'>current Temperature</span>
            <p className='fs-5 fw-bolder'>{curStat.curTemp}℃</p>
          </div>
        </div>
        <div className="d-flex">
          <div className='info-icon'>
            <i className="bi bi-droplet-fill"></i>
          </div>
          <div className="status-content">
            <span className='fs-6 fw-light'>current Humidty</span>
            <p className='fs-5 fw-bolder'>{curStat.curHumid}%</p>
          </div>
        </div>
      </div>
      <div className='container status-info info-3'>
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
    </div>
  );
}
