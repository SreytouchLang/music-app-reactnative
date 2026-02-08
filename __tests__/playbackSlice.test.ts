import reducer, { setQueue, setCurrent, next, prev } from '@/state/playbackSlice';
import { trackA, trackB } from '@/tests/fixtures';

describe('playbackSlice', () => {
  it('sets queue and default current', () => {
    const state = reducer(undefined, setQueue([trackA, trackB]));
    expect(state.queue).toHaveLength(2);
    expect(state.currentId).toBe(trackA.id);
  });

  it('next/prev navigates queue', () => {
    let state = reducer(undefined, setQueue([trackA, trackB]));
    state = reducer(state, next());
    expect(state.currentId).toBe(trackB.id);
    state = reducer(state, prev());
    expect(state.currentId).toBe(trackA.id);
  });

  it('setCurrent overrides current', () => {
    const state = reducer(undefined, setCurrent(trackB.id));
    expect(state.currentId).toBe(trackB.id);
  });
});
