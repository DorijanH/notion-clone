import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

import { Button } from './ui/button';

/**
 * Function representing the ModeToggle component.
 *
 * @returns ModeToggle component
 */
export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="rotate-0 scale-100 text-black transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}