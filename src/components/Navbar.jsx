import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { path: '/', text: 'Register' },
  { path: 'Rooms', text: 'Rooms' },
  { path: 'Reservations', text: 'Reserve a Room' },
  { path: 'Profile', text: 'My Reservations' },
];

const Navbar = () => (
  <nav>
    <h1>Hotel Hub</h1>
    <ul>
      {links.map((link) => (
        <li key={link.text}>
          <NavLink to={link.path}>{link.text}</NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
