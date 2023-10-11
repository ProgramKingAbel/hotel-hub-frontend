import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <div className="relative">
    <div className="absolute left-0 top-0">
      <Navbar />
    </div>
    <div className="flex justify-center ">
      <Outlet />
    </div>
  </div>
);

export default Layout;
