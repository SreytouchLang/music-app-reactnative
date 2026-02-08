import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TrackCard } from '@/components/TrackCard';
import { trackA } from '@/tests/fixtures';

describe('TrackCard', () => {
  it('renders and handles press', () => {
    const onPress = jest.fn();
    const { getByText } = render(<TrackCard track={trackA} onPress={onPress} />);
    expect(getByText('A Song')).toBeTruthy();
    fireEvent.press(getByText('A Song'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
