import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_HOST_URL}reservations`;
const customHeader = {
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkZDA4ODkyMC04MmEzLTRkN2ItOTRlZS1mMDllZDAyNGMwNjAiLCJzdWIiOiIxMiIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTY5NzEwNjM5MiwiZXhwIjoxNjk3MTEzNTkyfQ.ghCMmtVDekyCujsW7BVxv7RkvObADVCF9tvAxGxBrl4',
};

const initialState = {
  isLoading: false,
  reservations: [],
  error: '',
};

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
  const response = await axios.get(BASE_URL, { headers: customHeader });
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
