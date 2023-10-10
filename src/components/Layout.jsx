import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <div className="flex">
    <div>
      <Navbar />
    </div>
    <div className="ml-12 flex justify-center ">
      <Outlet />
    </div>
  </div>

);

export default Layout;
