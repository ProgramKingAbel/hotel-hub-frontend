import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_HOST_URL}reservations`;
const customHeader = {
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1NTEzYjAwZi02NzE5LTQwNzEtYTNiZi03YzY0YTc4OTFkODkiLCJzdWIiOiIzIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjk3MDM0MDc3LCJleHAiOjE2OTcwNDEyNzd9.g57-Gupy5Wiqq6Ix8SSharQAf3vBUTGLVaeFks-DrSQ',
};

const initialState = {
  isLoading: false,
  reservations: [],
  error: ''
};

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
  const response = await axios.get(BASE_URL, { headers: customHeader });
  return response.data;
});

const reservationData = JSON.stringify({
  check_in: "",
  check_out: "",
  room_id: 4
});

// Add a new async thunk for creating reservations
export const createReservation = createAsyncThunk('reservations/createReservation', async (reservationData) => {
  const response = await axios.post(`${BASE_URL}api/v1/reservations`, reservationData);
  console.log(response.data)
  return response.data;
});

const reservationsSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    // Add any other reducers you need
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReservations.fulfilled, (state, action) => {
      state.reservations = action.payload;
      state.error = '';
      state.isLoading = false;
    });
  },
});

export default reservationsSlice.reducer;
