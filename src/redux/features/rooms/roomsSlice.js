import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

const initialState = {
  isLoading: false,
  rooms: [],
  error: '',
  roomDetails: {},
  message: '',
};

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => axiosInstance.get('rooms').then((response) => response.data));
export const fetchRoomDetailsById = createAsyncThunk('rooms/fetchRoomDetailsById', async (roomId) => {
  const response = await axiosInstance.get(`rooms/${roomId}`);
  return response.data;
});

export const addRoom = createAsyncThunk('rooms/addRoom', async (roomData) => {
  const response = await axiosInstance.post('rooms', roomData);
  return response.data;
});

export const destroyRoom = createAsyncThunk('rooms/destroyRoom', async (roomId) => {
  const response = await axiosInstance.delete(`rooms/${roomId}`);
  return response.data;
});

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    resetRoomState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.rooms = action.payload;
      state.error = action.payload.error;
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

    builder.addCase(destroyRoom.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(destroyRoom.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.isLoading = false;
      state.error = '';
    });

    builder.addCase(destroyRoom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { resetRoomState } = roomSlice.actions;
export default roomSlice.reducer;
