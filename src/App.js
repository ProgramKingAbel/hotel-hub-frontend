import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components';
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
      <Route path="reservations" element={<Reservations />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  </Routes>
);

export default App;
