const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;

const axiosMock = {
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
};

export default axiosMock;
