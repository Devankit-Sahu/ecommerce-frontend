import { createSlice } from "@reduxjs/toolkit";
import { updateProductAdminAction } from "../../api/admin-api";

const initialState = {
  loading: false,
  isUpdated: false,
  error: null,
};

const updateProductAdminSlice = createSlice({
  name: "admin/update",
  initialState: initialState,
  reducers: {
    updateProductReset: (state) => {
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProductAdminAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateProductAdminAction.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.isUpdated = payload;
      }
    );
    builder.addCase(updateProductAdminAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { updateProductReset } = updateProductAdminSlice.actions;
export default updateProductAdminSlice.reducer;
