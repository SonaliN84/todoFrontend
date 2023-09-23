import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const initialEmail = localStorage.getItem("email");
const userIsLoggedIn = !!initialToken;
const initialAuthState = {
  token: initialToken,
  isLoggedIn: userIsLoggedIn,
  userEmail: initialEmail,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
