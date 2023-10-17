import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Table from '../../components/Table/Table'; // Assuming the correct path

// Mock the localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('RoomItem Component', () => {
  it('renders RoomItem component', () => {
    // Sample data for testing
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

  // Add a snapshot test
  it('matches snapshot', () => {
    // Sample data for testing
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
