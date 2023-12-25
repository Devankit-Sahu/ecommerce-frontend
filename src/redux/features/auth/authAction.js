import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isLoggedIn, isLoggedOut } from "./authSlice";

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ name, email, password, avatar }, { rejectWithValue, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/v1/register",
        {
          name,
          email,
          password,
          avatar,
        },
        config
      );
      dispatch(isLoggedIn());
      return data.user;
    } catch (error) {
      if (error.response && error.response.data.message) {
        dispatch(isLoggedOut());
        return rejectWithValue(error.response.data.message);
      } else {
        dispatch(isLoggedOut());
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/v1/login",
        {
          email,
          password,
        },
        config
      );
      dispatch(isLoggedIn());
      return data.user;
    } catch (error) {
      if (error.response && error.response.data.message) {
        dispatch(isLoggedOut());
        return rejectWithValue(error.response.data.message);
      } else {
        dispatch(isLoggedOut());
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get("/api/v1/me");
      dispatch(isLoggedIn());
      return data.user;
    } catch (error) {
      if (error.response && error.response.data.message) {
        dispatch(isLoggedOut());
        return rejectWithValue(error.response.data.message);
      } else {
        dispatch(isLoggedOut());
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (arg, { dispatch }) => {
    await axios.get("/api/v1/logout");
    dispatch(isLoggedOut());
    return;
  }
);
