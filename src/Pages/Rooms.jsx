import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
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

  const handleRoomClick = (roomId) => {
    history.push(`/room/${roomId}`);
  };

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
        <div key={room.id} onClick={() => handleRoomClick(room.id)}>
          <p>{room.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Rooms;
