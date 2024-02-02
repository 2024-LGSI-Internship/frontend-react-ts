import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface dayReserve{
  day: number,
  time: string[],
}

interface Reserve{
  month: number,
  days: dayReserve[],
}

interface scheduleState{
  schedule: Reserve[],
}

const initialState: scheduleState= {
  schedule: [
    {
      month: 1,
      days:
        [
          { day: 23, time: ['12:30-15:00', '18:00-23:00'] },
          { day: 24, time: ['24:00-04:00',] },
        ]
    },
    {
      month: 2,
      days:
        [
          { day: 1, time: ['09:00-10:30'] },
          { day: 8, time: ['12:00-15:00'] },
        ]
    }
  ]
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addNewReserve: (state, action: PayloadAction<{ month: number, day: number }>) => {
      const [m, d] = [action.payload.month, action.payload.day]
      let copy = [...state.schedule];
      const idxMonth = copy.findIndex(obj => obj.month === m)
      if (idxMonth === -1) {//same month does not exist
        copy.push({ month: m, days: [{ day: d, time: ['12:00-15:00'] },] });
      }
      else {
        const idxDay = copy[idxMonth].days.findIndex((obj: { day: any, time: string[] }) => obj.day === d)
        if (idxDay === -1) {//same day does not exist
          copy[idxMonth].days.push({ day: d, time: ['12:00-15:00'] });
        }
        else {//same month, same day exists but different time
          copy[idxMonth].days[idxDay].time.push('12:00-15:00');
        }
      }
      state.schedule = copy;
    }
  }
});

export const { addNewReserve } = calendarSlice.actions;

export default calendarSlice