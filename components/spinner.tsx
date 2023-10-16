import { Loader } from 'lucide-react';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const spinnerVariants = cva(
  'animate-spin text-muted-foreground',
  {
    variants: {
      size: {
        default: 'h-4 w-4',
        sm: 'h-2 w-2',
        lg: 'h-6 w-6',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

type SpinnerProps = VariantProps<typeof spinnerVariants>;

/**
 * Function representing the Spinner component.
 *
 * @returns Spinner component
 */
export default function Spinner({ size }: SpinnerProps) {
  return <Loader className={cn(spinnerVariants({ size }))} />;
}
