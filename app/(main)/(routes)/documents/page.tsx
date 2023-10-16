'use client';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PlusCircle } from 'lucide-react';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/clerk-react';

import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';

export default function DocumentsPage() {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const handleCreate = () => {
    const promise = create({ title: 'Untitled' })
      .then((documentId) => router.push(`/documents/${documentId}`));

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created!',
      error: 'Failed to create a new note :('
    });
  };

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-y-4">
      <Image
        src="/images/empty.png"
        height={300}
        width={300}
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/images/empty-dark.png"
        height={300}
        width={300}
        alt="Empty"
        className="hidden dark:block"
      />

      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Jotion
      </h2>

      <Button onClick={handleCreate}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create a note
      </Button>
    </div>
  );
}
