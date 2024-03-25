import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true',
  "Access-Control-Allow-Origin": "*",
  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  Accept: 'application/json',
  withCredentials: true // 쿠키 cors 통신 설정,
}

export const getPredArr = createAsyncThunk('GET_PREDARR',
  async () => {
    const response = await axios.get('https://lgsi-backend-vercel.vercel.app/dashboard/1', headers)
    return response.data;
  }
)

export const getPredData = createAsyncThunk('GET_PREDDATA',
  async () => {
    const start = performance.now();
    const response = await axios.get('https://lgsi-backend-vercel.vercel.app/dashboard/2', headers)
    const end = performance.now();
    const duration = end - start;
    console.log(`GET Dashboard Data took ${duration} milliseconds`);
    return response.data;
  }
)


interface dashboardState{
  target: number[],
  pred: number[],
  current: number[],
  isPredict: boolean
}

const initialState:dashboardState = {
  target: [],
  pred: [],
  current: [],
  isPredict: false,  
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
      changeIsPredict: (state, action:PayloadAction<number>) => {
        if (action.payload === 1)
          state.isPredict = true;
        else
          state.isPredict = false;
      }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPredArr.fulfilled, (state, action) => {
            console.log(action.payload);
            const res = action.payload;
            [state.target, state.pred, state.current] = [res.target, res.pred, res.current];
        })
        .addCase(getPredData.fulfilled, (state, action) => {
            console.log(action.payload);
            const res = action.payload;
            state.target = [...state.target, parseInt(res.target)];
            state.pred = [...state.pred, res.pred];
            state.current = [...state.current, parseInt(res.current)];
        })
    }
})
export const { changeIsPredict } = dashboardSlice.actions;
export default dashboardSlice