import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Track } from '@/domain/track';

type State = {
  queue: Track[];
  currentId?: string;
};

const initialState: State = { queue: [], currentId: undefined };

const slice = createSlice({
  name: 'playback',
  initialState,
  reducers: {
    setQueue(state, action: PayloadAction<Track[]>) {
      state.queue = action.payload;
      state.currentId = action.payload[0]?.id;
    },
    setCurrent(state, action: PayloadAction<string | undefined>) {
      state.currentId = action.payload;
    },
    next(state) {
      const idx = state.queue.findIndex(t => t.id === state.currentId);
      const next = idx >= 0 ? state.queue[idx + 1] : undefined;
      state.currentId = next?.id;
    },
    prev(state) {
      const idx = state.queue.findIndex(t => t.id === state.currentId);
      const prev = idx > 0 ? state.queue[idx - 1] : undefined;
      state.currentId = prev?.id;
    },
  },
});

export const { setQueue, setCurrent, next, prev } = slice.actions;
export default slice.reducer;
