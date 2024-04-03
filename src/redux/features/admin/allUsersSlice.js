import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersAction } from "../../api/admin-api";

const initialState = {
  loading: false,
  users: [],
  error: null,
};

const allUsersAdminSlice = createSlice({
  name: "admin/all",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsersAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllUsersAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    });
    builder.addCase(getAllUsersAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default allUsersAdminSlice.reducer;
