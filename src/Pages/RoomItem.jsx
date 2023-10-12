import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomDetailsById } from "../redux/features/rooms/roomsSlice";

const RoomItem = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const roomDetails = useSelector((state) => state.room.roomDetails);

  useEffect(() => {
    dispatch(fetchRoomDetailsById(roomId));
  }, [dispatch, roomId]);

  return (
    <div className="container mx-auto max-w-screen-xl lg:pl-40 w-full room_container mt-40 bg-slate-900">
      <div
        className="container flex flex-col sm:flex-col md:flex-col lg:flex-row justify-between w-full"
        key={roomDetails.name}>
        <div className="flex-1 lg:flex-grow-2 image_container ">
          <img
            src={roomDetails && roomDetails.image}
            alt={roomDetails.name}
            className="w-full object-cover object-center sm:w-400 sm:h-800"
          />

          <div className="mt-6">
            <button type="button">More Image</button>
          </div>
        </div>
        <div className="flex flex-col justify-center flex-1 lg:flex-grow test_coting ">
          <h1>{roomDetails && roomDetails.name}</h1>
          <p>{roomDetails && roomDetails.description}</p>

          <div className="flex items-center justify-center mt-6">
            <button type="button">Reserve this room</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
