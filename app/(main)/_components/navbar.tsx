'use client';

import { notFound, useParams } from 'next/navigation';
import { MenuIcon } from 'lucide-react';
import { useQuery } from 'convex/react';

import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';

import Title from './title';
import Publish from './publish';
import Menu from './menu';
import Banner from './banner';

type NavbarProps = {
  isCollapsed: boolean;
  handleResetWidth: () => void;
};

export default function Navbar(props: NavbarProps) {
  const {
    isCollapsed,
    handleResetWidth
  } = props;

  const params = useParams();
  const document = useQuery(api.documents.getById, { documentId: params.documentId as Id<'documents'> })

  // Loading state
  if (document === undefined) {
    return (
      <nav className="flex w-full items-center justify-between bg-background px-3 py-2 dark:bg-[#1F1F1F]">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  // Not found
  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="flex w-full items-center gap-x-4 bg-background px-3 py-2 dark:bg-[#1F1F1F]">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={handleResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}

        <div className="flex w-full items-center justify-between">
          <Title initialData={document} />

          <div className="flex items-center gap-x-2">
            <Publish initialData={document} />
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>

      {document.isArchived && (
        <Banner documentId={document._id} />
      )}
    </>
  );
}
