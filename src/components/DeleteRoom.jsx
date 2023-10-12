import React from 'react';
import { useDispatch } from 'react-redux';
import { TrashIcon } from '@heroicons/react/24/solid';
import { destroyRoom } from '../redux/features/rooms/roomsSlice';

const DeleteRoom = () => {
  const dispatch = useDispatch();

  const handleDeleteRoom = () => {
    dispatch(destroyRoom());
  };

  return (
    <div>
      <button
        type="submit"
        onClick={handleDeleteRoom}
        className="flex items-center p-2 text-lg rounded-none"
      >
        <TrashIcon className="h-5 w-5 mr-2" />
        Delete Room
      </button>
    </div>
  );
};

export default DeleteRoom;
