import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <div className="flex relative">
    <div className="w-1/5">
      {' '}
      {/* Sidebar */}
      <Navbar />
    </div>
    <div className="w-3/4 p-4 ">
      {' '}
      {/* Main Content Area */}
      <Outlet />
      {' '}
      {/* Render the content of the current route */}
    </div>
  </div>
);

export default Layout;
