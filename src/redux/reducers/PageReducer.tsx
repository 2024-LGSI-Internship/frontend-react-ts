import { createSlice } from "@reduxjs/toolkit";

interface pageState{
  value:number
}

const initialState: pageState = {
  value: 1
}

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    selectStatus: (state) => {
      state.value = 1;
    },
    selectController: (state) => {
      state.value = 2;
    },
    selectChat: (state) => {
      state.value = 3;
    },
    selectCalendar: (state) => {
      state.value = 4;
    }
  }
});

export const { selectStatus, selectController, selectChat, selectCalendar } = pageSlice.actions;

export default pageSlice