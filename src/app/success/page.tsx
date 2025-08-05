'use client';

// @ts-ignore
import Confetti from 'react-confetti';
// @ts-ignore
import { useWindowSize } from 'react-use';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import FooterContent from '@/components/footer-content';
import HeaderContent from '@/components/header-content';

interface SubmissionData {
  fullName: string;
  purchaseAmount: number;
  raffleEntries: number;
}

export default function SuccessPage() {
  const [data, setData] = useState<SubmissionData | null>(null);
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const storedData = sessionStorage.getItem('submissionData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const fullName = data?.fullName || 'Customer';
  const purchaseAmount = data?.purchaseAmount || 0;
  const raffleEntries = data?.raffleEntries || '0';

  return (
    <>
      <HeaderContent />

      <main className="flex min-h-[calc(100dvh-215px)] w-full items-center justify-center p-4">
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            numberOfPieces={300}
            recycle={false}
          />
        )}

        <Card className="h-fit w-full max-w-md rounded-md border text-center shadow-lg">
          <CardHeader className="p-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <div className="mt-4">
              <CardTitle className="text-2xl font-bold text-warm-red">
                Submission Successful!
              </CardTitle>
              <CardDescription className="mt-2 text-base text-maroon">
                Hi <span className="font-bold">{fullName}</span> <br />✨ Thank
                you for joining the Tapa King's Discover the Philippines Travel Raffle Promo! <br/> Based on your recent purchase of{' '}
                <span className="font-bold">{purchaseAmount}</span>, you have
                earned <span className="font-bold">{raffleEntries}</span> raffle
                entries!
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="mb-6 rounded bg-slate-100 p-3 text-left text-sm text-maroon">
              <p className="mb-3">
                🧾 Total Spent:{' '}
                <span className="font-bold">{purchaseAmount}</span>
              </p>
              <p>
                🎟️ Raffle Entries Earned:{' '}
                <span className="font-bold">{raffleEntries}</span>
              </p>
            </div>
            <p className="mb-6 text-sm text-maroon">
              Winners will be announced after the raffle draw. Good luck!
            </p>
            <Link
              href="/"
              className="inline-block rounded-full bg-warm-red px-6 py-3 text-base font-semibold text-white shadow transition-colors hover:bg-[#b32e1c]"
            >
              Go back to Homepage
            </Link>
          </CardContent>
        </Card>
      </main>

      <FooterContent />
    </>
  );
}
