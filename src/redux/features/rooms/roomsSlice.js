import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// http://127.0.0.1:3000/api/v1/rooms

const BASE_URL = `${process.env.REACT_APP_HOST_URL}rooms`;
const customHeader = {
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3OTA2YzM3YS1lZjdmLTQ5YjYtOGM5Mi0yZmE5MzA3OGYzNWUiLCJzdWIiOiI0Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjk3MDIzNDY3LCJleHAiOjE2OTcwMzA2Njd9.6OnHLVWixkIgS_zoUVcBroETRlhBb82N1l5rpjTFV6E',
};

const initialState = {
  isLoading: false,
  rooms: [],
  error: '',
  roomDetails: {},
};

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => axios.get(BASE_URL, {
  headers: customHeader,
}).then((response) => response.data));
export const fetchRoomDetailsById = createAsyncThunk('rooms/fetchRoomDetailsById', async (roomId) => {
  const response = await axios.get(`${BASE_URL}/${roomId}`);
  return response.data;
});

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
      state.isLoading = true;
    });

    builder.addCase(fetchRooms.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchRoomDetailsById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRoomDetailsById.fulfilled, (state, action) => {
      state.roomDetails = action.payload;
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(fetchRoomDetailsById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default roomSlice.reducer;
