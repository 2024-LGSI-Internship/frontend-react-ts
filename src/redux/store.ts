import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { pageSlice } from "./reducers/PageReducer";
import { statusSlice } from "./reducers/StatusReducer";
import chatSlice from "./reducers/ChatReducer";
import dashboardSlice from "./reducers/DashboardReducer";
import calendarSlice from "./reducers/CalendarReducer";

const rootReducer = combineReducers({
  page: pageSlice.reducer,
  status: statusSlice.reducer,
  chat: chatSlice.reducer,
  dashboard: dashboardSlice.reducer,
  calendar: calendarSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch