// authActions.js
import { loginSuccess, logoutSuccess } from "./authSlice";

// Simulate login with some user data (replace with actual login logic)
export const login = (username, password) => (dispatch) => {
  // Replace this with your actual login logic
  // For example, you can call an API to validate the user's credentials
  if (username === "user123" && password === "password123") {
    const user = { username: "user123" }; // Simulated user data
    dispatch(loginSuccess(user));
  } else {
    // Handle login failure here
    console.log("Invalid credentials");
  }
};

export const logout = () => (dispatch) => {
  // Replace this with your actual logout logic
  // For example, you can clear any stored tokens or user data
  dispatch(logoutSuccess());
};
