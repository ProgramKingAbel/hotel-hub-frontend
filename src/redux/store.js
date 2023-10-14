import { configureStore } from '@reduxjs/toolkit';
import reservationsReducer from './features/reservations/reservationsSlice';
import roomReducer from './features/rooms/roomsSlice';
import usersReducer from './features/users/usersSlice';

const store = configureStore({
  reducer: {
    reservations: reservationsReducer,
    room: roomReducer,
    user: usersReducer,
  },
});

export default store;
