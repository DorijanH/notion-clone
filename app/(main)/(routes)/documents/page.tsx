'use client';

import Image from 'next/image';
import { PlusCircle } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

import { Button } from '@/components/ui/button';

export default function DocumentsPage() {
  const { user } = useUser();

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-y-4">
      <Image
        src="/empty.png"
        height={300}
        width={300}
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height={300}
        width={300}
        alt="Empty"
        className="hidden dark:block"
      />

      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Jotion
      </h2>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create a note
      </Button>
    </div>
  );
}
