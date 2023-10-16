'use client';

import { useQuery } from 'convex/react';

import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import Toolbar from '@/components/toolbar';
import Cover from '@/components/cover';

type DocumentIdPageProps = {
  params: {
    documentId: Id<'documents'>
  }
};

export default function DocumentIdPage({ params: { documentId } }: DocumentIdPageProps) {
  const document = useQuery(api.documents.getById, { documentId });

  // Loading state
  if (document === undefined) {
    return (
      <div>
        Loading...
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
      </div>
    </div>
  );
}
