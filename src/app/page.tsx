import Link from 'next/link';
import Image from 'next/image';
import InPartnership from '@/components/in-partnership';
import TravelDestinations from '@/components/travel-destinations';
import FaqContent from '@/components/faq-content';

export default function Home() {
  return (
    <div className="w-full">
      <div className="relative min-h-[230px] w-full">
        <Image
          src="/imgs/38th-tk-logo.png"
          alt="Discovery Samal Island"
          width={100}
          height={85}
          className="absolute right-2 top-2 z-10 h-auto w-[50px] sm:right-4 sm:top-4 sm:w-[100px]"
          priority={true}
        />
        <Image
          src="/imgs/destinations/samal-island-beach.jpg"
          alt="Discovery Samal Island"
          width={1575}
          height={1278}
          className="h-auto w-full"
          priority={true}
        />

        <div className="absolute -bottom-16 left-1/2 mx-auto w-full max-w-[330px] -translate-x-1/2 transform rounded-2xl bg-white p-3 shadow-lg sm:max-w-3xl sm:p-4">
          <h2 className="mb-1 text-center font-headline text-base font-bold tracking-wide text-[#d14124] sm:text-3xl">
            Discover the Philippines
          </h2>
          <p className="text-center text-xs text-[#d25d1c] sm:text-lg">
            In Celebration of our 38th Anniversary, get a chance to experience
            an esacape with Tapa King's Discover the Philippines: Travel Raffle
            Promo!
          </p>
          <Link
            className="duration-800 mx-auto mt-3 block w-fit animate-bounce rounded-full bg-[#d14124] px-6 py-1 font-headline text-base text-white sm:mt-5 sm:px-8 sm:py-2 sm:text-xl"
            href={'/raffle-form'}
          >
            Join Now
          </Link>
        </div>
      </div>

      <div className="relative w-full pt-20 sm:pt-28">
        <div
          style={{
            backgroundImage: "url('/imgs/border.png')",
            backgroundSize: '100%',
          }}
          className="absolute left-0 top-0 z-10 h-full w-3 bg-cover sm:w-4"
        ></div>
        <div
          style={{
            backgroundImage: "url('/imgs/border.png')",
            backgroundSize: '100%',
          }}
          className="absolute right-0 top-0 z-10 h-full w-3 bg-cover sm:w-4"
        ></div>

        <h2 className="mb-2 text-center font-headline text-lg italic text-[#d14124] sm:mb-4 sm:text-4xl">
          Eat, Explore & Escape with Tapa King
        </h2>
        <p className="mx-auto px-5 text-center text-sm text-[#8a2a2b] sm:max-w-xl sm:text-lg">
          8 Lucky winners will win 3D2N stays (airfare included) in partnership
          with Discovery Hotels & Resorts. <br /> Earn 1 raffle entry for every
          750 dine-in spend.
        </p>

        <InPartnership />

        <TravelDestinations />

        <div className="mt-12 min-h-[300px] w-full bg-[#d14124] p-6 text-white shadow-lg">
          <h2 className="text-center text-xl font-bold text-white">
            Frequently Asked Questions (FAQs)
          </h2>
          <h3 className="text-center text-white">
            Tapa King - Discover the Philippines: The Royal Escape Travel Raffle
          </h3>
          <FaqContent />
        </div>

        {/* Copyright Footer */}
        <footer className="w-full py-6 text-center text-xs text-[#8a2a2b]">
          <Image
            src="/imgs/tk-red.png"
            alt="Tapa King Logo"
            width={100}
            height={26}
            className="mx-auto mb-2 h-auto w-[100px]"
            priority={true}
          />
          <p>Copyright &copy; 2025 Tapa King Inc.</p>
          <p>All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
