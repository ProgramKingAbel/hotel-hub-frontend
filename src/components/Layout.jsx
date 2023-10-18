import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import Loader from './Loader/Loader';

const Layout = () => {
  const userLoading = useSelector((state) => state.user.isLoading);
  const reservationLoading = useSelector(
    (state) => state.reservations.isLoading,
  );
  const roomLoading = useSelector((state) => state.room.isLoading);

  return (
    <div className="flex relative layout_container">
      <div className="w-1/5 nav_layout">
        <Navbar />
      </div>
      <div className="w-full sm:w-3/4 p-4 outlet_layout">
        <Outlet />
        {' '}
      </div>
      {(userLoading || reservationLoading || roomLoading) && <Loader />}
    </div>
  );
};

export default Layout;
