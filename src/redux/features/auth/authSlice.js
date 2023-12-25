import { createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, loadUser, logoutUser } from "./authAction";

const initialState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    clearAllErrors: (state) => {
      state.error = null;
    },
    isLoggedIn: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem("isAuth", JSON.stringify(state.isAuthenticated));
    },
    isLoggedOut: (state) => {
      state.isAuthenticated = false;
      localStorage.setItem("isAuth", JSON.stringify(state.isAuthenticated));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    });

    // login actions
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    });

    // logout
    builder.addCase(logoutUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = null;
    });

    // loaduser
    // login actions
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    });
  },
});
export const {
  clearAllErrors,
  loginSuccess,
  loginFailure,
  isLoggedIn,
  isLoggedOut,
} = authSlice.actions;

export default authSlice.reducer;
