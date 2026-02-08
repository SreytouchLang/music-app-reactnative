import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';

import { player, type PlayerState } from '@/services/player/player';
import { styles } from '@/theme/styles';

export function PlayerMiniBar() {
  const [st, setSt] = useState<PlayerState>(player.getState());

  useEffect(() => player.subscribe(setSt), []);

  if (!st.current) return null;

  return (
    <View style={[styles.card, { position: 'absolute', left: 16, right: 16, bottom: 16 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text style={styles.cardTitle} numberOfLines={1}>{st.current.title}</Text>
          <Text style={styles.cardMeta} numberOfLines={1}>{st.current.artist}</Text>
        </View>

        <Pressable
          accessibilityLabel="mini-play-pause"
          onPress={() => (st.isPlaying ? player.pause() : player.play())}
          style={styles.badge}
        >
          <Text>{st.isPlaying ? 'Pause' : 'Play'}</Text>
        </Pressable>

        <Link href="/player" style={[styles.link, { marginLeft: 12 }]}>Open</Link>
      </View>
    </View>
  );
}
