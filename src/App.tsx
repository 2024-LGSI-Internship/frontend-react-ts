/*eslint-disable*/
import './styles/App.scss';
import React from 'react';
import Dashboard from './components/Dashboard';
import Interface from './components/Interface';

function App() {

  return (
    <div className="App">
      <Interface/>
      <Dashboard/>
    </div>
  );
}
export default App;