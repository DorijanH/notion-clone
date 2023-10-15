'use client';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';

import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import ConfirmModal from '@/components/modals/confirm-modal';

type BannerProps = {
  documentId: Id<'documents'>
};

export default function Banner({ documentId }: BannerProps) {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const handleRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: 'Deleting note...',
      success: 'Note deleted!',
      error: 'Failed to delete note :('
    });

    router.push('/documents');
  };

  const handleRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: 'Restoring note...',
      success: 'Note restored!',
      error: 'Failed to restore note :('
    });
  };

  return (
    <div className="flex w-full items-center justify-center gap-x-2 bg-rose-500 p-2 text-center text-sm text-white">
      <p>
        This page is in the Trash.
      </p>

      <Button
        size="sm"
        variant="outline"
        onClick={handleRestore}
        className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
      >
        Restore page
      </Button>

      <ConfirmModal onConfirm={handleRemove}>
        <Button
          size="sm"
          variant="outline"
          className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
}
