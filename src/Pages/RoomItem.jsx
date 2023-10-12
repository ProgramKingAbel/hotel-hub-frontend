import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-tailwind/react';
import { fetchRoomDetailsById } from '../redux/features/rooms/roomsSlice';
import Table from '../components/Table/Table';

const RoomItem = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const roomDetails = useSelector((state) => state.room.roomDetails);

  const TABLE_HEAD = ['Available Free packages'];

  const TABLE_ROWS = [
    {
      name: 'Free Wifi',
    },
    {
      name: 'Free Breakfast',
    },
    {
      name: "65'HDTV",
    },
    {
      name: 'Air Conditioning',
    },
  ];

  useEffect(() => {
    dispatch(fetchRoomDetailsById(roomId));
  }, [dispatch, roomId]);

  return (
    <div className="container mx-auto max-w-screen-xl lg:pl-40 w-full room_container mt-20 bg-slate-900">
      <div
        className="container flex flex-col sm:flex-col md:flex-col lg:flex-row justify-between texts-center lg:gap-20 w-full"
        key={roomDetails.name}
      >
        <div className="flex-9 lg:flex-grow-9 image_container">
          <img
            src={roomDetails && roomDetails.image}
            alt={roomDetails.name}
            className="h-96 w-full object-cover object-center sm:w-400 sm:h-800"
          />
          <div className="mt-6">
            <button type="button">More Image</button>
          </div>
        </div>
        <div className="flex-1 lg:flex-grow text_container sm:w-1/5 lg:w-full">
          <Typography variant="h3">
            {roomDetails && roomDetails.name}
          </Typography>
          <p className="desc">{roomDetails && roomDetails.description}</p>
          <p className="price">
            $
            {roomDetails && roomDetails.price}
          </p>

          <div className="mt-6">
            <Table tablehead={TABLE_HEAD} tablerows={TABLE_ROWS} />
          </div>
          <div className="flex items-center justify-center mt-6">
            <button type="button">Reserve this room</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
