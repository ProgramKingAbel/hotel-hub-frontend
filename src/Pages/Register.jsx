import React, { useState } from 'react';
import {
  Card, Input, Button, Typography,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  signUpUser,
  updateRegistrationStatus,
} from '../redux/features/users/usersSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    user: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
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

  const handleRegistration = (e) => {
    e.preventDefault();

    dispatch(signUpUser(formData)).then((resultAction) => {
      const { payload } = resultAction;
      if (signUpUser.fulfilled.match(resultAction)) {
        dispatch(
          updateRegistrationStatus(
            payload.status.message === 'User could not be created successfully'
              ? 'failed'
              : 'success',
          ),
        );
        if (
          payload.status.message !== 'User could not be created successfully'
        ) {
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
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center">
          Enter your details to register.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleRegistration}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              name="name"
              autoFocus
              minLength="3"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
            />
            {error && (
              <Typography color="red" className="-mt-3 -mb-3  text-xs font-normal">
                  {error.map((err) => (
                    err === 'Name has already been taken' ? (
                      <p key="name">{err}</p>
                    ) : null
                  ))}
              </Typography>
            )}
            <Input
              type="email"
              size="lg"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {error && (
              <Typography color="red" className="-mt-3 -mb-3  text-xs font-normal">
                  {error.map((err) => (
                    err === 'Email has already been taken' ? (
                      <p key="email">{err}</p>
                    ) : null
                  ))}
              </Typography>
            )}
            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {error && (
              <Typography color="red" className="-mt-3 -mb-3 text-xs font-normal">
                  {error.map((err) => (
                    err === 'Password is too short (minimum is 6 characters)' ? (
                      <p key="password">{err}</p>
                    ) : null
                  ))}
              </Typography>
            )}
            <Input
              type="password"
              size="lg"
              label="Confirm Password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleInputChange}
            />
            {error && (
              <Typography color="red" className="-mt-3 -mb-3  text-xs font-normal">
                  {error.map((err) => (
                    err === 'Password confirmation doesn\'t match Password' ? (
                      <p key="password confirmation">{err}</p>
                    ) : null
                  ))}
              </Typography>
            )}
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?
            {' '}
            <a href="/login" className="font-medium">
              Log In
            </a>
          </Typography>
        </form>
      </div>
    </Card>
  );
};

export default Register;
