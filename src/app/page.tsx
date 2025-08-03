import HeadingText from '@/components/heading-text';
import FaqContent from '@/components/faq-content';
import InPartnership from '@/components/in-partnership';
import TravelDestinations from '@/components/travel-destinations';
import Image from 'next/image';
import Link from 'next/link';
import { blurSamalIsland } from '@/data/blurData';
import FooterContent from '@/components/footer-content';

export default function Home() {
  return (
    <>
      <div className="relative aspect-[3902/1866] w-full">
        <Image
          src="/imgs/38th-tk-logo.png"
          alt="Tapa King Logo"
          width={150}
          height={127}
          className="absolute right-2 top-2 z-10 h-auto w-[60px] flex-shrink-0 sm:right-4 sm:top-4 sm:w-[150px]"
          priority={true}
        />

        <Image
          src="/imgs/discovery-samal-island.jpg"
          alt="Discovery Samal Island"
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL={blurSamalIsland}
        />

        <div className="absolute -bottom-16 left-1/2 z-20 w-[calc(100%-70px)] -translate-x-1/2 rounded-2xl bg-white p-3 text-warm-red shadow-lg sm:max-w-3xl sm:p-4 md:max-w-3xl md:px-6">
          <h2 className="text-center text-base font-extrabold sm:text-3xl">
            Discover the Philippines
          </h2>
          <p className="mt-2 text-center text-xs text-warm-orange sm:text-xl">
            In celebration of our 38th Anniversary, get a chance to experience
            an escape with Tapa King's{' '}
            <span className="italic">
              Discover Philippines: Travel Raffle Promo!
            </span>
          </p>
          <Link
            href="/raffle-form"
            className="duration-800 mx-auto mt-3 block w-fit cursor-pointer rounded-full bg-warm-red px-6 py-1 text-base font-extrabold text-white sm:mt-5 sm:px-8 sm:py-2 sm:text-2xl"
          >
            Join Now
          </Link>
        </div>
      </div>

      <div className="relative w-full pt-24 sm:pt-32">
        <div
          style={{
            backgroundImage: "url('/imgs/border.png')",
            backgroundSize: '100%',
          }}
          className="absolute left-0 top-0 z-10 h-full w-3 bg-cover sm:w-5"
        ></div>
        <div
          style={{
            backgroundImage: "url('/imgs/border.png')",
            backgroundSize: '100%',
          }}
          className="absolute right-0 top-0 z-10 h-full w-3 bg-cover sm:w-5"
        ></div>

        <HeadingText />
        <InPartnership />
        <TravelDestinations />
        <FaqContent />
      </div>

      <FooterContent />
    </>
  );
}
