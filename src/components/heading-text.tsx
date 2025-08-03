'use client';

import { useIsMobile } from '@/hooks/use-mobile';

export default function ExampleText() {
  const isMobile = useIsMobile();

  return (
    <>
      <h2 className="text-warm-red mb-2 text-center text-lg font-extrabold italic sm:mb-4 sm:text-4xl">
        Eat, Explore & Escape with Tapa King
      </h2>

      <p className="text-maroon mx-auto px-5 text-center text-sm sm:max-w-4xl sm:text-2xl">
        8 Lucky winners will win 3D2N stays (airfare included) in partnership
        with Discovery Hotels & Resorts.
        {isMobile ? <br /> : ' '}
        Earn 1 raffle entry for every 750 dine-in spend.
      </p>
    </>
  );
}
