import { createAsyncThunk } from "@reduxjs/toolkit";
import AXIOS from "../../client/src/config/config";
import {
  ADMIN_CATEGORY_API,
  ADMIN_PRODUCTS_API,
  ADMIN_USERS_API,
} from "./apiconstants";

export const getAllProductsAdminAction = createAsyncThunk(
  "admin/all/getAllProducts",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.get(ADMIN_PRODUCTS_API);
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
      const { data } = await AXIOS.post("/api/v1/admin/product/new", prodData);
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
      const { data } = await AXIOS.delete(`/api/v1/admin/product/${id}`);
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
      const { data } = await AXIOS.put(`/api/v1/admin/product/${id}`, myForm);
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

export const getCategoriesAdminAction = createAsyncThunk(
  "admin/all/getAllCategories",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.get(ADMIN_CATEGORY_API);
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

export const addCategoryAction = createAsyncThunk(
  "admin/add/category",
  async ({ categoryName, categoryImage }, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.post(
        "/api/v1/admin/category/new",
        {
          categoryName,
          categoryImage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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

export const deleteCategoryAction = createAsyncThunk(
  "admin/delete/category",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.delete(
        `/api/v1/admin/delete-category/${id}`
      );
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

export const getAllUsersAction = createAsyncThunk(
  "admin/all/getAllUsers",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.get(ADMIN_USERS_API);
      return data.users;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userDetailsAction = createAsyncThunk(
  "admin/getDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.get(`/api/v1/admin/user/${id}`);
      return data.user;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
