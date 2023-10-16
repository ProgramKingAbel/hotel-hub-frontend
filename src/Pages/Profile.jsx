import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchReservations, deleteReservation } from '../redux/features/reservations/reservationsSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    dispatch(fetchReservations()).then((result) => {
      if (fetchReservations.fulfilled.match(result)) {
        setReservations(result.payload);
      }
    });
  }, [dispatch]);

  const handleDeleteReservation = async (reservationId) => {
    dispatch(deleteReservation(reservationId)).then((result) => {
      const { payload } = result;
      if (deleteReservation.fulfilled.match(result) && payload.message === 'Reservation deleted successfully.') {
        setReservations((prevReservations) => prevReservations
          .filter((r) => r.id !== reservationId));
      }
    });
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
