import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservations } from '../redux/features/reservations/reservationsSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);
  console.log(reservations);
  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);
  return (
    <>
      {reservations.map((reservation) => (
        <div className="item" key={reservation.id}>
          <h1>{reservation.check_in}</h1>
        </div>
      ))}
    </>
  );
};

export default Profile;
