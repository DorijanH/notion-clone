'use client';

import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

type ConvexClientProviderProps = {
  children: React.ReactNode;
};

/**
 * Function representing the ConvexClientProvider component.
 *
 * @returns ConvexClientProvider component
 */
export default function ConvexClientProvider({ children }: ConvexClientProviderProps) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk
        useAuth={useAuth}
        client={convex}
      >
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}