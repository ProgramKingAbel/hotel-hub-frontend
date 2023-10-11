import { configureStore } from '@reduxjs/toolkit';
import reservationsReducer from './features/reservations/reservationsSlice';
import roomReducer from './features/rooms/roomsSlice';

const store = configureStore({
  reducer: {
    reservations: reservationsReducer,
    room: roomReducer,
  },
});

export default store;
