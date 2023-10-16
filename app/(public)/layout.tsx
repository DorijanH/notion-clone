type PublicLayoutProps = {
  children: React.ReactNode;
};

/**
 * Function representing the PublicLayout component.
 *
 * @returns PublicLayout component
 */
export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-full dark:bg-[#1F1F1F]">
      {children}
    </div>
  );
}
