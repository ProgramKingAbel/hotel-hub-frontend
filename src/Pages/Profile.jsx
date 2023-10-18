import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Typography } from '@material-tailwind/react';
import {
  fetchReservations,
  deleteReservation,
} from '../redux/features/reservations/reservationsSlice';
import Pagination from '../components/Pagination/Pagination';

const Profile = () => {
  const dispatch = useDispatch();
  const [reserved, setReserved] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const visibleItems = reserved.slice(indexOfFirstItem, indexOfLastItem);

  const TABLE_HEAD = ['S/N', 'CHECKING', 'CHECKOUT-OUT', 'ROOM', 'ACTION'];

  useEffect(() => {
    dispatch(fetchReservations()).then((result) => {
      if (fetchReservations.fulfilled.match(result)) {
        setReserved(result.payload);
      }
    });
  }, [dispatch]);

  const handleDeleteReservation = async (reservationId) => {
    dispatch(deleteReservation(reservationId)).then((result) => {
      const { payload } = result;
      if (
        deleteReservation.fulfilled.match(result)
        && payload.message === 'Reservation deleted successfully.'
      ) {
        setReserved((prevReservations) => prevReservations.filter((r) => r.id !== reservationId));
      }
    });
  };

  return (
    <div className="md:container w-full flex justify-center flex-col ">
      <div className="text-center flex flex-col items-center pt-7 mb-3 gap-3">
        <h1 className="text-4xl font-black lg:text-3xl uppercase text-zinc-950">
          Reserved Rooms
        </h1>
        <hr className="border-t border-gray-300 w-28 text-center line" />
      </div>
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
              {visibleItems.map((items, index) => {
                const isLast = index === visibleItems.length - 1;
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
                        {index + 1}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {items.check_in.slice(0, 10)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {items.check_out.slice(0, 10)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {items.room.name}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50 text-center`}>
                      <Button
                        type="button"
                        color="red"
                        onClick={() => handleDeleteReservation(items.id)}
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
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={reserved.length}
        currentPage={currentPage}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};

export default Profile;
