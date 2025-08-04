'use client';

import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';

export default function JumpLink() {
  const isMobile = useIsMobile();

  return (
    <div className="absolute -bottom-[72px] left-1/2 z-20 w-[calc(100%-60px)] -translate-x-1/2 rounded-2xl bg-white p-3 text-warm-red shadow-lg sm:-bottom-[95px] sm:max-w-3xl sm:p-6 sm:py-4 md:w-[calc(100%-90px)] md:max-w-3xl md:px-6">
      <h2 className="text-center text-xl font-extrabold sm:mt-1 sm:text-4xl">
        Discover the Philippines
      </h2>
      <p className="mt-2 text-center text-sm leading-[16px] text-warm-orange sm:text-xl">
        In celebration of our 38th Anniversary, get a chance to experience an
        escape
        {!isMobile ? <br /> : ' '}
        with Tapa King's{' '}
        <span className="italic">
          Discover Philippines: Travel Raffle Promo!
        </span>
      </p>
      <Link
        href="/raffle-form"
        className="mx-auto mt-3 block w-fit cursor-pointer rounded-full bg-warm-red px-6 py-1 text-base font-extrabold text-white sm:mt-3 sm:px-8 sm:py-2 sm:text-2xl"
      >
        Join Now
      </Link>
    </div>
  );
}
