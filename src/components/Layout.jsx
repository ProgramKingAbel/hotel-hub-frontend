import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import Loader from './Loader/Loader';

function Layout() {
  const userLoading = useSelector((state) => state.user.isLoading);
  const reservationLoading = useSelector(
    (state) => state.reservations.isLoading,
  );
  const roomLoading = useSelector((state) => state.room.isLoading);

  return (
    <div className="flex relative">
      <div className="w-1/5">
        {/* Sidebar */}
        <Navbar />
      </div>
      <div className="w-full sm:w-3/4 p-4">
        {/* Main Content Area */}
        <Outlet />
        {' '}
        {/* Render the content of the current route */}
      </div>
      {(userLoading || reservationLoading || roomLoading) && <Loader />}
    </div>
  );
}

export default Layout;
