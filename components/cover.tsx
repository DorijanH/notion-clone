'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ImageIcon, X } from 'lucide-react';
import { useMutation } from 'convex/react';

import { cn } from '@/lib/utils';
import { useEdgeStore } from '@/lib/edgestore';
import useCoverImage from '@/hooks/use-cover-image';
import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';

import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';

type CoverProps = {
  url?: string;
  preview?: boolean;
}

/**
 * Function representing the Cover component.
 *
 * @returns Cover component
 */
export default function Cover(props: CoverProps) {
  const {
    preview,
    url
  } = props;

  const params = useParams();
  const removeCover = useMutation(api.documents.removeCover);
  const { edgestore } = useEdgeStore();
  const { onReplace: onCoverImageReplace } = useCoverImage();

  const handleRemoveCover = async () => {
    if (url) {
      await edgestore.publicFiles.delete({ url })
    }

    removeCover({
      id: params.documentId as Id<'documents'>
    });
  };

  return (
    <div className={cn(
      'group relative h-[35vh] w-full',
      !url && 'h-[12vh]',
      url && 'bg-muted'
    )}>
      {!!url && (
        <Image
          fill
          src={url}
          alt="Cover"
          className="object-cover"
        />
      )}

      {url && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onCoverImageReplace(url)}
            className="text-xs text-muted-foreground"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Change cover
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleRemoveCover}
            className="text-xs text-muted-foreground"
          >
            <X className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}

/**
 * Function representing the CoverSkeleton component.
 *
 * @returns CoverSkeleton component
 */
Cover.Skeleton = function CoverSkeleton() {
  return (
    <Skeleton className="h-[12vh] w-full" />
  );
}
