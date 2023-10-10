import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_HOST_URL}reservations`;

const initialState = {
  isLoading: false,
  reservations: [],
  error: '',
  reservationDetails: {},
};

// Create an async thunk for fetching reservations
export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Create an async thunk for fetching reservation details by ID
export const fetchReservationDetailsById = createAsyncThunk('reservations/fetchReservationDetailsById', async (reservationId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${reservationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define the reservation slice
const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchReservations.fulfilled, (state, action) => {
      state.reservations = action.payload;
      state.error = '';
      state.isLoading = false;
    });

    builder.addCase(fetchReservations.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchReservations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchReservationDetailsById.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchReservationDetailsById.fulfilled, (state, action) => {
      state.reservationDetails = action.payload;
      state.isLoading = false;
      state.error = '';
    });

    builder.addCase(fetchReservationDetailsById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default reservationSlice.reducer;