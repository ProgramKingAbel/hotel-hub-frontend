import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservations, deleteReservation } from '../redux/features/reservations/reservationsSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch, reservations]);

  const handleDeleteReservation = async (reservationId) => {
    try {
      dispatch(deleteReservation(reservationId));
    } catch (error) {
      console.error('Error adding room:', error);
    }
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
