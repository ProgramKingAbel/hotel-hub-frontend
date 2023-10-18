import React, { useState, useEffect } from 'react';
import {
  Card, Input, Button, Typography,
} from '@material-tailwind/react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { fetchRooms } from '../redux/features/rooms/roomsSlice';
import {
  createReservation,
  updateReservationStatus,
} from '../redux/features/reservations/reservationsSlice';
import 'react-datepicker/dist/react-datepicker.css';

const ReservationForm = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room.rooms);
  const storedUserData = localStorage.getItem('userData');
  const currentUser = JSON.parse(storedUserData);
  const navigate = useNavigate();
  const { roomId } = useParams();
  const error = useSelector((state) => state.reservations.error);
  const [formData, setFormData] = useState({
    username: currentUser.name,
    room: roomId || '',
    check_in: new Date(),
    check_out: new Date(),
  });

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkInISO = formData.check_in.toISOString();
    const checkOutISO = formData.check_out.toISOString();

    const requestData = {
      check_in: checkInISO,
      check_out: checkOutISO,
      room_id: formData.room,
    };
    dispatch(createReservation(requestData)).then((result) => {
      const { payload } = result;
      if (createReservation.fulfilled.match(result)) {
        dispatch(
          updateReservationStatus(
            payload.status === 'Success' ? 'success' : 'failed',
          ),
        );
        if (payload.message === 'Reservation created successfully') {
          navigate('/app/Profile');
        }
      }
    });
  };

  return (
    <div className="md:container w-full flex justify-center reservation_form_container">
      <div className="inner_reservation">
        <Typography variant="h4" color="blue-gray" className="text-center">
          Room Reservation
        </Typography>
        {error && (
        <p className="error-message w-80 text-red-500">
          {error}
          {' '}
        </p>
        )}

        <Card color="transparent" shadow={false}>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Username"
                value={formData.username}
                onChange={handleInputChange}
                disabled
              />
              <div className="mt-3">
                <select
                  name="room"
                  value={formData.room}
                  onChange={handleInputChange}
                  disabled={!!roomId}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-black-800 focus:outline-none"
                >
                  <option value="">Select a room</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Check-In Date:</label>
                <DatePicker
                  selected={formData.check_in}
                  name="check_in"
                  onChange={(date) => handleDateChange(date, 'check_in')}
                  className="w-full border border-gray-300 rounded-md p-2 focus:border-black-800"
                />
              </div>
              <div>
                <label>Check-Out Date:</label>
                <DatePicker
                  selected={formData.check_out}
                  name="check_out"
                  onChange={(date) => handleDateChange(date, 'check_out')}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black-800"
                />
              </div>
            </div>

            <Button className="mt-6 reservation_button" fullWidth type="submit">
              Reserve
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ReservationForm;
