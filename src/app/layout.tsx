'use client';

import * as React from 'react';
import type { Viewport } from 'next';

import '@/styles/global.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <LocalizationProvider>
          <AntdRegistry>
            <GoogleOAuthProvider clientId="23020782984-pimnbrtmtq2hjmr4eecsm06ddqcq2uj2.apps.googleusercontent.com">
              <QueryClientProvider client={queryClient}>
                <ThemeProvider>{children}</ThemeProvider>
              </QueryClientProvider>
            </GoogleOAuthProvider>
          </AntdRegistry>
        </LocalizationProvider>
      </body>
    </html>
  );
}
