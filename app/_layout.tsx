import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { store } from '@/state/store';
import { AppErrorBoundary } from '@/services/telemetry/AppErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1, refetchOnWindowFocus: false } },
});

export default function RootLayout() {
  return (
    <AppErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerTitleAlign: 'center' }} />
        </QueryClientProvider>
      </Provider>
    </AppErrorBoundary>
  );
}
