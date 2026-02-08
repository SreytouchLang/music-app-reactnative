import 'whatwg-fetch';
import '@testing-library/jest-native/extend-expect';

jest.mock('expo-av', () => {
  const actual = jest.requireActual('expo-av');
  return {
    ...actual,
    Audio: {
      Sound: class {
        loadAsync = jest.fn(async () => ({}));
        playAsync = jest.fn(async () => ({}));
        pauseAsync = jest.fn(async () => ({}));
        unloadAsync = jest.fn(async () => ({}));
        setOnPlaybackStatusUpdate = jest.fn();
        setStatusAsync = jest.fn(async () => ({}));
        getStatusAsync = jest.fn(async () => ({ isLoaded: true, isPlaying: false, positionMillis: 0, durationMillis: 100000 }));
      }
    }
  };
});
