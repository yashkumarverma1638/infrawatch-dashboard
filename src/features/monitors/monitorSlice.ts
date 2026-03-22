import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const fetchMonitors = createAsyncThunk("monitors/fetch", async () => {
  const res = await API.get("/urls");
  return res.data;
});

const monitorSlice = createSlice({
  name: "monitors",
  initialState: {
    monitors: [],
    loading: false,
  },
  reducers: {
    updateMonitorRealtime: (state, action) => {
      const { urlId, status, responseTime } = action.payload;

      const monitor = state.monitors.find((m) => m.id === urlId);

      if (monitor) {
        if (!monitor.logs) {
          monitor.logs = [];
        }

        monitor.logs.unshift({
          id: Date.now(),
          urlId,
          status,
          responseTime,
          checkedAt: new Date().toISOString(),
        });

        // keep only latest log
        monitor.logs = monitor.logs.slice(0, 1);
      }
    },
    removeMonitor: (state, action) => {
      state.monitors = state.monitors.filter(
        (monitor) => monitor.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonitors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMonitors.fulfilled, (state, action) => {
        state.monitors = action.payload;
        state.loading = false;
      });
  },
});

export default monitorSlice.reducer;
export const { updateMonitorRealtime, removeMonitor } = monitorSlice.actions;
