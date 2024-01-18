import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

const userName = 'lgsi';

interface postState{
  userInput:string
}

export const postChatData = createAsyncThunk<postState,string>('POST_CHATDATA',
  async (userInput) => {
    const response = await axios.post(`api/controlChat/${userName}`, { 'userInput': userInput })
    return response.data;
  }
)

export const getChatData = createAsyncThunk('GET_CHATDATA',
  async () => {
    const response = await axios.get(`api/controlChat/${userName}`)
    return response.data;
  }
)

interface chatState {
  inputCount: number,
  userInputs: string[],
  answerCount: number,
  aiAnswers: string[]
}

// Define the initial state using that type
const initialState: chatState = {
  inputCount: 0,
  userInputs: [],
  answerCount:0,
  aiAnswers: []
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    saveUserInput: (state, action: PayloadAction<string>) => {
      state.userInputs.push(action.payload);
      state.inputCount += 1;
      console.log(`chat reducer userinputs: ${state.userInputs}`);
      console.log(`chat reducer inputcount: ${state.inputCount}`);
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getChatData.fulfilled, (state, action: PayloadAction<string>) => {
      console.log(`get data: ${action.payload}`);
      state.aiAnswers.push(action.payload);
      state.answerCount += 1;
      console.log(`chat reducer aianswers: ${state.aiAnswers}`);
      console.log(`chat reducer answercount: ${state.answerCount}`);
    })
    .addCase(postChatData.fulfilled, (state, action) => {
      console.log(`post data: ${JSON.stringify(action.payload)}`);
    })
  }  
});

export const { saveUserInput } = chatSlice.actions;

export default chatSlice