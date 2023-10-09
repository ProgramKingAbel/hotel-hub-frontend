import React from 'react';
import { Rooms, RoomItem, Reservations, Profile, Register} from './Pages';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Register />} />
      <Route path="Rooms" element={<Rooms />} />
      <Route path="Room" element={<RoomItem />} />
      <Route path="Reservations" element={<Reservations />} />
      <Route path="Profile" element={<Profile />} />
    </Route>
  </Routes>
);

export default App;
