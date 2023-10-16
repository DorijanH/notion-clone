'use client';

import { useIsMounted } from 'usehooks-ts';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { File } from 'lucide-react';
import { useQuery } from 'convex/react';
import { useUser } from '@clerk/clerk-react';

import useSearch from '@/hooks/use-search';
import { api } from '@/convex/_generated/api';

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';

/**
 * Function representing the SearchCommand component.
 *
 * @returns SearchCommand component
 */
export default function SearchCommand() {
  const router = useRouter();
  const isMounted = useIsMounted();
  const { user } = useUser();
  const { toggle, isOpen, onClose } = useSearch();
  const documents = useQuery(api.documents.getSearch);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    }

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, [toggle]);

  const handleSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  // Preventing hydration errors
  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <CommandInput placeholder={`Search ${user?.fullName}'s Jotion...`} />

      <CommandList>
        <CommandEmpty>No results found 😢</CommandEmpty>

        <CommandGroup heading="Documents">
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
              title={document.title}
              onSelect={() => handleSelect(document._id)}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">
                  {document.icon}
                </p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}

              <span>
                {document.title}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

      </CommandList>
    </CommandDialog>
  );
}
