import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import HeaderContent from '@/components/header-content';
import FooterContent from '@/components/footer-content';

export default function FormClosePage() {
  return (
    <>
      <HeaderContent />

      <main className="flex flex-1 items-center justify-center">
        <Card className="h-fit relative mx-5 w-full max-w-2xl rounded-xl bg-white/90">
          <div className="flex flex-col items-center justify-center px-6 py-8">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ffd7d7]">
              <X className="h-8 w-8 text-warm-red" />
            </span>
            <h1 className="mb-2 text-center text-[28px] font-bold leading-[32px] text-maroon">
              Form Closed
            </h1>
            <p className="text-center text-lg text-maroon">
              This form is no longer available for submission.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-[#d14124] px-6 py-3 text-base font-semibold text-white shadow transition-colors hover:bg-[#b32e1c]"
            >
              Go back to Homepage
            </Link>
          </div>
        </Card>
      </main>

      <FooterContent />
    </>
  );
}
