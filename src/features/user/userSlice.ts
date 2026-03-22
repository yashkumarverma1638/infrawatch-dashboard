import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const fetchUser = createAsyncThunk("user/fetch", async () => {
  const res = await API.get("/user/me");
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
