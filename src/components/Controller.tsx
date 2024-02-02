import React, { useState } from 'react'
import { useAppDispatch,useAppSelector } from '../hooks';
import { changeUserTemp, changeUserMode, postUserData, changeUserWindAngle, changeUserWindStrength } from '../redux/reducers/StatusReducer';
import '../styles/controller.scss'
import { addNewReserve } from '../redux/reducers/CalendarReducer';



export default function Controller(props: any) {
  const [showToast, setShowToast] = useState(false);
  const stat = useAppSelector(state => state.status.userData);
  const isControl = useAppSelector(state => state.page.value);
  const dispatch = useAppDispatch();

  const handleUserTemp = (e: any) => {
    const temp = parseInt(e.currentTarget.value);
    dispatch(changeUserTemp(temp));
  }

  const handleUserMode = (e:any) => {
    dispatch(changeUserMode(e.target.value));
  }

  const handleUserWindAngle = (e:any) => {
    dispatch(changeUserWindAngle(parseInt(e.currentTarget.value)));
  }

  const handleUserWindStrength = (e:any) => {
    dispatch(changeUserWindStrength(parseInt(e.currentTarget.value)));
  }
  const handleSave = () => {
    if(isControl===2){       // isControl === 2 : Controller
      dispatch(postUserData(stat));
      setShowToast(!showToast);
      setTimeout(()=>setShowToast(false), 3000);
    }
    else {    // isControl === 4 : Calendar Custom Settings
      dispatch(addNewReserve({month: props.month, day: props.day}));
      props.handleToggleModal(); //show off Modal from Calendar.tsx
      props.handleToggleToast(); //show Toast from Calendar.tsx
    }
  }
  
  return (
    <>
      <div className="Controller">
        {isControl===4 &&
          <div className="container control-container date mt-4 control-1">
            <span className='fs-6 fw-light'>Date</span>
            <p className='fs-2 fw-bold'>2024 / {props.month} / {props.day}</p>
          </div>
        }
      <div className='container d-flex'> 
        <div className="container control-container mt-4 mx-2 control-1">
          <span className='fs-6 fw-light'>Set Temperature</span>
          <p className='fs-2 fw-bolder'>{stat.userTemp}℃</p>
          <div className="container">
            <button className="btn btn-lg btn-control mx-1" type="button" value={-1} onClick={handleUserTemp}><i className="bi bi-control bi-caret-down-fill"></i></button>
            <button className="btn btn-lg btn-control mx-1" type="button" value={+1} onClick={handleUserTemp}><i className="bi bi-control bi-caret-up-fill"></i></button>
          </div>
        </div>
        <div className="container control-container mt-4 mx-2 control-1">
          <span className='fs-6 fw-light'>Mode</span>
          <p className='fs-2 fw-bolder'>{stat.userMode === 'heating'?'HEAT':'AC'}</p>
          <div className="container">
            <button className="btn btn-lg btn-control mx-1" type="button" value={'heating'} onClick={handleUserMode}>HEAT</button>
            <button className="btn btn-lg btn-control mx-1" type="button" value={'air-conditioning'} onClick={handleUserMode}>AC</button>
          </div>
        </div>
      </div>
        <div className='container d-flex'>
          <div className="container control-container mt-4 mx-2 control-2">
          <span className='fs-6 fw-light'>Wind Strength</span>
          <p className='fs-2 fw-bolder'>{stat.userWindStrength}</p>
            <div className="container">
              <button className="btn btn-lg btn-control mx-1" type="button" value={-1} onClick={handleUserWindStrength}><i className="bi bi-control bi-caret-down-fill"></i></button>
              <button className="btn btn-lg btn-control mx-1" type="button" value={+1} onClick={handleUserWindStrength}><i className="bi bi-control bi-caret-up-fill"></i></button>
            </div>
          </div>
          <div className="container control-container mt-4 mx-2 control-2">
            <span className='fs-6 fw-light'>Wind Angle</span>
            <p className='fs-2 fw-bolder'>{stat.userWindAngle}</p>
            <div className="container mb-2">
              <button className="btn btn-lg btn-control mx-1" type="button" value={-1} onClick={handleUserWindAngle}><i className="bi bi-control bi-caret-down-fill"></i></button>
              <button className="btn btn-lg btn-control mx-1" type="button" value={+1} onClick={handleUserWindAngle}><i className="bi bi-control bi-caret-up-fill"></i></button>
            </div>
              <button className="btn btn-lg btn-control mx-1" type="button" value={0} onClick={handleUserWindAngle}>AUTO</button>
          </div>
        </div>
      <div className='container mt-4 control-3'>
          <button className="btn btn-save" type="button" value={props.isControl} onClick={handleSave}>Save Settings</button>
      </div>
    </div>
      {showToast &&
        <div className="toast show align-items-center toast-save" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              Your AC settings are saved!
            </div>
            <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={()=>setShowToast(false)}></button>
          </div>
        </div>
      }
    </>
  )
}
