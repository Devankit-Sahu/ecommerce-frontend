import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const SingleProductDetail = createAsyncThunk(
  "product/SingleProductDetail",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);
      return data.product;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
