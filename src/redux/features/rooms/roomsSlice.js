import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// http://127.0.0.1:3000/api/v1/rooms

const BASE_URL = `${process.env.REACT_APP_HOST_URL}rooms`;

const initialState = {
  isLoading: false,
  rooms: [],
  error: '',
  roomDetails: {},
};

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => axios.get(BASE_URL).then((response) => response.data));

export const fetchRoomDetailsById = createAsyncThunk(
  'rooms/fetchRoomDetailsById',
  async (roomId) => {
    const response = await axios.get(`${BASE_URL}/${roomId}`);
    return response.data;
  },
);

export const addRoom = createAsyncThunk('rooms/addRoom', async (roomData) => {
  const response = await axios.post(BASE_URL, roomData);
  return response.data;
});

export const destroyRoom = createAsyncThunk(
  'rooms/destroyRoom',
  async (roomId) => {
    const response = await axios.delete(`${BASE_URL}/${roomId}`);
    return response.data;
  },
);

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

    // Add room Bulders

    builder.addCase(addRoom.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addRoom.fulfilled, (state, action) => {
      state.rooms.push(action.payload);
      state.isLoading = false;
      state.error = '';
    });

    builder.addCase(addRoom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Destroy room Builder
    builder.addCase(destroyRoom.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(destroyRoom.fulfilled, (state, action) => {
      const roomId = action.payload;
      state.rooms = state.rooms.filter((room) => room.id !== roomId);
      state.isLoading = false;
      state.error = '';
    });

    builder.addCase(destroyRoom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default roomSlice.reducer;
