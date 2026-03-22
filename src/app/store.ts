import { configureStore } from "@reduxjs/toolkit";
import monitorReducer from "../features/monitors/monitorSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    monitors: monitorReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
