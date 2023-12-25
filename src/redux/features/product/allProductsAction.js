import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProductsAction = createAsyncThunk(
  "product/getAllProducts",
  async (
    { key = "", page = 1, price = [0, 200000], categories },
    { rejectWithValue }
  ) => {
    let link = `/api/v1/products?key=${key}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${page}`;

    if (categories.length > 0) {
      link = `/api/v1/products?key=${key}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${categories}`;
    }
    try {
      const { data } = await axios.get(link);
      return data;
      return [];
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
