import React, { useState } from 'react'
import { useAppDispatch,useAppSelector } from '../hooks';
import { changeUserTemp, changeUserMode, postUserData, changeUserWindAngle, changeUserWindStrength } from '../redux/reducers/StatusReducer';
import '../styles/controller.css'



export default function Controller() {
  const [showToast, setShowToast] = useState(false);
  const stat = useAppSelector(state => state.status.userData);
  const dispatch = useAppDispatch();

  const handleUserTemp = (e:any) => {
    dispatch(changeUserTemp(parseInt(e.target.value)));
  }

  const handleUserMode = (e:any) => {
    dispatch(changeUserMode(e.target.value));
  }

  const handleUserWindAngle = (e:any) => {
    dispatch(changeUserWindAngle(e.target.value));
  }

  const handleUserWindStrength = (e:any) => {
    dispatch(changeUserWindStrength(e.target.value));
  }
  const handleSave = () => {
    dispatch(postUserData(stat));
    setShowToast(true);
  }
  
  return (
    <>
    <div className="Controller">
      <div className="container control-container mt-4 control-1">
        <p>AC Temperature: {stat.userTemp}</p>
        <div className="btn-group">
          <button className="btn btn-control" type="button" value={1} onClick={handleUserTemp}>up</button>
          <button className="btn btn-control" type="button" value={-1} onClick={handleUserTemp}>down</button>
        </div>
        </div>
      <div className="container control-container mt-4 control-2">
        <p>AC Mode: {stat.userMode}</p>
        <div className="btn-group">
          <button className="btn btn-control" type="button" value={'heating'} onClick={handleUserMode}>heating</button>
          <button className="btn btn-control" type="button" value={'air-conditioning'} onClick={handleUserMode}>air-conditioning</button>
        </div>
      </div>
      <div className="container control-container mt-4 control-3">
        <p>AC Wind Angle: {stat.userWindAngle}</p>
        <div className='btn-group'> 
          <button className="btn btn-control" type="button" value={'strong'} onClick={handleUserWindAngle}>Strong</button>
          <button className="btn btn-control" type="button" value={'normal'} onClick={handleUserWindAngle}>Normal</button>
          <button className="btn btn-control" type="button" value={'weak'} onClick={handleUserWindAngle}>Weak</button>
        </div>
      </div>
      <div className="container control-container mt-4 control-4">
        <p>AC Wind Strength: {stat.userWindStrength}</p>
        <div className='btn-group'>
          <button className="btn btn-control" type="button" value={'horizontal'} onClick={handleUserWindStrength}>Horizontal</button>
          <button className="btn btn-control" type="button" value={'normal'} onClick={handleUserWindStrength}>Normal</button>
          <button className="btn btn-control" type="button" value={'vertical'} onClick={handleUserWindStrength}>Vertical</button>
          <button className="btn btn-control" type="button" value={'auto'} onClick={handleUserWindStrength}>AUTO</button>
        </div>
        </div>
      <div className='container mt-4 control-5'>
        <button className="btn btn-save" type="button" onClick={handleSave}>Save Settings</button>
      </div>
    </div>
      {showToast &&
        <div className="toast show align-items-center toast-save" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              Your AC settings are saved!
            </div>
            <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      }
    </>
  )
}
