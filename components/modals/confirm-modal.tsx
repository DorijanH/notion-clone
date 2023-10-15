'use client';

import React from 'react';

import { AlertDialog, AlertDialogAction, AlertDialogDescription, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

type ConfirmModalProps = {
  children: React.ReactNode;
  onConfirm: () => void;
}

export default function ConfirmModal(props: ConfirmModalProps) {
  const {
    children,
    onConfirm
  } = props;

  const handleConfirm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    onConfirm();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction onClick={handleConfirm}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
