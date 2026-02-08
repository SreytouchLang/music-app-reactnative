import React, { useEffect } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';

import { useFeed } from '@/services/api/hooks';
import { TrackCard } from '@/components/TrackCard';
import { PlayerMiniBar } from '@/components/PlayerMiniBar';
import { styles } from '@/theme/styles';
import { useAppDispatch } from '@/state/hooks';
import { setQueue, setCurrent } from '@/state/playbackSlice';
import { player } from '@/services/player/player';

export default function FeedScreen() {
  const router = useRouter();
  const { data, isLoading, error } = useFeed();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.length) dispatch(setQueue(data));
  }, [data, dispatch]);

  return (
    <View style={styles.screen}>
      <Text style={styles.h1}>MusicTube</Text>
      <Text style={styles.p}>A YouTube-style music feed with playback, likes, and offline downloads.</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Link href="/search" style={styles.link}>Search</Link>
        <Link href="/library" style={styles.link}>Library</Link>
      </View>

      {isLoading && <Text style={styles.p}>Loading…</Text>}
      {error && <Text style={styles.error}>Error: {(error as any)?.message ?? 'Unknown'}</Text>}

      <FlatList
        data={data ?? []}
        keyExtractor={(t) => t.id}
        contentContainerStyle={{ paddingBottom: 110, gap: 10 }}
        renderItem={({ item }) => (
          <TrackCard
            track={item}
            right={<Pressable style={styles.badge}><Text>▶</Text></Pressable>}
            onPress={async () => {
              dispatch(setCurrent(item.id));
              await player.load(item);
              await player.play();
              router.push('/player');
            }}
          />
        )}
      />

      <PlayerMiniBar />
    </View>
  );
}
