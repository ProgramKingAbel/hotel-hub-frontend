import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../styles/components/navbar.scss';
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
  // PowerIcon,
  PlusIcon,
  TrashIcon,

} from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { resetUserState, signOutUser } from '../redux/features/users/usersSlice';
import { resetRoomState } from '../redux/features/rooms/roomsSlice';

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
  // {
  //   path: '/register',
  //   text: 'Sign Out',
  //   icon: PowerIcon,
  //   exact: false,
  // },
];

const Navbar = () => {
  const storedUserData = localStorage.getItem('userData');
  const currentUser = JSON.parse(storedUserData);
  const navigate = useNavigate();
  console.log(currentUser);
  const isAdmin = currentUser.role === 'admin';
  const { pathname } = useLocation();
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [activeLink, setActiveLink] = useState(pathname);
  const screen = document.body;
  const dispatch = useDispatch();

  screen.addEventListener('click', (event) => {
    if (openMobileNav && screen.contains(event.target)) {
      const togglerButton = document.querySelector('.toggle_icon');
      if (!togglerButton.contains(event.target)) {
        setOpenMobileNav(false);
      }
    }
  });

  const handleNavLinkClick = (path) => {
    setActiveLink(path);
    setOpenMobileNav(false);
  };

  const toggleMobileNav = () => {
    setOpenMobileNav(!openMobileNav);
  };

  if (!currentUser) {
    return (
      <div>
        Please log in to Continue
        <button type="button" onClick={() => { navigate('/login'); }}>Click here</button>
      </div>
    );
  }

  const handleSignOut = () => {
    dispatch(signOutUser())
      .then((result) => {
        const { payload } = result;
        if (signOutUser.fulfilled.match(result) && payload.status === 200) {
          navigate('/login');
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          dispatch(resetUserState());
          dispatch(resetRoomState());
        }
      });
  };

  return (
    <>
      <Card className="h-screen w-1/4 xl:w-1/5 md:w-1/5 lg:w-1/6 p-2 gap-5 hidden md:flex rounded-none navbar">
        <h2 className="mt-3 ml-4 nav_brand">
          <Typography variant="h3" color="black" className="font-semibold mb-4">
            Hotel Hub
          </Typography>
        </h2>

        <List>
          {links.map((link) => (
            (isAdmin || (link.text !== 'Add Room' && link.text !== 'Delete Room')) && (
            <ListItem key={link.text} className="mb-2 ml-4 list">
              {pathname !== '/' ? (
                <NavLink
                  exact={link.exact}
                  to={link.path}
                  className={`flex items-center p-2 text-lg rounded-none ${
                    link.path === activeLink ? 'bg-blue-500' : ''
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
            )))}
        </List>
        <button onClick={handleSignOut} type="button">Sign Out</button>
      </Card>

      <IconButton
        variant="text"
        className="ml-auto h-6 w-6 text-inherit text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden toggle_icon absolute top-4 right-4"
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
            className="toggler_icon"
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

      <MobileNav
        open={openMobileNav}
        onClose={() => setOpenMobileNav(false)}
        className="h-screen w-50 p-4 gap-8 md:flex rounded-none absolute top-0 left-0 mobile_nav"
        style={{
          backgroundColor: 'rgba(100, 100, 100, 0.9)',
          zIndex: 1000,
        }}
      >
        <List>
          {links.map((link) => (
            (isAdmin || (link.text !== 'Add Room' && link.text !== 'Delete Room')) && (
            <ListItem key={link.text}>
              {pathname !== '/' ? (
                <NavLink
                  to={link.path}
                  className={`flex items-center items${
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
                <span>{link.text}</span>
              )}
            </ListItem>
            )))}
        </List>
        <button onClick={handleSignOut} type="button">Sign Out</button>
      </MobileNav>
    </>
  );
};

export default Navbar;
