import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_HOST_URL}reservations`;
const customHeader = {
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1NTEzYjAwZi02NzE5LTQwNzEtYTNiZi03YzY0YTc4OTFkODkiLCJzdWIiOiIzIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjk3MTg4ODg2LCJleHAiOjE2OTcxOTYwODZ9.-Wi00IxwK4rU-jIJxQpjFFv8BguzysdNu-0lS_qexWc',
};

const initialState = {
  isLoading: false,
  reservations: [],
  error: '',
  message: '',
};

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
  const response = await axios.get(BASE_URL, { headers: customHeader });
  console.log(response.data);
  return response.data;
});

// Add a new async thunk for creating reservations
export const createReservation = createAsyncThunk('reservations/createReservation', async (reservationData) => {
  const response = await axios.post(BASE_URL, { headers: customHeader }, reservationData);
  return response.data;
});

export const deleteReservation = createAsyncThunk('reservations/deleteReservation', async (reservationId) => {
  await axios.delete(`${BASE_URL}/${reservationId}`, { headers: customHeader });
  return reservationId;
});

const reservationsSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReservations.fulfilled, (state, action) => {
      state.reservations = action.payload;
      state.error = '';
      state.isLoading = false;
    });

    builder.addCase(createReservation.fulfilled, (state, action) => {
      state.message = action.payload;
      state.error = '';
      state.isLoading = false;
    });

    builder.addCase(deleteReservation.fulfilled, (state, action) => {
      state.reservations = state.reservations.filter(
        (reservation) => reservation.id !== action.payload,
      );
    });
  },
});

export default reservationsSlice.reducer;
