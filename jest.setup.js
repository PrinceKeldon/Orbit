// Jest setup file
import '@testing-library/jest-native/extend-expect';

// Mock Expo modules
jest.mock('expo-constants', () => ({
  default: {
    manifest: {
      extra: {
        eas: {
          projectId: 'test-id',
        },
      },
    },
  },
}));

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(),
  useSegments: jest.fn(),
  Stack: jest.fn(),
  Tabs: jest.fn(),
}));

// Suppress console warnings in tests
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Non-serializable values were found in the navigation state')
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});
