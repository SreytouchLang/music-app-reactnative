import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Track } from '@/domain/track';

type State = { liked: Track[] };

const initialState: State = { liked: [] };

const slice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<Track>) {
      const id = action.payload.id;
      const exists = state.liked.some(t => t.id === id);
      state.liked = exists ? state.liked.filter(t => t.id !== id) : [action.payload, ...state.liked];
    },
    clearLikes(state) {
      state.liked = [];
    },
  },
});

export const { toggleLike, clearLikes } = slice.actions;
export default slice.reducer;
