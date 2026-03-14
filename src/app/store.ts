import { configureStore } from "@reduxjs/toolkit";
import monitorReducer from "../features/monitors/monitorSlice";

export const store = configureStore({
  reducer: {
    monitors: monitorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
