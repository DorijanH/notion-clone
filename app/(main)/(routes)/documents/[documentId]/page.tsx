'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useMutation, useQuery } from 'convex/react';

import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';
import Toolbar from '@/components/toolbar';
import Cover from '@/components/cover';

type DocumentIdPageProps = {
  params: {
    documentId: Id<'documents'>;
  };
};

/**
 * Function representing the DocumentIdPage component.
 *
 * @returns DocumentIdPage component
 */
export default function DocumentIdPage({ params: { documentId } }: DocumentIdPageProps) {
  const Editor = useMemo(() => dynamic(() => import('@/components/editor'), { ssr: false }), []);

  const document = useQuery(api.documents.getById, { documentId });
  const update = useMutation(api.documents.update);

  const handleChange = (content: string) => {
    update({
      id: documentId,
      content
    });
  };

  // Loading state
  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  // Not found
  if (document === null) {
    return (
      <div>
        Not Found
      </div>
    );
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />

      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={document} />

        <Editor
          onChange={handleChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
}
