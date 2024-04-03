import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUser = createAsyncThunk("updateUser", async ({name,email,avatar},{rejectWithValue}) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const { data } = await axios.put(
      "/api/v1/me/update",
      { name, email, avatar },
      config
    );
    return data.success;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});



