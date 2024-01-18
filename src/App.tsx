/*eslint-disable*/
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Status from './components/Status';
import Controller from './components/Controller';
import Chat from './components/Chat';
import Calendar from './components/Calendar';
import Footer from './components/Footer';
import Header from './components/Header';
import { useAppSelector,useAppDispatch } from './hooks';

function App() {
  const dispatch = useAppDispatch();
  const showPages = useAppSelector((state) => state.page.value)
  console.log(`reducer: page ${showPages} rendered`)

  const choosePages = () => {
    switch (showPages) {
      case (1):
        return <Status />
      case (2):
        return <Controller />
      case (3):
        return <Chat />
      case (4):
        return <Calendar/>
    }
  }

  return (
    <div className="App">
      <Header/>
      {choosePages()}
      <Footer/>
    </div>
  );
}
export default App;