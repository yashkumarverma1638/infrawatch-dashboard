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
  reducers: {},
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
