import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservations, deleteReservation } from '../redux/features/reservations/reservationsSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  // Function to handle reservation deletion
  const handleDeleteReservation = (reservationId) => {
    // Dispatch the deleteReservation action with the reservation ID
    dispatch(deleteReservation(reservationId));
  };

  return (
    <>
      {reservations.map((reservation) => (
        <div className="item" key={reservation.id}>
          <h1>{reservation.check_in}</h1>
          <button type="button" onClick={() => handleDeleteReservation(reservation.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default Profile;

