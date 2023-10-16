import Image from 'next/image';

export default function Heroes() {
  return (
    <div className="flex max-w-5xl flex-col items-center justify-center">
      <div className="flex items-center">
        <div className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]">
          <Image
            fill
            priority
            alt="Documents"
            src="/documents.png"
            className="object-contain dark:hidden"
          />
          <Image
            fill
            priority
            alt="Documents"
            src="/documents-dark.png"
            className="hidden object-contain dark:block"
          />
        </div>

        <div className="relative hidden h-[400px] w-[400px] md:block">
          <Image
            fill
            priority
            alt="Reading"
            src="/reading.png"
            className="object-contain dark:hidden"
          />
          <Image
            fill
            priority
            alt="Reading"
            src="/reading-dark.png"
            className="hidden object-contain dark:block"
          />
        </div>
      </div>
    </div>
  );
}
