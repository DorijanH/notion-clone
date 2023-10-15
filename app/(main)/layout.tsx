'use client';

import { redirect } from 'next/navigation';
import { useConvexAuth } from 'convex/react';

import Spinner from '@/components/spinner';
import SearchCommand from '@/components/search-command';

import Navigation from './_components/navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect('/');
  }

  return (
    <div className="flex min-h-full dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="min-h-full flex-1 overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
}
