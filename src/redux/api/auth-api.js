import { createAsyncThunk } from "@reduxjs/toolkit";
import AXIOS from "../../client/src/config/config";
import {
  REGISTER_API,
  LOADUSER_API,
  LOGIN_API,
  LOGOUT_API,
} from "./apiconstants";

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ name, email, password, avatar }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      if (avatar) {
        const { data } = await AXIOS.post(
          REGISTER_API,
          {
            name,
            email,
            password,
            avatar,
          },
          config
        );
        return data.user;
      } else {
        const { data } = await AXIOS.post(
          REGISTER_API,
          {
            name,
            email,
            password,
          },
          config
        );
        return data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await AXIOS.post(
        LOGIN_API,
        {
          email,
          password,
        },
        config
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

export const logoutUser = createAsyncThunk("auth/logoutUser", async (arg) => {
  const { data } = await AXIOS.get(LOGOUT_API);
  return data;
});

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.get(LOADUSER_API);
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
