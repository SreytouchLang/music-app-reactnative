import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DownloadMeta = {
  trackId: string;
  localUri: string;
  title: string;
  artist: string;
};

type State = { items: DownloadMeta[] };

const initialState: State = { items: [] };

const slice = createSlice({
  name: 'downloads',
  initialState,
  reducers: {
    addDownload(state, action: PayloadAction<DownloadMeta>) {
      const exists = state.items.some(d => d.trackId === action.payload.trackId);
      if (!exists) state.items.unshift(action.payload);
    },
    removeDownload(state, action: PayloadAction<string>) {
      state.items = state.items.filter(d => d.trackId !== action.payload);
    },
    clearDownloads(state) {
      state.items = [];
    },
  },
});

export const { addDownload, removeDownload, clearDownloads } = slice.actions;
export default slice.reducer;
