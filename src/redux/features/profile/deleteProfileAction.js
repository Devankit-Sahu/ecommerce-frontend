export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete("/api/v1/me/delete");
      return data.success;
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
