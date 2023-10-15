'use client';

import { useIsMounted } from 'usehooks-ts';

import SettingsModal from '../modals/settings-modal';

export default function ModalProvider() {
  const isMounted = useIsMounted();

  // Preventing hydration errors
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
    </>
  );
}