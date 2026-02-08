import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, paddingTop: 22 },
  h1: { fontSize: 26, fontWeight: '800', marginBottom: 6 },
  h2: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  p: { fontSize: 15, opacity: 0.85, marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  input: {
    flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 15
  },
  button: { borderWidth: 1, borderColor: '#222', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10 },
  buttonText: { fontWeight: '700' },
  link: { fontSize: 15, color: '#0b5fff' },
  card: { borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 16, padding: 12, gap: 10 },
  cardTitle: { fontSize: 16, fontWeight: '800' },
  cardMeta: { fontSize: 13, opacity: 0.8 },
  error: { color: 'crimson', marginTop: 8 },
  badge: { borderWidth: 1, borderColor: '#ddd', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, alignSelf: 'flex-start' }
});
