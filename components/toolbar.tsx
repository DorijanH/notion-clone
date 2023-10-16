'use client';

import TextareaAutosize from 'react-textarea-autosize';
import React, { ElementRef, useRef, useState } from 'react';
import { ImageIcon, Smile, X } from 'lucide-react';
import { useMutation } from 'convex/react';

import { Doc } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';

import { Button } from './ui/button';
import IconPicker from './icon-picker';

type ToolbarProps = {
  initialData: Doc<'documents'>;
  preview?: boolean;
}

export default function Toolbar(props: ToolbarProps) {
  const {
    initialData,
    preview
  } = props;

  const inputRef = useRef<ElementRef<'textarea'>>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const handleInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || 'Untitled'
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      disableInput();
    }
  };

  const handleIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon
    });
  };

  const handleIconRemove = () => {
    removeIcon({
      id: initialData._id
    });
  };

  return (
    <div className="group relative pl-[54px]">
      {!!initialData.icon && !preview && (
        <div className="group/icon flex items-center gap-x-2 pt-6">
          <IconPicker
            asChild
            onChange={handleIconSelect}
          >
            <p className="text-6xl transition hover:opacity-75">
              {initialData.icon}
            </p>
          </IconPicker>

          <Button
            onClick={handleIconRemove}
            size="icon"
            variant="outline"
            className="rounded-full text-xs text-muted-foreground opacity-0 transition group-hover/icon:opacity-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!!initialData.icon && preview && (
        <p className="pt-6 text-6xl">
          {initialData.icon}
        </p>
      )}

      <div className="flex items-center gap-x-1 py-4 opacity-0 group-hover:opacity-100">
        {!initialData.icon && !preview && (
          <IconPicker
            asChild
            onChange={handleIconSelect}
          >
            <Button
              size="sm"
              variant="outline"
              className="text-xs text-muted-foreground"
            >
              <Smile className="mr-2 h-4 w-4" />
              Add icon
            </Button>
          </IconPicker>
        )}

        {!initialData.coverImage && !preview && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {}}
            className="text-xs text-muted-foreground"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Add cover
          </Button>
        )}
      </div>

      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={handleKeyDown}
          value={value}
          onChange={(e) => handleInput(e.target.value)}
          className="resize-none break-words bg-transparent text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
        />
      ) : (
        <div
          onClick={enableInput}
          className="break-words pb-[11.5px] text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
}
