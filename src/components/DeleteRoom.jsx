import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Typography } from '@material-tailwind/react';
import { fetchRooms, destroyRoom } from '../redux/features/rooms/roomsSlice';

const DeleteRoom = () => {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);
  // const status = useSelector((state) => state.room.rooms.status);
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
      if (
        destroyRoom.fulfilled.match(result)
        && payload.message === 'Room successfully deleted'
      ) {
        setRooms((prevRooms) => prevRooms.filter((r) => r.id !== roomId));
      }
    });
  };

  if (error) {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  const TABLE_HEAD = ['ROOM ID', 'NAME', 'DESCRIPTION', 'IMAGE', 'ACTION'];

  return (
    <div>
      <div className="reservation_inner_container flex justify-center">
        <Card className="h-full w-full overflow-scroll rounded-none">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rooms.map((items, index) => {
                const isLast = index === rooms.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={items.id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {items.id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {items.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {items.description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        <img
                          src={items.image}
                          alt={items.name}
                          className="w-20 h-20 object-cover"
                        />
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50 text-center`}>
                      <Button
                        type="button"
                        onClick={() => handleDelete(items.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default DeleteRoom;
