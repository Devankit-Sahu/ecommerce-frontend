import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const allCategoriesAction = createAsyncThunk(
  "admin/all/getAllCategories",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/all-categories");
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
      const { data } = await axios.post(
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
      const { data } = await axios.delete(
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
