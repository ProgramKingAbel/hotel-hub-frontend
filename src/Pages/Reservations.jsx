import React from 'react';
import { Card, CardBody } from '@material-tailwind/react';
import { ReservationForm } from '../components';

const Reservations = () => (
  <div className="md:container w-full reservation_container flex justify-center">
    <Card className="mt-6 w-98 p-5">
      <CardBody className="py-6">
        <ReservationForm />
      </CardBody>
    </Card>
  </div>
);

export default Reservations;
