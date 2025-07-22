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
            <h1 className="mb-4 text-center font-headline text-[28px] font-bold leading-[32px] text-[#8a2a2b]">
              Form Closed
            </h1>
            <p className="mb-2 text-center text-lg text-[#8a2b2b]">
              This form is no longer accepting submission.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
