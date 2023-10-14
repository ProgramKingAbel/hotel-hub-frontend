import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Layout, ReservationForm, AddRoom, DeleteRoom,
} from './components';
import {
  Rooms, RoomItem, Reservations, Profile, Splash, Register, Login,
} from './Pages';

const App = () => (
  <Routes>
    <Route path="/" element={<Splash />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/app" element={<Layout />}>
      <Route index element={<Rooms />} />
      <Route path="room/:roomId" element={<RoomItem />} />
      <Route path="room/:roomId/reserve" element={<ReservationForm />} />
      <Route path="Reservations" element={<Reservations />} />
      <Route path="Profile" element={<Profile />} />
      <Route path="AddRoom" element={<AddRoom />} />
      <Route path="DeleteRoom" element={<DeleteRoom />} />
    </Route>
  </Routes>
);

export default App;
