// eslint disable //
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createReservation, fetchReservations,
} from '../redux/features/reservations/reservationsSlice';

const Reservation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const reservations = useSelector((state) => state.reservations.reservations);
  console.log(reservations);
  const rooms = useSelector((state) => state.reservations.rooms);

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');

  useEffect(() => {
    // Fetch user's reservations when the component mounts
    dispatch(fetchReservations());
  }, [dispatch]);

  const handleReservationSubmit = () => {
    // Create a new reservation
    dispatch(createReservation({
      name, date, roomId: selectedRoomId, userId: user.id,
    }));
  };

  return (

    <div>
      <h1>Booking</h1>

      <div className="reservation-form">

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="date">Date:</label>

        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor="room">Select a Room:</label>
        <select
          id="room"
          value={selectedRoomId}
          onChange={(e) => setSelectedRoomId(e.target.value)}
        >
          <option value="">Select a room</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleReservationSubmit}>Reserve</button>
      </div>

      <h2>My Reservations</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            <p>
              Name:
              {reservation.name}
            </p>
            <p>
              Date:
              {reservation.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservation;
