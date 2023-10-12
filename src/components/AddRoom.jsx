import React from 'react';
import { useDispatch } from 'react-redux';
import { PlusIcon } from '@heroicons/react/24/solid';
import { addRoom } from '../redux/features/rooms/roomsSlice';

export const AddRoom = () => {
  const dispatch = useDispatch();

  const handleAddRoom = () => {
    const roomData = {
      // Replace with your actual room data
      name: 'New Room',
      capacity: 4,
      // ...
    };
    dispatch(addRoom(roomData));
  };

  return (
    <div>

      <button
        type="submit"
        onClick={handleAddRoom}
        className="flex items-center p-2 text-lg rounded-none"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Add Room
      </button>
    </div>
  );
};

export default AddRoom;
