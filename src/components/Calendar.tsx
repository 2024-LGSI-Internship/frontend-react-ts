import React, { useState } from 'react'
import '../styles/calendar.css'

  const monthName = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octboer', 'November', 'December']
  const month = [31, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const disabled_days = [0, 31, 28, 25, 31, 28, 26, 30, 28, 32, 29, 27, 31, 29];

  const ai_days = [23, 24, 25, 26]
  const ai_time = ['18:30-24:00', '24:00-04:00', '14:30-17:30', '17:30-19:30']

export default function Calendar() {
  const [curMonth, setCurMonth] = useState(1);
  const [modalDay, setModalDay] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const renderCalDays = (m:number) => {
    let arr = [];
    for (let i = disabled_days[m]; i <= month[m - 1]; i++){
      arr.push(
        <button className="btn cal-btn-disabled" type="button">{i}</button>
      );
    }

    for (let i = 1; i <= month[m]; i++){
      let calClass = (!ai_days.includes(i) ? 'btn cal-btn' : 'btn cal-btn-ai');
      arr.push(
        <button className={calClass} type="button" value={i} onClick={handleCustomSchedule}>{i}</button>
      );
    }
    return arr;
  }
  const renderAIrecomm = () => {
    let arr = [];
    for (let i = 0; i < 4;i++) {
      arr.push(
        <div className="d-flex">
          <div className='cal-ai-date'>
           {ai_days[i]}
          </div>
          <div className="cal-ai-content">
            <span className='fs-6 fw-light'>running time</span>
            <p className='fs-5 fw-bolder'>{ai_time[i]}</p>
          </div>
        </div>
      );
    }
    return arr;
  }

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };


  const handleCustomSchedule = (e:any) => {
    handleToggleModal();
    setModalDay(parseInt(e.target.value));
  }
  const changeMonth = (e:any) => {
    console.log(`changeMonth called, changed to month ${curMonth}`);
    const next = parseInt(e.currentTarget.value);
    if (next === 1) {
      if(curMonth !== 12)
        setCurMonth(curMonth + 1);
    } else {
      if (curMonth !== 1) 
        setCurMonth(curMonth - 1);
    }
  }

  return (
    <div className="Calendar">
      <div className="cal-main mt-4 mb-4">
        <div className="cal-month border-bottom">
          <button className="btn cal-btn" type="button" value={0} onClick={changeMonth}>
            <i className="bi bi-arrow-left-short"></i>
          </button>
          <strong className="cal-month-name">{monthName[curMonth]},&nbsp;&nbsp;2024</strong>
          <button className="btn cal-btn" type="button" value={1} onClick={changeMonth}>
            <i className="bi bi-arrow-right-short"></i>
          </button>
        </div>
        <div className="cal-weekdays text-body-secondary">
          <div className="cal-weekday">Sun</div>
          <div className="cal-weekday">Mon</div>
          <div className="cal-weekday">Tue</div>
          <div className="cal-weekday">Wed</div>
          <div className="cal-weekday">Thu</div>
          <div className="cal-weekday">Fri</div>
          <div className="cal-weekday">Sat</div>
        </div>
        <div className="cal-days">
          {renderCalDays(curMonth)}
        </div>
      </div>
      <div className="container cal-container">
        <p className="cal-ai-title border-bottom border-1 mb-3">Smart recommendation</p>
        {renderAIrecomm()}
      </div>
      {showModal && <Modal day={modalDay} toggle={handleToggleModal} />}
    </div>
  )
}

function Modal(props: any) {
  const [showToast, setShowToast] = useState(false);

  const handleSave = (e: any) => {
    setShowToast(true);
    setTimeout(props.toggle, 1000);
  }
  return (
    <>
    <div className="modal-backdrop opacity-25"></div>
    <div className="modal show" role="dialog">
      <div className="modal-dialog-center">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Set your Custom Schedule</h5>
            <button type="button" className="btn-close" onClick={props.toggle}></button>
          </div>
          <div className="modal-body">
              <p>Date: {props.day}</p>
              <p>Time: </p>
              <p>setTemp: </p>
              <p>Mode: </p>
              <p>WindStrength: </p>
              <p>WindAngle: </p>
          </div>
          <div className="modal-footer justify-content-center">
            <button type="button" className="btn cal-btn-ai" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
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
  );
}
