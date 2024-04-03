import { createSlice } from "@reduxjs/toolkit";
import { deleteCategoryAction } from "../../api/admin-api";

const initialState = {
  isDeleted: false,
  message: "",
};

const deleteCategorySlice = createSlice({
  name: "admin/delete-category",
  initialState: initialState,
  reducers: {
    isDeletedReset: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.isDeleted = action.payload.success;
      state.message = action.payload.message;
    });
  },
});
export const { isDeletedReset } = deleteCategorySlice.actions;

export default deleteCategorySlice.reducer;
