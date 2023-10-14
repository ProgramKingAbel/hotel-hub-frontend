import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRooms, destroyRoom } from '../redux/features/rooms/roomsSlice';

const DeleteRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rooms = useSelector((state) => state.room.rooms);
  const status = useSelector((state) => state.room.rooms.status);
  const error = useSelector((state) => state.room.rooms.error);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleDelete = async (roomId) => {
    try {
      await dispatch(destroyRoom(roomId));

      navigate('/app');
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2>Delete a room</h2>
      <table className="min-w-full border border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Room ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td className="border p-2">{room.id}</td>
              <td className="border p-2">{room.name}</td>
              <td className="border p-2">{room.description}</td>
              <td className="border p-2">
                <img src={room.image} alt={room.name} className="w-20 h-20 object-cover" />
              </td>
              <td className="border p-2">
                <button type="button" onClick={() => handleDelete(room.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteRoom;
