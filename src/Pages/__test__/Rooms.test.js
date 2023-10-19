import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import Rooms from '../Rooms';

const mockStore = configureStore([]);

describe('Rooms Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      room: {
        rooms: [],
        error: null,
      },
    });
  });

  it('renders without errors', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          {' '}
          <Rooms />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('renders without errors', () => {
    const navigate = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Rooms navigate={navigate} />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Rooms />
        </BrowserRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
