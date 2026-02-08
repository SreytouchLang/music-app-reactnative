import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import { Link, useRouter } from 'expo-router';

import { useTrackSearch } from '@/services/api/hooks';
import { styles } from '@/theme/styles';
import { TrackCard } from '@/components/TrackCard';
import { player } from '@/services/player/player';

export default function SearchScreen() {
  const router = useRouter();
  const [q, setQ] = useState('ocean');
  const { data, isLoading, error, refetch } = useTrackSearch(q);

  return (
    <View style={styles.screen}>
      <Text style={styles.h1}>Search</Text>
      <Link href="/" style={styles.link}>← Back</Link>

      <View style={[styles.row, { marginTop: 10 }]}>
        <TextInput value={q} onChangeText={setQ} style={styles.input} placeholder="Search songs/artists" />
        <Pressable style={styles.button} onPress={() => void refetch()}>
          <Text style={styles.buttonText}>Go</Text>
        </Pressable>
      </View>

      {isLoading && <Text style={styles.p}>Loading…</Text>}
      {error && <Text style={styles.error}>Error: {(error as any)?.message ?? 'Unknown'}</Text>}

      <FlatList
        data={data ?? []}
        keyExtractor={(t) => t.id}
        contentContainerStyle={{ paddingVertical: 12, gap: 10 }}
        renderItem={({ item }) => (
          <TrackCard
            track={item}
            onPress={async () => {
              await player.load(item);
              await player.play();
              router.push('/player');
            }}
          />
        )}
      />
    </View>
  );
}
