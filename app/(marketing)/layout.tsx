import Navbar from './_components/navbar';

type MarketingLayoutProps = {
  children: React.ReactNode;
}

/**
 * Function representing the MarketingLayout component.
 *
 * @returns MarketingLayout component
 */
export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <Navbar />

      <main className="h-full pt-40">
        {children}
      </main>
    </div>
  );
}
