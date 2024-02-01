import React from 'react'
import { useState, useEffect, useRef } from 'react';
import '../styles/chat.scss'
import { useAppSelector, useAppDispatch } from '../hooks'
import { postChatData, postImageData, saveUserInput } from '../redux/reducers/ChatReducer';

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
  const userInputs = useAppSelector(state => { return state.chat.userInputs });
  const isImageInputs = useAppSelector(state => { return state.chat.isImageInputs });
  const aiAnswers = useAppSelector(state => { return state.chat.aiAnswers });
  const chatResponse = useAppSelector(state => { return state.chat.getChatResponse });
  const dispatch = useAppDispatch();


  //focus on file input conainer even display is none
  const fileInputRef = useRef<HTMLInputElement>(null);

  //focus on input container when rendered
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current !== null) {
      if (chatResponse === 'loading')
        inputRef.current.disabled = true; //input 비활성화 해제
      else if (chatResponse === 'complete') {
        inputRef.current.disabled = false;
        setUserInput('');
      }
      inputRef.current.focus(); //input에 focus
    }
  }, [chatResponse]);

  //auto scroll on new message
  const messageEndRef = useRef<HTMLDivElement|null>(null);
  useEffect(() => {
    if (messageEndRef.current !== null) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [userInputs, aiAnswers]);
  
  //handle user text input
  const handleInputChange = (e:any) => {
    setUserInput(e.target.value);
  }

  //post text data to AI server
  const handleOnKeyPress = (e:any) => {
    if (e.key === 'Enter')
      handleInputSubmit(e);
  }
  const handleInputSubmit = (e: any) => {
    if (userInput !== '') {
      dispatch(saveUserInput({ input: userInput, isImage: false }));
      dispatch(postChatData(userInput));
      // dispatch(getChatData());
    }
  }

  //handle image data
  const handleImageChange = (e:any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        let image: any = reader.result;
        if (image !== null) {
          image = image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
        }
        dispatch(saveUserInput({ input: image, isImage: true }));
        dispatch(postImageData(image));
      };

      reader.readAsDataURL(file);
    }
  }

  //post image data to AI server
  const handleImageSubmit = () => {
    if (fileInputRef.current !== null) {
      fileInputRef.current.click();
    }
  }

  const renderChat = () => {
    let arr = [];
    for (let i = 0; i < inputCount; i++) {
      arr.push(
        <>
          <div className="chat question recent">
            <span className='chat question name'>You</span>
            <div className="chat question content">
              {isImageInputs[i] ?
                <img src={`data:image/jpg;base64,${userInputs[i]}`} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                :
                <span className='chat-text'>{userInputs[i]}</span>
              }
            </div>
          </div>
          {i === (inputCount - 1) ?
            (<div className="chat answer recent">
              <span className='chat answer name'>AI</span>
              {chatResponse === 'loading' && //loading then show spinner
              <div className='chat answer loading'>
                <div className="spinner-grow" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              }
              {chatResponse === 'complete' && //complete then show answer
                <div className="chat answer content">
                    <span className='chat-text'>{aiAnswers[i]}</span>
              </div>
              }
            </div>) : //if it is not the last answer then just render
            (<div className="chat answer">
              <span className='chat answer name'>AI</span>
                <div className="chat answer content">
                    <span className='chat-text'>{aiAnswers[i]}</span>
                </div>
              </div>
            )
        }
    </>
      )
    }
    return arr;
  }

  return (
    <div className="chat">
      <div className="chat-container">
        <div className="chat answer recent">
          <span className='chat answer name'>AI</span>
          <div className="chat answer content">
            <span className='chat-text'>Ask anything about AC! 🤖</span>
          </div>
        </div>
        {renderChat()}
        <div ref={messageEndRef}></div>
      </div>
      <div className="d-flex chat-input">
        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange}/>
        <button className="btn btn-input" onClick={handleImageSubmit}><i className="chat-bi bi bi-images"></i></button>
        <input className="form-control" ref={inputRef} type="text" value={userInput} onChange={handleInputChange} onKeyPress={handleOnKeyPress} placeholder="Ask anything to AI"></input>
        <button className="btn btn-input" onClick={handleInputSubmit}><i className="chat-bi bi bi-arrow-up-circle-fill"></i></button>
      </div>
    </div>
  )
}
