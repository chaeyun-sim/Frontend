import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RootLayout from '@/components/layout/RootLayout';

import type { AppProps } from 'next/app';

import '@/styles/global.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </QueryClientProvider>
  );
}
