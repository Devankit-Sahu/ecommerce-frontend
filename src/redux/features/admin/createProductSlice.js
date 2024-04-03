import { createSlice } from "@reduxjs/toolkit";
import { createProductAdminAction } from "../../api/admin-api";

const initialState = {
  loading: false,
  isCreated: false,
  message: "",
  error: null,
};

const createProductAdminSlice = createSlice({
  name: "admin/new",
  initialState: initialState,
  reducers: {
    productCreatedReset: (state) => {
      state.isCreated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProductAdminAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      createProductAdminAction.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.isCreated = payload.success;
        state.message = payload.message;
      }
    );
    builder.addCase(createProductAdminAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
export const { productCreatedReset } = createProductAdminSlice.actions;

export default createProductAdminSlice.reducer;
