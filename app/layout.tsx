import './globals.css';
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
              <Toaster position="bottom-center" />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
