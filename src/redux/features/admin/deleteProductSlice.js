import { createSlice } from "@reduxjs/toolkit";
import { deleteProductAdminAction } from "../../api/admin-api";

const initialState = {
  loading: false,
  isDeleted: false,
  message:"",
  error: null,
};

const deleteProductAdminSlice = createSlice({
  name: "admin/delete",
  initialState: initialState,
  reducers: {
    deleteProductReset: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteProductAdminAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteProductAdminAction.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.isDeleted = payload.success;
        state.message = payload.message;
      }
    );
    builder.addCase(deleteProductAdminAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { deleteProductReset } = deleteProductAdminSlice.actions;
export default deleteProductAdminSlice.reducer;
