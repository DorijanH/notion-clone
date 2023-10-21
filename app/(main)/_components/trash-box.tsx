'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Search, Trash, Undo } from 'lucide-react';
import { useMutation, useQuery } from 'convex/react';

import { useEdgeStore } from '@/lib/edgestore';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/spinner';
import ConfirmModal from '@/components/modals/confirm-modal';

/**
 * Function representing the TrashBox component.
 *
 * @returns TrashBox component
 */
export default function TrashBox() {
  const router = useRouter();
  const params = useParams();
  const { edgestore } = useEdgeStore();

  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState('');

  const filteredDocuments = documents?.filter((document) => document.title.toLowerCase().includes(search.toLocaleLowerCase()));

  const handleClick = (documentId: Id<'documents'>) => {
    router.push(`/documents/${documentId}`);
  };

  const handleRestore = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: Id<'documents'>) => {
    event.stopPropagation();

    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: 'Restoring note...',
      success: 'Note restored!',
      error: 'Failed to restore note :('
    });
  };

  const handleRemove = async (document: Doc<'documents'>) => {
    if (document.coverImage) {
      await edgestore.publicFiles.delete({ url: document.coverImage });
    }

    const promise = remove({ id: document._id });

    toast.promise(promise, {
      loading: 'Deleting note...',
      success: 'Note deleted!',
      error: 'Failed to delete note :('
    });

    if (params.documentId === document._id) {
      router.push('/documents');
    }
  };

  // Loading state
  if (documents === undefined) {
    return (
      <div className="flex min-h-full items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 bg-secondary px-2 focus-visible:ring-transparent"
          placeholder="Filter by page title..."
        />
      </div>

      <div className="mt-2 px-1 pb-1">
        <p className="hidden pb-2 text-center text-xs text-muted-foreground last:block">
          No documents found.
        </p>

        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => handleClick(document._id)}
            className="flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5"
          >
            <span className="truncate pl-2">
              {document.title}
            </span>

            <div className="flex items-center">
              <div
                role="button"
                onClick={(e) => handleRestore(e, document._id)}
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>

              <ConfirmModal onConfirm={() => handleRemove(document)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
