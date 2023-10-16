'use client';

import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

export default function Error() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-y-4">
      <Image
        priority
        src="/error.png"
        height={300}
        width={300}
        alt="Error"
        className="dark:hidden"
      />
      <Image
        priority
        src="/error-dark.png"
        height={300}
        width={300}
        alt="Error"
        className="hidden dark:block"
      />

      <h2 className="text-xl font-medium">
        Something went wrong!
      </h2>

      <Button asChild>
        <Link href="/documents">
          Go back
        </Link>
      </Button>
    </div>
  )
}
