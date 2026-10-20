// jest.setup.js
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Prevent tests from hitting the network. Individual tests can override
// this mock when they need to assert on fetch calls.
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  })
);

// Silence noisy console output during tests while still allowing tests to
// spy on these methods if needed.
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  if (console.error.mockRestore) console.error.mockRestore();
  if (console.warn.mockRestore) console.warn.mockRestore();
  if (console.log.mockRestore) console.log.mockRestore();
});