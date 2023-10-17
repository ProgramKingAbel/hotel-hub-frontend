import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Table from '../../components/Table/Table';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('RoomItem Component', () => {
  it('renders RoomItem component', () => {
    const tablehead = ['Name', 'Age'];
    const tablerows = [
      { name: 'John Doe', age: 25 },
      { name: 'Jane Doe', age: 30 },
    ];

    render(
      <Provider store={store}>
        <Router>
          <Table tablehead={tablehead} tablerows={tablerows} />
        </Router>
      </Provider>,
    );
  });

  it('matches snapshot', () => {
    const tablehead = ['Name', 'Age'];
    const tablerows = [
      { name: 'John Doe', age: 25 },
      { name: 'Jane Doe', age: 30 },
    ];

    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <Table tablehead={tablehead} tablerows={tablerows} />
        </Router>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
