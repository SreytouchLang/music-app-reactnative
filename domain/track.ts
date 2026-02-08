import { z } from 'zod';

export const TrackSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  artworkUrl: z.string().url().optional().nullable(),
  durationMs: z.number().int().positive(),
  streamUrl: z.string().url(),
});

export type Track = z.infer<typeof TrackSchema>;

export const TrackListSchema = z.array(TrackSchema);
export type TrackList = Track[];

export function formatDuration(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
