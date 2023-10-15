'use client';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { MoreHorizontal, Trash } from 'lucide-react';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/clerk-react';

import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type MenuProps = {
  documentId: Id<'documents'>
};

export default function Menu({ documentId }: MenuProps) {
  const router = useRouter();
  const { user } = useUser();

  const archive = useMutation(api.documents.archive);

  const handleArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: 'Moving to trash...',
      success: 'Note moved to trash!',
      error: 'Failed to archive note :('
    });

    router.push('/documents');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={8}
        forceMount
        className="w-60"
      >
        <DropdownMenuItem onClick={handleArchive}>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="p-2 text-xs text-muted-foreground">
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

Menu.Skeleton = function MenuSkeleton() {
  return (
    <Skeleton className="h-10 w-10" />
  );
}
