import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

interface postState{
  userInput:string
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

interface chatState {
  inputCount: number,
  userInputs: string[],
  answerCount: number,
  aiAnswers: string[],
  getChatResponse: string
}

// Define the initial state using that type
const initialState: chatState = {
  inputCount: 0,
  userInputs: [],
  answerCount:0,
  aiAnswers: [],
  getChatResponse: 'None',
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    saveUserInput: (state, action: PayloadAction<string>) => {
      state.userInputs.push(action.payload);
      state.inputCount += 1;
      // console.log(`chat reducer userinputs: ${state.userInputs}`);
      // console.log(`chat reducer inputcount: ${state.inputCount}`);
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(postChatData.pending, (state) => {
      state.getChatResponse = 'loading';
      console.log(`CHAT GET RESPONSE STATUS: ${state.getChatResponse}`)
    })
    .addCase(postChatData.rejected, (state, action) => {
      state.getChatResponse = 'failed';
      console.log(`CHAT POST : ${JSON.stringify(action.payload)} REJECTED`);
    })
    .addCase(postChatData.fulfilled, (state, action: any) => {
      state.getChatResponse = 'complete';
      console.log(`CHAT POST: ${JSON.stringify(action.payload)}`);
      console.log(`CHAT POST RESPONSE STATUS: ${state.getChatResponse}`)
      const new_answer = JSON.parse(action.payload);
      state.aiAnswers = [...state.aiAnswers, new_answer.output];
      console.log(state.aiAnswers);
      state.answerCount += 1;
    })
  }  
});

export const { saveUserInput } = chatSlice.actions;

export default chatSlice