import { configureStore } from '@reduxjs/toolkit';
import playbackReducer from './playbackSlice';
import libraryReducer from './librarySlice';
import downloadsReducer from './downloadsSlice';

export const store = configureStore({
  reducer: {
    playback: playbackReducer,
    library: libraryReducer,
    downloads: downloadsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
