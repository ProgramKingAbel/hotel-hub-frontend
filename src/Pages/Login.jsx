import React, { useState } from 'react';
import {
  Card, Input, Button, Typography,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { signInUser, updateLoginStatus } from '../redux/features/users/usersSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    user: {
      email: '',
      password: '',
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      user: {
        ...formData.user,
        [name]: value,
      },
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(signInUser(formData))
      .then((resultAction) => {
        const { payload } = resultAction;
        if (signInUser.fulfilled.match(resultAction)) {
          dispatch(updateLoginStatus(payload.status.message === 'Signed in Successfully' ? 'success' : 'failed'));
          if (payload.status.message === 'Signed in Successfully') {
            navigate('/app');
          }
        }
      });
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="flex justify-center items-center h-screen register"
    >
      <div className="shadow-2xl p-5 bg-white rounded-lg opacity-90">
        <Typography variant="h4" color="blue-gray" className="text-center">
          Log In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center">
          Please enter your credentials to log in.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleLogin}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              type="email"
              size="lg"
              label="Email"
              name="email"
              value={formData.user.email}
              onChange={handleInputChange}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              value={formData.user.password}
              onChange={handleInputChange}
            />
          </div>
          {error && (
            <Typography color="red" className="mt-4 text-center text-xs font-small">
              Invalid credentials. Please check your email and password
            </Typography>
          )}
          <Button className="mt-2" type="submit">Log In</Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don&apos;t have an account?
            {' '}
            <a href="/register" className="font-medium">
              Sign Up
            </a>
          </Typography>
        </form>
      </div>
    </Card>
  );
};

export default Login;
