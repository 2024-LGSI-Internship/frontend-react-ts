/*eslint-disable*/
import './styles/App.scss';
import React, { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Interface from './components/Interface';
import { useAppSelector, useAppDispatch } from './hooks';
import { getUserData,getCurData } from './redux/reducers/StatusReducer';

function App() {
  const isPredict = useAppSelector(state => { return state.dashboard.isPredict });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isPredict === false) {
      console.log('App.tsx: Get User, Cur data from Server');
      dispatch(getUserData());
      dispatch(getCurData());
    }
  }, [dispatch, isPredict]);

  return (
    <div className="App">
      <Interface/>
      <Dashboard/>
    </div>
  );
}
export default App;