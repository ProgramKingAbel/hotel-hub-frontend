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
      <div className="md:w-3/10 sm:w-1/10 nav_layout">
        <Navbar />
      </div>
      <div className="lg:w-3/4 md:full sm:w-full w-full p-4 outlet_layout">
        <Outlet />
        {' '}
      </div>
      {(userLoading || reservationLoading || roomLoading) && <Loader />}
    </div>
  );
};

export default Layout;
