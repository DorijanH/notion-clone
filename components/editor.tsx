'use client';

import { useTheme } from 'next-themes';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';

import '@blocknote/core/style.css';
import { useEdgeStore } from '@/lib/edgestore';

type EditorProps = {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export default function Editor(props: EditorProps) {
  const {
    onChange,
    editable,
    initialContent
  } = props;

  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleupload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });

    return response.url;
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleupload
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  );
}
