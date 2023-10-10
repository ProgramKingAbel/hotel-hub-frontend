import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OwlCarousel from 'react-owl-carousel';
import { fetchRooms } from '../redux/features/rooms/roomsSlice';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import RoomCard from '../components/RoomCard/Room_card';

const Rooms = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room.rooms);
  const isLoading = useSelector((state) => state.room.isLoading);
  const error = useSelector((state) => state.room.error);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
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
    <div className="container mx-auto max-w-screen-xl lg:pl-40 w-full room_container bg-orange-950">
      <div className="text-center flex flex-col items-center">
        <h1 className="font-sans text-4xl font-black lg:text-3xl uppercase">
          Available Rooms
        </h1>
        <h6 className="mb-10 font-serif text-gray-500">
          Please select your rooms to view details
        </h6>
        <hr className="border-t border-gray-300 w-28 text-center line" />
      </div>

      <div className="container text-center flex flex-col items-center w-full">
        <OwlCarousel
          className="owl-theme p-10"
          margin={10}
          dots={false}
          rewind={false}
          nav
          responsive={{
            0: {
              items: 1, // Show 1 item on screens less than 600px wide (typically mobile)
            },
            768: {
              items: 2, // Show 2 items on screens 768px wide and wider (tablets)
            },
            992: {
              items: 3, // Show 3 items on screens 992px wide and wider (small desktop)
            },
            1200: {
              items: 3, // Show 4 items on screens 1200px wide and wider (larger desktop)
            },
          }}
        >
          {rooms.map((room) => (
            <div className="item" key={room.id}>
              <RoomCard
                name={room.name}
                description={room.description}
                image={room.image}
                id={room.id}
              />
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default Rooms;
