import { createSlice } from "@reduxjs/toolkit";
import { allCategoriesAction } from "./categoryActions";

const initialState = {
  loading: false,
  categories: [],
};

const allCategoriesSlice = createSlice({
  name: "admin/all-categories",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(allCategoriesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(allCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(allCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.categories = [];
    });
  },
});

export default allCategoriesSlice.reducer;
