import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

const initialState = {
  isLoading: false,
  reservations: [],
  error: null,
  message: null,
  reservationStatus: null,
};

export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async () => {
    const response = await axiosInstance.get('reservations');
    return response.data;
  },
);

export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async (reservationData) => {
    try {
      const response = await axiosInstance.post('reservations', reservationData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw error.request;
      } else {
        throw error.message;
      }
    }
  },
);

export const deleteReservation = createAsyncThunk(
  'reservations/deleteReservation',
  async (reservationId) => {
    const response = await axiosInstance.delete(
      `reservations/${reservationId}`,
    );
    return response.data;
  },
);

const reservationsSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    updateReservationStatus: (state, action) => {
      state.reservationStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReservations.fulfilled, (state, action) => {
      state.reservations = action.payload;
      state.error = '';
      state.isLoading = false;
    });

    builder.addCase(fetchReservations.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createReservation.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.error = '';
      state.isLoading = false;
    });

    builder.addCase(createReservation.rejected, (state, action) => {
      const { error } = action;
      state.error = JSON.parse(error.message);
      state.isLoading = false;
    });

    builder.addCase(deleteReservation.fulfilled, (state, action) => {
      state.message = action.payload.message;
    });
  },
});

export const { updateReservationStatus } = reservationsSlice.actions;
export default reservationsSlice.reducer;
