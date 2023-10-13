import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// http://127.0.0.1:3000/api/v1/rooms

const BASE_URL = `${process.env.REACT_APP_HOST_URL}rooms`;
const customHeader = {
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkZDA4ODkyMC04MmEzLTRkN2ItOTRlZS1mMDllZDAyNGMwNjAiLCJzdWIiOiIxMiIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTY5NzExMTgyMywiZXhwIjoxNjk3MTE5MDIzfQ.19_k5xlLhIZ2gjUeRg8F6QuMNwWBaz18LIEx7Jfxx0M',
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
      console.log(action.payload);
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
