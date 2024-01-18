import React from 'react'
import { useState, useEffect, useRef } from 'react';
import '../styles/chat.css'
import { useAppSelector, useAppDispatch } from '../hooks'
import { getChatData, postChatData, saveUserInput } from '../redux/reducers/ChatReducer';

export default function Chat() {
  //for debugging
  let renderCount = useRef(1);
  useEffect(() => {
    renderCount.current += 1;
    console.log(`user input: ${userInput}`);
    console.log(`render count: ${renderCount.current}`)
  })
  const [userInput, setUserInput] = useState('');
  const inputCount = useAppSelector(state => { return state.chat.inputCount });
  const answerCount = useAppSelector(state => { return state.chat.answerCount });
  const userInputs = useAppSelector(state => { return state.chat.userInputs });
  const aiAnswers = useAppSelector(state => { return state.chat.aiAnswers });
  const dispatch = useAppDispatch();


  //focus on input container when rendered
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.disabled = false; //input 비활성화 해제
      inputRef.current.focus(); //input에 focus
    }
  }, []);
  
  const handleInputChange = (e:any) => {
    setUserInput(e.target.value);
  }
  const handleOnKeyPress = (e:any) => {
    if (e.key === 'Enter')
      handleInputSubmit(e);
  }

  const handleInputSubmit = (e:any) => {
    dispatch(saveUserInput(userInput));
    dispatch(postChatData(userInput));
    dispatch(getChatData());
  }
  const renderChatQuestion = () => {
    let arr = []
    for (let i = 0; i < inputCount; i++){
      arr.push(
      <>
        <div className="chatQuestion">
          <div className='chatYou'>You</div>
          <div className="chatQuestionContent">
            {userInputs[i]}
          </div>
        </div>
      <div className="chatAnswer">
        <div className='chatAI'>AI</div>
        <div className="chatAnswerContent">
          {aiAnswers[i]}
        </div>
      </div>
    </>
      )
    }
    return arr;
  }

  // const renderChatAnswer = () => {
  //   let arr = [];
  //   for (let i = 0; i < answerCount; i++) {
  //     arr.push(
  //       );
  //   }
  //   return arr;
  // }

  return (
    <div className="Chat">Chat
      <div className="chatContent">
        <div className="chatAnswer">
          <div className='chatAI'>AI</div>
          <div className="chatAnswerContent">
            <span>Ask about your AC to your friendly AI! 🤖</span>
          </div>
        </div>
        {renderChatQuestion()}
        {/* {renderChatAnswer()} */}
      </div>
      <div className="d-flex chatInputContainer">
        <button className="btn btn-input"><i className="chat-bi bi bi-list"></i></button>
        <input className="form-control" ref={inputRef} type="text" value={userInput} onChange={handleInputChange} onKeyPress={handleOnKeyPress} placeholder="Ask anything to AI :)"></input>
        <button className="btn btn-input" onClick={handleInputSubmit}><i className="chat-bi bi bi-arrow-up-circle-fill"></i></button>
      </div>
    </div>
  )
}
