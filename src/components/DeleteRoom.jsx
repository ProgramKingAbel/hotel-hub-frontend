import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, destroyRoom } from '../redux/features/rooms/roomsSlice';

const DeleteRoom = () => {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);
  const status = useSelector((state) => state.room.rooms.status);
  const error = useSelector((state) => state.room.rooms.error);

  useEffect(() => {
    dispatch(fetchRooms()).then((result) => {
      if (fetchRooms.fulfilled.match(result)) {
        setRooms(result.payload);
      }
    });
  }, [dispatch]);

  const handleDelete = async (roomId) => {
    dispatch(destroyRoom(roomId)).then((result) => {
      const { payload } = result;
      if (destroyRoom.fulfilled.match(result) && payload.message === 'Room successfully deleted') {
        setRooms((prevRooms) => prevRooms
          .filter((r) => r.id !== roomId));
      }
    });
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
