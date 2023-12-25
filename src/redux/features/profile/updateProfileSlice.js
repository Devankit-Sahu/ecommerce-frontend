import { createSlice } from "@reduxjs/toolkit";
import { updateUser } from "./updateProfileAction";

const initialState = {
  loading: false,
  isUpdated: false,
  error: null,
};

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: initialState,
  reducers: {
    updateProfileReset: (state) => {
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isUpdated = false;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isUpdated = payload;
    });
    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isUpdated = false;
    });
  },
});

export const { updateProfileReset } = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
