import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, updateUser } from "./updateProfileAction";

const initialState = {
  loading: false,
  isDeleted: false,
  error: null,
};

const deleteProfileSlice = createSlice({
  name: "deleteProfile",
  initialState: initialState,
  reducers: {
    deleteProfileReset: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isDeleted = false;
    });
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isDeleted = payload;
    });
    builder.addCase(deleteUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isDeleted = false;
    });
  },
});

export const { deleteProfileReset } = deleteProfileSlice.actions;
export default deleteProfileSlice.reducer;
