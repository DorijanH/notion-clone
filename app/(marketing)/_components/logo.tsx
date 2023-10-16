import Image from 'next/image';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600']
});

/**
 * Function representing the Logo component.
 *
 * @returns Logo component
 */
export default function Logo() {
  return (
    <div className="hidden items-center gap-x-2 md:flex">
      <Image
        src="/icons/logo.svg"
        height={40}
        width={40}
        alt="Logo"
        className="dark:hidden"
      />
      <Image
        src="/icons/logo-dark.svg"
        height={40}
        width={40}
        alt="Logo"
        className="hidden dark:block"
      />

      <p className={cn('font-semibold', poppins.className)}>
        Jotion
      </p>
    </div>
  );
}
