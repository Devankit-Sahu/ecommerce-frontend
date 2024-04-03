import { createSlice } from "@reduxjs/toolkit";
import { getCategoriesAdminAction } from "../../api/admin-api";

const initialState = {
  loading: false,
  categories: [],
};

const allCategoriesAdminSlice = createSlice({
  name: "admin/all-categories",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategoriesAdminAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategoriesAdminAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(getCategoriesAdminAction.rejected, (state, action) => {
      state.loading = false;
      state.categories = [];
    });
  },
});

export default allCategoriesAdminSlice.reducer;
