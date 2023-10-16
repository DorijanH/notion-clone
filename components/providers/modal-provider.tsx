'use client';

import { useIsMounted } from 'usehooks-ts';

import SettingsModal from '../modals/settings-modal';
import CoverImageModal from '../modals/cover-image-modal';

/**
 * Function representing the ModalProvider component.
 *
 * @returns ModalProvider component
 */
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