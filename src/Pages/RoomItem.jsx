import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button } from '@material-tailwind/react';
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
    <div className="container mx-auto max-w-screen-xl lg:pl-40 w-full room_container mt-20 bg-slate-900 relative">
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
        <div className="flex-1 lg:flex-grow text_container sm:w-1/5 lg:w-full ">
          <Typography variant="h3" className="text-right">
            {roomDetails && roomDetails.name}
          </Typography>
          <p className="desc">
            -$
            {roomDetails && roomDetails.price}
            {' '}
            {roomDetails && roomDetails.description}
          </p>
          <div className="mt-6 mb-4">
            <Table tablehead={TABLE_HEAD} tablerows={TABLE_ROWS} />
          </div>
        </div>
      </div>

      <div className="absolute right-20">
        <Button
          variant="outlined"
          className="flex items-center gap-3 rounded-full reserve_btn"
          size="lg"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.5em"
              viewBox="0 0 512 512"
              fill="#fff"
              stroke="current"
            >
              <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
            </svg>
          </div>
          Reserve
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.5em"
            viewBox="0 0 512 512"
            fill="#fff"
            stroke="current"
          >
            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default RoomItem;
