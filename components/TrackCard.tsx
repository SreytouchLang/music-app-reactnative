import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import type { Track } from '@/domain/track';
import { formatDuration } from '@/domain/track';
import { styles } from '@/theme/styles';

type Props = {
  track: Track;
  right?: React.ReactNode;
  onPress?: () => void;
};

export function TrackCard({ track, right, onPress }: Props) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          {track.artworkUrl ? (
            <Image source={{ uri: track.artworkUrl }} style={{ width: 64, height: 64, borderRadius: 14, backgroundColor: '#eee' }} />
          ) : (
            <View style={{ width: 64, height: 64, borderRadius: 14, backgroundColor: '#eee' }} />
          )}

          <View style={{ flex: 1, gap: 4 }}>
            <Text style={styles.cardTitle} numberOfLines={1}>{track.title}</Text>
            <Text style={styles.cardMeta} numberOfLines={1}>{track.artist} • {formatDuration(track.durationMs)}</Text>
          </View>

          {right ? <View>{right}</View> : null}
        </View>
      </View>
    </Pressable>
  );
}
