import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProductsAdminAction = createAsyncThunk(
  "admin/all/getAllProducts",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/products");
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


export const createProductAdminAction = createAsyncThunk(
  "admin/new/createProduct",
  async (prodData, { rejectWithValue }) => {
    try {
      console.log(prodData);
      const { data } = await axios.post("/api/v1/admin/product/new", prodData);
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


export const deleteProductAdminAction = createAsyncThunk(
  "admin/delete/deleteProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
      console.log(data);
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

export const updateProductAdminAction = createAsyncThunk(
  "admin/update/updateProduct",
  async ({ id, myForm }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/v1/admin/product/${id}`, myForm);
      return data.success;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
