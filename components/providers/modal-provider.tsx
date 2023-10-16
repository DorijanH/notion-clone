'use client';

import { useIsMounted } from 'usehooks-ts';

import SettingsModal from '../modals/settings-modal';
import CoverImageModal from '../modals/cover-image-modal';

export default function ModalProvider() {
  const isMounted = useIsMounted();

  // Preventing hydration errors
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
}