import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  isLoggedIn: false,
  firstname: null,
  lastname: null,
  token: null,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUserData: (state, action) => {
      state.username = action.payload.username;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.token = action.payload.token;
    },
    setStatus: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { setCurrentUserData, setStatus } = currentUserSlice.actions;

export default currentUserSlice.reducer;
