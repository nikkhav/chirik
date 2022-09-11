import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./slices/currentUserSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
  },
});
