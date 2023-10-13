import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  Card,
  IconButton,
} from '@material-tailwind/react';
import {
  HomeIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  PowerIcon,
  PlusIcon,
  TrashIcon,

} from '@heroicons/react/24/solid';
// import AddRoom from './AddRoom';
// import DeleteRoom from './DeleteRoom';

const links = [
  {
    path: '/app',
    text: 'Rooms',
    icon: HomeIcon,
    exact: true,
  },
  {
    path: '/app/Reservations',
    text: 'Reserve a Room',
    icon: ShoppingBagIcon,
    exact: false,
  },
  {
    path: '/app/Profile',
    text: 'My Reservations',
    icon: UserCircleIcon,
    exact: false,
  },
  {
    path: '/app/AddRoom',
    text: 'Add Room',
    icon: PlusIcon,
    exact: false,
  },
  {
    path: '/app/DeleteRoom',
    text: 'Delete Room',
    icon: TrashIcon,
    exact: false,
  },
  {
    path: '/register',
    text: 'Sign Out',
    icon: PowerIcon,
    exact: false,
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const handleNavLinkClick = () => {
    setOpenMobileNav(true);
  };

  const toggleMobileNav = () => {
    setOpenMobileNav((prevState) => !prevState);
  };

  return (
    <>
      <IconButton
        variant="text"
        className="ml-auto h-6 w-6  text-inherit text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden toggle_icon"
        ripple={false}
        onClick={toggleMobileNav}
      >
        {openMobileNav ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </IconButton>
      <Card className={`h-screen  w-full p-2 gap-5 bg-gray-300 md:flex rounded-none navbar ${openMobileNav ? 'block' : 'hidden'}`}>
        <h2 className="mt-3 ml-4 nav_brand">
          <Typography variant="h3" color="black" className="font-semibold mb-4">
            Hotel Hub
          </Typography>
        </h2>

        <List>
          {links.map((link) => (
            <ListItem key={link.text} className="mb-2 ml-4 list">
              {pathname !== '/' ? (
                <NavLink
                  exact={link.exact}
                  to={link.path}
                  className={`flex items-center p-2 text-lg rounded-none  ${
                    link.path === pathname ? 'bg-blue-500' : ''
                  }`}
                  onClick={() => handleNavLinkClick(link.path)}
                >
                  {React.createElement(link.icon, {
                    className: 'h-5 w-5 mr-2',
                  })}
                  {link.text}
                </NavLink>
              ) : (
                <span className="text-blue-700">{link.text}</span>
              )}
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
};

export default Navbar;
