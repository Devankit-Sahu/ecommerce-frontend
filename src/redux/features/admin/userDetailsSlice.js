import { createSlice } from "@reduxjs/toolkit";
import { userDetailsAction } from "../../api/admin-api";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const userDetailsSlice = createSlice({
  name: "admin/getDetails",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(userDetailsAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(userDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    });
  },
});

export default userDetailsSlice.reducer;
