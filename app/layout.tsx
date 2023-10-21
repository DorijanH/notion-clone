import './globals.css';
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

import { EdgeStoreProvider } from '@/lib/edgestore';
import ThemeProvider from '@/components/providers/theme-provider';
import ModalProvider from '@/components/providers/modal-provider';
import ConvexClientProvider from '@/components/providers/convex-provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jotion',
  description: 'The connected workspace where better, faster work happens.',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/icons/logo.svg',
        href: '/icons/logo.svg'
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/icons/logo-dark.svg',
        href: '/icons/logo-dark.svg'
      }
    ]
  }
};

type RootLayoutProps = {
  children: React.ReactNode;
};

/**
 * Function representing the RootLayout component.
 *
 * @returns RootLayout component
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              storageKey="jotion-theme"
            >
              {children}

              <Analytics />
              <ModalProvider />
              <Toaster position="bottom-center" />
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
