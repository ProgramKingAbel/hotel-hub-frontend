import React from 'react';
import { render } from '@testing-library/react';
import Reservations from '../Reservations';

jest.mock('../../components/ReservationForm', () => {
  const ReservationForm = () => <div data-testid="reservation-form" />;
  ReservationForm.displayName = 'ReservationForm';
  return ReservationForm;
});

const ReservationsComponent = () => <Reservations />;

describe('Reservations Component', () => {
  test('renders Reservations component', () => {
    const { asFragment } = render(<ReservationsComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
