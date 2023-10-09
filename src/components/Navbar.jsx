import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const links = [
  { path: '/app', text: 'Rooms' },
  { path: '/app/Reservations', text: 'Reserve a Room' },
  { path: '/app/Profile', text: 'My Reservations' },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav>
      <h1>Hotel Hub</h1>
      <ul>
        {links.map((link) => (
          <li key={link.text}>
            {pathname !== '/' ? (
              <NavLink to={link.path}>{link.text}</NavLink>
            ) : (
              <span>{link.text}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
