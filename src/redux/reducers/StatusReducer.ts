import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const userName = 'lgsi';

interface postState{
  userData: userDataState
}

//createAsynchThunk : 비동기 통신을 작업하는 action 생성
export const postUserData = createAsyncThunk<postState,userDataState>('POST_USERDATA',
  async (userData) => {
    const response = await axios.post(`api/postAirconData/${userName}`, { 'userData': userData })
    return response.data;
  }
)

export const getUserData = createAsyncThunk('GET_USERDATA',
  async () => {
    const response = await axios.get(`api/getBasicSetting/${userName}`)
    return response.data;
  }
)

export const getCurData = createAsyncThunk('GET_CURDATA',
  async () => {
    const response = await axios.get(`api/getHumidTemp/${userName}`)
    //.then 구문 사용시 rejected 됨.
    return response.data;
  }
)

interface userDataState{
  userTemp: number,
  userMode: string,
  userDate: string,
  userTime: string,
  userWindAngle: string,
  userWindStrength: string
}

interface curDataState{
  curTemp: number,
  curHumid: number
}

interface statusState{
  userData: userDataState,
  curData: curDataState,
  getUserResponse: string,
  getCurResponse: string,
  postUserResponse: string
}

const initialState: statusState = {
    userData: {
      userTemp: 0,
      userMode: 'NaN', //heating, air-conditioning
      userDate: 'NaN',
      userTime: 'NaN',
      userWindAngle: 'NaN', //horizontal, normal, vertical, auto
      userWindStrength: 'NaN' //strong, normal, weak
    },
    curData: {
      curTemp: 0,
      curHumid: 0,
    },
    getUserResponse: 'None',
    getCurResponse: 'None',
    postUserResponse: 'None',
}

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: { //동기 작업
    changeUserTemp: (state, action: PayloadAction<number>) => { //action : reducer에 전달하는 인자
      let temp = state.userData.userTemp + action.payload;
      if(temp >= 18 && temp <= 30)
        state.userData.userTemp += action.payload;
    },
    changeUserMode: (state, action:PayloadAction<string>) => {
      state.userData.userMode = action.payload;
    },
    changeUserWindAngle: (state, action:PayloadAction<string>) => {
      state.userData.userWindAngle = action.payload;
    },
    changeUserWindStrength: (state, action:PayloadAction<string>) => {
      state.userData.userWindStrength = action.payload;
    }

  },
  extraReducers: (builder) => { //비동기 작업 -> action creator를 자동으로 못만듦
    builder
    //GET - userData
    .addCase(getUserData.rejected, (state) => {
      state.getUserResponse = 'failed'; 
    })
    .addCase(getUserData.pending, (state) => {
      state.getUserResponse = 'loading'; 
    })
    .addCase(getUserData.fulfilled, (state, action) => {
      console.log(action.payload)
      // console.log(typeof(state.userData))
      Object.assign(state.userData, action.payload);
      state.getUserResponse = 'complete';
      console.log(`getUserResponse is ${state.getUserResponse}`)
    })
    //POST - userData
    .addCase(postUserData.fulfilled, (state, action) => {
      console.log(action.payload);
      state.postUserResponse = 'complete';
      console.log(`postUserResponse is ${state.postUserResponse}`)
    })
    //GET - curData
    .addCase(getCurData.pending, (state) => {
      state.getCurResponse = 'loading'; 
    })
    .addCase(getCurData.fulfilled, (state,action) => {
      state.getCurResponse = 'complete';
      Object.assign(state.curData, action.payload);
      console.log(`getCurResponse is ${state.getCurResponse}`)
    })
  }
});

export const { changeUserTemp, changeUserMode,changeUserWindAngle, changeUserWindStrength } = statusSlice.actions;
export default statusSlice