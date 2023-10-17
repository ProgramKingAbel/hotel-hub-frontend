// Import the necessary dependencies
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom'; // Add this line
import Rooms from '../Rooms';

// Mock the redux store
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
          {/* Wrap with BrowserRouter */}
          <Rooms />
        </BrowserRouter>
      </Provider>,
    );

    // Your test assertions
  });

  // ...

  it('renders without errors', () => {
    // Mock useNavigate
    const navigate = jest.fn();

    // Render the component with the mock navigate function
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Rooms navigate={navigate} />
        </BrowserRouter>
      </Provider>,
    );

    // Your test assertions
  });

  // Add other test cases as needed

  // Add a snapshot test
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
