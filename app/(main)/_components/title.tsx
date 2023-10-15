'use client';

import { useRef, useState } from 'react';
import { useMutation } from 'convex/react';

import { Doc } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type TitleProps = {
  initialData: Doc<'documents'>;
}

export default function Title({ initialData }: TitleProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.documents.update);

  const [title, setTitle] = useState(initialData.title);
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({
      id: initialData._id,
      title: event.target.value || 'Untitled'
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      disableInput();
    };
  };

  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <p>{initialData.icon}</p>}

      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="h-auto p-1 font-normal"
        >
          <span className="truncate">
            {initialData.title}
          </span>
        </Button>
      )}
    </div>
  );
}

Title.Skeleton = function TitleSkeleton() {
  return (
    <Skeleton className="h-4 w-[200px] rounded-md" />
  );
};
