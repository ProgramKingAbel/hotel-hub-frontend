import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomDetailsById } from '../redux/features/rooms/roomsSlice';

const RoomItem = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate function
  const roomDetails = useSelector((state) => state.room.roomDetails);

  useEffect(() => {
    dispatch(fetchRoomDetailsById(roomId));
  }, [dispatch, roomId]);

  const handleReserveClick = () => {
    // Navigate to the "Reserve" page with the roomId parameter
    navigate('./reserve');
  };

  return (
    <div>
      <div key={roomDetails.name}>
        <p>{roomDetails.description}</p>
      </div>
      <button type="button" onClick={handleReserveClick}>Reserve this room</button>
    </div>
  );
};

export default RoomItem;
