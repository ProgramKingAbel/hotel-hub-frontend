import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './features/rooms/roomsSlice';
import usersReducer from './features/users/usersSlice';

const store = configureStore({
  reducer: {
    room: roomReducer,
    user: usersReducer,
  },
});

export default store;
