import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import {
  Rooms, RoomItem, Reservations, Profile, Register,
} from './Pages';

const App = () => (
  <Routes>
    <Route path="/" element={<Register />} />
    <Route path="/app" element={<Layout />}>
      <Route index element={<Rooms />} />
      <Route path="Room" element={<RoomItem />} />
      <Route path="Reservations" element={<Reservations />} />
      <Route path="Profile" element={<Profile />} />
    </Route>
  </Routes>
);

export default App;
