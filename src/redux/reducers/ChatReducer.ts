import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

interface postState{
  userInput:string
}

interface imageState{
  image: string
}

const headers = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true',
  "Access-Control-Allow-Origin": "*",
  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  Accept: 'application/json',
  withCredentials: true // 쿠키 cors 통신 설정,
}

export const postChatData = createAsyncThunk<postState,string>('POST_CHATDATA',
  async (userInput) => {
    const response = await axios.post('/chat', { 'input': userInput }, headers)
    return response.data;
  }
)

export const postImageData = createAsyncThunk<imageState, string>('POST_IMAGEDATA',
  async (userImage) => {
    const response = await axios.post('/img', { 'img': userImage }, headers)
    return response.data;
  }
)

interface chatState {
  inputCount: number,
  userInputs: string[],
  answerCount: number,
  aiAnswers: string[],
  isImageInputs: boolean[],
  getChatResponse: string,
}

const initialState: chatState = {
  inputCount: 0,
  userInputs: [],
  answerCount:0,
  aiAnswers: [],
  isImageInputs: [],
  getChatResponse: 'None',
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    saveUserInput: (state, action: PayloadAction<{ input: string, isImage: boolean }>) => {
      state.userInputs = [...state.userInputs, action.payload.input];
      if (action.payload.isImage)
        state.isImageInputs = [...state.isImageInputs, action.payload.isImage];
      state.inputCount += 1;
      console.log(state.userInputs);
    },
  },
  extraReducers: (builder) => {
    builder
    //CHAT AI
    .addCase(postChatData.rejected, (state) => {
      state.getChatResponse = 'failed';
      console.log(`CHAT IMAGE POST RESPONSE STATUS: ${state.getChatResponse}`)
    })
    .addCase(postChatData.pending, (state) => {
      state.getChatResponse = 'loading';
      console.log(`CHAT GET RESPONSE STATUS: ${state.getChatResponse}`)
    })
    .addCase(postChatData.fulfilled, (state, action: any) => {
      state.getChatResponse = 'complete';
      console.log(`CHAT POST: ${JSON.stringify(action.payload)}`);
      console.log(`CHAT POST RESPONSE STATUS: ${state.getChatResponse}`)
      const new_answer = action.payload;
      state.aiAnswers = [...state.aiAnswers, new_answer.output];
      state.answerCount += 1;
    })
    //VISION AI
    .addCase(postImageData.rejected, (state) => {
      state.getChatResponse = 'failed';
      console.log(`CHAT IMAGE POST RESPONSE STATUS: ${state.getChatResponse}`)
    })
    .addCase(postImageData.pending, (state) => {
      state.getChatResponse = 'loading';
      console.log(`CHAT IMAGE POST RESPONSE STATUS: ${state.getChatResponse}`)
    })
    .addCase(postImageData.fulfilled, (state, action: any) => {
      state.getChatResponse = 'complete';
      console.log(`CHAT IMAGE POST: ${JSON.stringify(action.payload)}`);
      console.log(`CHAT IMAGE POST RESPONSE STATUS: ${state.getChatResponse}`)
      const new_answer = action.payload;
      state.aiAnswers = [...state.aiAnswers, new_answer.output];
      state.answerCount += 1;
    })
  }  
});

export const { saveUserInput } = chatSlice.actions;

export default chatSlice