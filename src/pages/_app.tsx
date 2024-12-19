import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';

import RootLayout from '@/components/layout/RootLayout';

import type { AppProps } from 'next/app';

import '@/styles/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout>
        <Head>
          <title>방방봐</title>
        </Head>
        <Component {...pageProps} />
      </RootLayout>
    </QueryClientProvider>
  );
}
