import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

const initialState = {
  isLoading: false,
  reservations: [],
  error: '',
  message: '',
};

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
  const response = await axiosInstance.get('reservations');
  console.log(response.data);
  return response.data;
});

// Add a new async thunk for creating reservations
export const createReservation = createAsyncThunk('reservations/createReservation', async (reservationData) => {
  const response = await axiosInstance.post('reservations', reservationData);
  console.log(response.data);
  return response.data;
});

export const deleteReservation = createAsyncThunk('reservations/deleteReservation', async (reservationId) => {
  await axiosInstance.delete(`reservations/${reservationId}`);
  return response.data;
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
