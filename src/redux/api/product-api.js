import { createAsyncThunk } from "@reduxjs/toolkit";
import AXIOS from "../../client/src/config/config";
import {
  ALLCATEGORIES_API,
  ALLPRODUCTS_API,
  PRODUCTDETAILS_API,
} from "./apiconstants";

export const getAllProductsWithQueryAction = createAsyncThunk(
  "product/getAllProductsWithQuery",
  async (
    { key = "", price = [0, 300000], page = 1, categories = [] },
    { rejectWithValue }
  ) => {
    let link = `${ALLPRODUCTS_API}?key=${key}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${page}`;

    if (categories.length > 0) {
      link = `${ALLPRODUCTS_API}?key=${key}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${page}&category=${categories}`;
    }
    try {
      const { data } = await AXIOS.get(link);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllProductsAction = createAsyncThunk(
  "product/getAllProducts",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.get(ALLPRODUCTS_API);
      return data.products;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const SingleProductDetailAction = createAsyncThunk(
  "product/SingleProductDetail",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.get(PRODUCTDETAILS_API + id);
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

export const getAllCategoriesAction = createAsyncThunk(
  "product/getAllCategories",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.get(ALLCATEGORIES_API);
      return data.allCategories;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
