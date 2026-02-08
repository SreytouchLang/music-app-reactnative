import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';

import { styles } from '@/theme/styles';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { TrackCard } from '@/components/TrackCard';
import { toggleLike } from '@/state/librarySlice';
import { removeDownload } from '@/state/downloadsSlice';
import { deleteDownloadedTrack } from '@/services/storage/downloads';
import { player } from '@/services/player/player';

export default function LibraryScreen() {
  const router = useRouter();
  const liked = useAppSelector(s => s.library.liked);
  const downloads = useAppSelector(s => s.downloads.items);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.screen}>
      <Text style={styles.h1}>Library</Text>
      <Link href="/" style={styles.link}>← Back</Link>

      <Text style={[styles.h2, { marginTop: 12 }]}>Liked</Text>
      {liked.length === 0 ? <Text style={styles.p}>No likes yet.</Text> : null}
      <FlatList
        data={liked}
        keyExtractor={(t) => t.id}
        contentContainerStyle={{ gap: 10, paddingBottom: 16 }}
        renderItem={({ item }) => (
          <TrackCard
            track={item}
            right={
              <Pressable onPress={() => dispatch(toggleLike(item))} style={styles.badge}>
                <Text>Unlike</Text>
              </Pressable>
            }
            onPress={async () => {
              await player.load(item);
              await player.play();
              router.push('/player');
            }}
          />
        )}
      />

      <Text style={[styles.h2, { marginTop: 6 }]}>Downloads</Text>
      {downloads.length === 0 ? <Text style={styles.p}>No downloads yet.</Text> : null}
      <FlatList
        data={downloads}
        keyExtractor={(d) => d.trackId}
        contentContainerStyle={{ gap: 10, paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.cardMeta} numberOfLines={1}>{item.artist}</Text>
            <Text style={styles.cardMeta} numberOfLines={1}>Saved at: {item.localUri}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
              <Pressable
                onPress={async () => {
                  // play downloaded file
                  await player.load({
                    id: item.trackId,
                    title: item.title,
                    artist: item.artist,
                    artworkUrl: null,
                    durationMs: 180000,
                    streamUrl: item.localUri,
                  });
                  await player.play();
                  router.push('/player');
                }}
                style={styles.badge}
              >
                <Text>Play</Text>
              </Pressable>

              <Pressable
                onPress={async () => {
                  await deleteDownloadedTrack(item.trackId);
                  dispatch(removeDownload(item.trackId));
                }}
                style={styles.badge}
              >
                <Text>Remove</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}
