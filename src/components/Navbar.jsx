import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  Card,
  MobileNav,
  IconButton,
} from '@material-tailwind/react';
import {
  HomeIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';

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
    path: '/',
    text: 'Sign Out',
    icon: PowerIcon,
    exact: false,
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [activeLink, setActiveLink] = useState(pathname);

  const handleNavLinkClick = (path) => {
    setActiveLink(path);
    setOpenMobileNav(false);
  };

  const toggleMobileNav = () => {
    setOpenMobileNav(!openMobileNav);
  };

  return (
    <>
      <Card className="h-[calc(100vh)] w-full p-2 gap-8 hidden md:flex rounded-none navbar">
        <h2 className="mt-3 ml-4 nav_brand">
          <Typography variant="h3" color="black" className="font-semibold mb-4">
            Hotel Hob
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
                    link.path === activeLink ? 'bg-blue-500' : ''
                  }`} // Apply the conditional class here
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

      <IconButton
        variant="text"
        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
        ripple={false}
        onClick={toggleMobileNav}
      >
        {openMobileNav ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="h-6 w-6"
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
            className="h-6 w-6"
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

      <MobileNav
        open={openMobileNav}
        onClose={() => setOpenMobileNav(false)}
        className="xl:hidden h-[calc(100vh)] w-full p-4 bg-gray-300 gap-8 md:flex rounded-none "
      >
        <List>
          {links.map((link) => (
            <ListItem key={link.text} className="">
              {pathname !== '/' ? (
                <NavLink
                  to={link.path}
                  className={`text-blue-700 hover:text-blue-900 flex items-center ${
                    link.path === activeLink ? 'active' : ''
                  }`}
                  onClick={() => handleNavLinkClick(link.path)}
                >
                  {React.createElement(link.icon, {
                    className: 'h-5 w-5 mr-2',
                  })}
                  {link.text}
                </NavLink>
              ) : (
                <span className="text-blue-700 ">{link.text}</span>
              )}
            </ListItem>
          ))}
        </List>
      </MobileNav>
    </>
  );
};

export default Navbar;
