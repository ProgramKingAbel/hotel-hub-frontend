import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_HOST_URL}reservations`;

const initialState = {
  isLoading: false,
  reservations: [],
  error: '',
  reservationDetails: {},
  rooms: [],
};

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const fetchReservationDetailsById = createAsyncThunk('reservations/fetchReservationDetailsById', async (reservationId) => {
  const response = await axios.get(`${BASE_URL}/${reservationId}`);
  return response.data;
});

export const fetchRooms = createAsyncThunk('reservations/fetchRooms', async () => {
  const response = await axios.get(`${BASE_URL}/rooms`);
  return response.data;
});

// Add a new async thunk for creating reservations
export const createReservation = createAsyncThunk('reservations/createReservation', async (reservationData) => {
  const response = await axios.post(`${BASE_URL}/create`, reservationData);
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
