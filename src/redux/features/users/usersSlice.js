import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000/users';

const initialState = {
  isLoading: false,
  user: null,
  error: null,
  registrationStatus: null,
  loginStatus: null,
};

export const signUpUser = createAsyncThunk('user/sign_up', async (userData) => {
  try {
    const response = await axios.post(BASE_URL, userData);

    const authToken = response.headers.authorization;
    localStorage.setItem('authToken', authToken);
    const currentUserData = JSON.stringify(response.data.status.data);
    localStorage.setItem('userData', currentUserData);

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const signInUser = createAsyncThunk('user/sign_in', async (userData) => {
  try {
    const res = await axios.post(`${BASE_URL}/sign_in`, userData);

    const authToken = res.headers.authorization;
    localStorage.setItem('authToken', authToken);
    const currentUserData = JSON.stringify(res.data.status.data);
    localStorage.setItem('userData', currentUserData);

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateRegistrationStatus: (state, action) => {
      state.registrationStatus = action.payload;
    },
    updateLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.status.data;
        state.error = action.payload.status.message;
        state.registrationStatus = action.payload.status.message === 'User could not be created successfully'
          ? 'failed'
          : 'success';
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.status.message;
      })

      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.status.data;
        state.loginStatus = action.payload.status.message === 'Signed in Successfully' ? 'success' : 'failed';
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateRegistrationStatus, updateLoginStatus } = usersSlice.actions;
export default usersSlice.reducer;
