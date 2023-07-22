// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if needed
  },
});

export default store;
