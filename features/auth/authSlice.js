import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  user: null,
  errorMessage: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, navigation }, thunkAPI) => {
    try {
      return await authService.login(email, password, navigation);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        'Login failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async ({ navigation,location }, thunkAPI) => {
    try {
      return await authService.getUser(navigation,location);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        'Login failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);




const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.errorMessage = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.errorMessage = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.errorMessage = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = action.payload;
        state.errorMessage = null;
      })
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
