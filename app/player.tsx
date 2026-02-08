import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';

import { styles } from '@/theme/styles';
import { player, type PlayerState } from '@/services/player/player';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { next, prev } from '@/state/playbackSlice';
import { toggleLike } from '@/state/librarySlice';
import { addDownload } from '@/state/downloadsSlice';
import { downloadTrack } from '@/services/storage/downloads';

export default function PlayerScreen() {
  const [st, setSt] = useState<PlayerState>(player.getState());
  const dispatch = useAppDispatch();

  const queue = useAppSelector(s => s.playback.queue);
  const currentId = useAppSelector(s => s.playback.currentId);
  const liked = useAppSelector(s => s.library.liked);
  const isLiked = useMemo(() => !!st.current && liked.some(t => t.id === st.current?.id), [liked, st.current]);

  useEffect(() => player.subscribe(setSt), []);

  const current = st.current;

  useEffect(() => {
    // keep player loaded when queue navigation changes
    const track = queue.find(t => t.id === currentId);
    if (track && track.id !== current?.id) {
      void (async () => {
        await player.load(track);
        await player.play();
      })();
    }
  }, [queue, currentId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={styles.screen}>
      <Text style={styles.h1}>Player</Text>
      <Link href="/" style={styles.link}>← Back</Link>

      {!current ? (
        <Text style={styles.p}>Nothing playing.</Text>
      ) : (
        <>
          <Text style={styles.cardTitle}>{current.title}</Text>
          <Text style={styles.cardMeta}>{current.artist}</Text>

          <Text style={styles.p}>
            {Math.floor(st.positionMs / 1000)}s / {Math.floor((st.durationMs || current.durationMs) / 1000)}s
          </Text>

          <View style={[styles.row, { marginTop: 6 }]}>
            <Pressable style={styles.badge} onPress={() => dispatch(prev())}>
              <Text>Prev</Text>
            </Pressable>

            <Pressable
              accessibilityLabel="player-play-pause"
              style={styles.badge}
              onPress={() => (st.isPlaying ? player.pause() : player.play())}
            >
              <Text>{st.isPlaying ? 'Pause' : 'Play'}</Text>
            </Pressable>

            <Pressable style={styles.badge} onPress={() => dispatch(next())}>
              <Text>Next</Text>
            </Pressable>
          </View>

          <View style={[styles.row, { marginTop: 10 }]}>
            <Pressable style={styles.badge} onPress={() => current && dispatch(toggleLike(current))}>
              <Text>{isLiked ? 'Unlike' : 'Like'}</Text>
            </Pressable>

            <Pressable
              style={styles.badge}
              onPress={async () => {
                if (!current) return;
                const localUri = await downloadTrack(current);
                dispatch(addDownload({ trackId: current.id, localUri, title: current.title, artist: current.artist }));
              }}
            >
              <Text>Download</Text>
            </Pressable>

            <Pressable style={styles.badge} onPress={() => player.seek(Math.max(0, st.positionMs - 15000))}>
              <Text>-15s</Text>
            </Pressable>

            <Pressable style={styles.badge} onPress={() => player.seek(st.positionMs + 15000)}>
              <Text>+15s</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}
