import React from 'react'
import { useAppSelector,useAppDispatch } from '../hooks'
import { selectStatus, selectController, selectChat, selectCalendar } from '../redux/reducers/PageReducer'
import '../styles/footer.scss'

export default function Footer() {
  const footerIcons = ['bi-house-door-fill', 'bi-toggle-on', 'bi-chat-dots-fill', 'bi-calendar2-date-fill']
  const footerText = ['Status', 'Control', 'AI Q&A', 'Calendar'];
  const handlePage = [selectStatus(), selectController(), selectChat(), selectCalendar()];

  const showPages = useAppSelector(state=>state.page.value)
  const dispatch = useAppDispatch();

  const renderFooterList = () => {
    const arr = [];
    for (let i = 1; i <= 4; i++){
      arr.push(
        <div className="col">
          <button className={`btn ${showPages===i?'footer-btn-activated':'footer-btn'}`} value={i} onClick={() => dispatch(handlePage[i-1])}>
            <i className={`bi footer-bi ${footerIcons[i-1]}`}></i>
            <p className='footer-text'>{footerText[i-1]}</p>
          </button>
        </div>
      );
    }
    return arr;
  }

  return (
    <footer className="Footer">
      <div className="container text-center">
        <div className="row">
          {renderFooterList()}
        </div>
      </div>
    </footer>
  );
}