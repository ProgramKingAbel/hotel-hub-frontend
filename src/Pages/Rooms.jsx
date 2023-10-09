import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRooms } from '../redux/features/rooms/roomsSlice';

const Rooms = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room.rooms);
  const isLoading = useSelector((state) => state.room.isLoading);
  const error = useSelector((state) => state.room.error);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  if (isLoading) {
    return (<div>Loading...</div>);
  }

  if (error) {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  return (
    <div>
      {rooms.map((room) => (
        <p key={room.id}>{room.name}</p>
      ))}
    </div>
  );
};

export default Rooms;
