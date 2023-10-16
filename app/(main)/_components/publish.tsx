'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { Check, Copy, Globe } from 'lucide-react';
import { useMutation } from 'convex/react';

import useOrigin from '@/hooks/use-origin';
import { Doc } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

type PublishProps = {
  initialData: Doc<'documents'>
};

export default function Publish({ initialData }: PublishProps) {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const handlePublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true
    })
      .finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: 'Publishing note...',
      success: 'Note published!',
      error: 'Failed to publish note :('
    });
  };

  const handleUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false
    })
      .finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: 'Unpublishing note...',
      success: 'Note unpublished!',
      error: 'Failed to unpublish note :('
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
        >
          Publish
          {initialData.isPublished && (
            <Globe className="ml-2 h-4 w-4 text-sky-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        forceMount
        align="end"
        alignOffset={8}
        className="w-72"
      >
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="h-4 w-4 animate-pulse text-sky-500" />

              <p className="text-xs font-medium text-sky-500">
                This note is live on web.
              </p>
            </div>

            <div className="flex items-center">
              <input
                disabled
                value={url}
                className="h-8 flex-1 truncate rounded-l-md border bg-muted px-2 text-xs"
              />

              <Button
                disabled={copied}
                onClick={handleCopy}
                className="h-8 rounded-l-none"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            <Button
              size="sm"
              disabled={isSubmitting}
              onClick={handleUnpublish}
              className="w-full text-xs"
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="mb-2 h-8 w-8 text-muted-foreground" />

            <p className="mb-2 text-sm font-medium">
              Publish this note
            </p>

            <span className="mb-4 text-xs text-muted-foreground">
              Share your work with others.
            </span>

            <Button
              size="sm"
              disabled={isSubmitting}
              onClick={handlePublish}
              className="w-full text-xs"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
