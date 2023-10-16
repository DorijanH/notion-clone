'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation } from 'convex/react';

import { useEdgeStore } from '@/lib/edgestore';
import useCoverImage from '@/hooks/use-cover-image';
import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';

import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { SingleImageDropzone } from '../single-image-dropzone';

export default function CoverImageModal() {
  const params = useParams();
  const update = useMutation(api.documents.update);
  const {
    isOpen: isCoverImageModalOpen,
    onClose: onCloseCoverImageModal
  } = useCoverImage();
  const { edgestore } = useEdgeStore();

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const response = await edgestore.publicFiles.upload({ file });

      await update({
        id: params.documentId as Id<'documents'>,
        coverImage: response.url
      });

      handleClose();
    }
  };

  const handleClose = () => {
    setFile(undefined);
    setIsSubmitting(false);

    onCloseCoverImageModal();
  };

  return (
    <Dialog
      open={isCoverImageModalOpen}
      onOpenChange={onCloseCoverImageModal}
    >
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">
            Cover Image
          </h2>
        </DialogHeader>

        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={handleChange}
        />
      </DialogContent>
    </Dialog>
  )
};