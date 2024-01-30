import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export const getPredArr = createAsyncThunk('GET_PREDARR',
  async () => {
    const response = await axios.get('dashboard/1')
    return response.data;
  }
)

export const getPredData = createAsyncThunk('GET_PREDDATA',
  async () => {
    const response = await axios.get('dashboard/2')
    return response.data;
  }
)


interface dashboardState{
    target: number[],
    pred: number[],
    current: number[]
}

const initialState:dashboardState = {
    target: [],
    pred: [],
    current: [],
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
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
