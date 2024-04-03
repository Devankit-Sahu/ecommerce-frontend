import { createSlice } from "@reduxjs/toolkit";
import { addCategoryAction } from "../../api/admin-api";

const initialState = {
  isCreated:false,
  message: "",
  error: null,
};

const addCategorySlice = createSlice({
  name: "admin/add-category",
  initialState: initialState,
  reducers: {
    isCreatedReset: (state) => {
      state.isCreated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCategoryAction.fulfilled, (state, action) => {
      state.isCreated = action.payload.success;
      state.message = action.payload.message;
    });
    builder.addCase(addCategoryAction.rejected, (state, action) => {
      state.message = "";
      state.isCreated = false;
      state.error = action.payload;
    });
  },
});
export const { isCreatedReset } = addCategorySlice.actions;


export default addCategorySlice.reducer;
