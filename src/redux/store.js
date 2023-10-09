import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './features/rooms/roomsSlice';

const store = configureStore({
  reducer: {
    room: roomReducer,
  },
});

export default store;
