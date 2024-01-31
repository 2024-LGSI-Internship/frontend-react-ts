import React, { useState,useCallback } from 'react'
import '../styles/calendar.scss'
import Controller from './Controller';
import { useAppSelector } from '../hooks';

const monthName = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octboer', 'November', 'December']
const month = [31, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const disabledDays = [0, 31, 28, 25, 31, 28, 26, 30, 28, 32, 29, 27, 31, 29];

export default function Calendar() {
  const [curMonth, setCurMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const schedule = useAppSelector(state => state.calendar.schedule);

  const getDayReserves = useCallback((m: number) => {
    const monthReserves = schedule.findIndex(obj => obj.month === m)
    let dayReserves: any[];
    if (monthReserves !== -1)
      dayReserves = schedule[monthReserves].days;
    else
      dayReserves = [];
    return dayReserves;
  }, [schedule]);

  const renderCalDays = (m:number) => {
    let arr = [];
    for (let i = disabledDays[m]; i <= month[m - 1]; i++){
      arr.push(
        <button className="btn cal-btn-disabled" type="button">{i}</button>
      );
    }
    const dayReserves = getDayReserves(m);

    for (let i = 1; i <= month[m]; i++){
      const calClass = (dayReserves.some((obj) => { return obj.day === i }) ? 'btn cal-btn-custom' : 'btn cal-btn');
      arr.push(
        <button className={calClass} type="button" value={i} onClick={handleCustomSchedule}>{i}</button>
        );
      }
    return arr;
  }

  const renderReserve = (m: number) => {
    let arr = [];
    const dayReserves = getDayReserves(m);
    for (let i = 0; i < dayReserves.length; i++) {
      for (let j = 0; j < dayReserves[i].time.length;j++)
      arr.push(
        <div className="d-flex">
          <div className='cal-custom-date'>
            {dayReserves[i].day}
          </div>
          <div className="cal-custom-content">
            <span className='fs-6 fw-light'>running time</span>
            <p className='fs-5 fw-bolder'>{dayReserves[i].time[j]}</p>
          </div>
        </div>
      );
    }
    return arr;
  }

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleToggleToast = () => {
    setShowToast(!showToast);
  }

  const handleCustomSchedule = (e:any) => {
    handleToggleModal();
    setSelectedDay(parseInt(e.target.value));
  }

  const handleChangeMonth = (e:any) => {
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
    <div className="cal">
      <div className="cal-main mt-4 mb-4">
        <div className="cal-month border-bottom">
          <button className="btn cal-btn" type="button" value={0} onClick={handleChangeMonth}>
            <i className="bi bi-arrow-left-short"></i>
          </button>
          <strong className="cal-month-name">{monthName[curMonth]},&nbsp;&nbsp;2024</strong>
          <button className="btn cal-btn" type="button" value={1} onClick={handleChangeMonth}>
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
      <div className="container cal-custom">
        <p className="cal-custom-title border-bottom border-1 mb-3">your Reservations</p>
        {renderReserve(curMonth)}
      </div>
      {showModal && <Modal month={curMonth} day={selectedDay} handleToggleModal={handleToggleModal} handleToggleToast={handleToggleToast} />}
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
    </div>
  )
}

function Modal(props: any) {
  return (
    <>
    <div className="modal-backdrop opacity-25"></div>
    <div className="modal show" role="dialog">
      <div className="modal-dialog-center">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Set your Custom Schedule</h5>
            <button type="button" className="btn-close" onClick={props.handleToggleModal}></button>
          </div>
            <div className="modal-body">
              <Controller month={props.month} day={props.day} handleToggleModal={props.handleToggleModal} handleToggleToast={props.handleToggleToast} />
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
