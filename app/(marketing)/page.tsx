import Heroes from './_components/heroes';
import Heading from './_components/heading';
import Footer from './_components/footer';

export default function MarketingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-y-8 px-6 pb-10 text-center md:justify-start">
        <Heading />

        <Heroes />
      </div>

      <Footer />
    </div>
  );
}