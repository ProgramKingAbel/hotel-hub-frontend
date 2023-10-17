import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Button,
  Dialog,
  Card,
  CardBody,
} from '@material-tailwind/react';
import { fetchRoomDetailsById } from '../redux/features/rooms/roomsSlice';
import Table from '../components/Table/Table';
import { ReservationForm } from '../components';

const RoomItem = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const roomDetails = useSelector((state) => state.room.roomDetails);
  const reservationError = useSelector((state) => state.reservations.error);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

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
    <div className="md:container w-full relative room_detail">
      <div
        className="container flex flex-col sm:flex-col md:flex-col lg:flex-row justify-between texts-center lg:gap-20 gap-10 w-full pt-20"
        key={roomDetails.name}
      >
        <div className="flex-9 lg:flex-grow-9 image_container">
          <img
            src={roomDetails && roomDetails.image}
            alt={roomDetails.name}
            className="h-96 w-full object-cover object-center sm:w-400 sm:h-800"
          />
        </div>
        <div className="flex-1 lg:flex-grow text_container sm:w-1/5 md:w-full lg:w-full ">
          <Typography
            variant="h3"
            className="sm:text-left lg:text-right sm:mt-6 lg:mt-0"
          >
            {roomDetails && roomDetails.name}
          </Typography>
          <p className="desc">
            $
            {roomDetails && roomDetails.price}
            {' '}
            {roomDetails && roomDetails.description}
          </p>
          <div className="mt-6 mb-4">
            <Table tablehead={TABLE_HEAD} tablerows={TABLE_ROWS} />
          </div>
        </div>
      </div>

      <div className="absolute  right-30 lg:right-10 bottom-80 lg:bottom-20 reserve_btn">
        <Button
          variant="outlined"
          className="flex items-center gap-3 rounded-full reserve_btn"
          size="lg"
          onClick={handleOpen}
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
          <div className="capitalize">reserve</div>
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

        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[30rem]">
            <CardBody className="flex flex-col gap-4">
              {reservationError && (
                <div>
                  {reservationError.map((error, index) => (
                    <p key={error[index]} className="error-message">
                      {error}
                    </p>
                  ))}
                </div>
              )}
              <ReservationForm />
            </CardBody>
          </Card>
        </Dialog>
      </div>
    </div>
  );
};

export default RoomItem;
