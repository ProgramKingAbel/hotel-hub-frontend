import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// http://127.0.0.1:3000/api/v1/rooms

const BASE_URL = `${process.env.REACT_APP_HOST_URL}rooms`;

const initialState = {
  isLoading: false,
  rooms: [],
  error: '',
};

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', () => axios.get(BASE_URL).then((response) => response.data));

const roomSlice = createSlice({
  name: 'room',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.rooms = action.payload;
      state.error = '';
      state.isLoading = false;
    });

    builder.addCase(fetchRooms.pending, (state) => {
      state.rooms = {};
      state.error = '';
      state.isLoading = true;
    });

    builder.addCase(fetchRooms.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.rooms = {};
    });
  },
});

export default roomSlice.reducer;
