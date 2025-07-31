import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';

export default function FormClosePage() {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-gradient-to-b from-[#fff7e6] via-[#f8f8f8] to-[#fff7e6]">
      <div className="flex h-[100px] w-full items-center justify-center bg-[#d14124]">
        <img
          src="/imgs/tk-white.png"
          alt="Tapa King Logo"
          width={200}
          height={50}
          className="h-[50px] w-[200px]"
        />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Card className="relative mx-auto w-full max-w-2xl bg-white/90 shadow-xl">
          <div className="flex flex-col items-center justify-center px-6 py-8">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ffd7d7]">
              <X className="h-8 w-8 text-[#d14124]" />
            </span>
            <h1 className="mb-2 text-center font-headline text-[28px] font-bold leading-[32px] text-[#8a2a2b]">
              Form Closed
            </h1>
            <p className="text-center text-lg text-[#8a2b2b]">
              This form is no longer available for submission.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-[#d14124] px-6 py-3 text-base font-semibold text-white shadow hover:bg-[#b32e1c] transition-colors"
            >
              Go back to Homepage
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
