import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import FaqContent from '@/components/faq-content';
import { destinationsData, sponsorLogos } from '@/components/destinations-data';

export default function Home() {
  return (
    <div className="w-full max-w-5xl">
      <div className="relative min-h-[230px] w-full sm:min-h-[400px]">
        <Image
          src="/imgs/38th-tk-logo.png"
          alt="Discovery Samal Island"
          width={50}
          height={43}
          className="absolute right-2 top-2 z-10 h-auto w-[50px] sm:right-4 sm:top-4 sm:w-[70px]"
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

        <div className="absolute -bottom-16 left-1/2 mx-auto w-full max-w-[330px] -translate-x-1/2 transform rounded-2xl bg-white p-3 shadow-lg sm:max-w-xl sm:p-4">
          <h2 className="mb-1 text-center font-headline text-base font-bold tracking-wide text-[#d14124] sm:text-xl">
            Discover the Philippines
          </h2>
          <p className="text-center text-xs text-[#d25d1c] sm:text-sm">
            In Celebration of our 38th Anniversary, get a chance to experience
            an esacape with Tapa King's Discover the Philippines: Travel Raffle
            Promo!
          </p>
          <Link
            className="duration-800 mx-auto mt-3 block w-fit animate-bounce rounded-full bg-[#d14124] px-6 py-1 font-headline text-base text-white sm:text-lg"
            href={'/raffle-form'}
          >
            Join Now
          </Link>
        </div>
      </div>

      <div className="relative w-full pt-20 sm:pt-24">
        <div
          style={{
            backgroundImage: "url('/imgs/border.png')",
            backgroundSize: '100%',
          }}
          className="absolute left-0 top-0 z-10 h-full w-3 bg-cover"
        ></div>
        <div
          style={{
            backgroundImage: "url('/imgs/border.png')",
            backgroundSize: '100%',
          }}
          className="absolute right-0 top-0 z-10 h-full w-3 bg-cover"
        ></div>

        <h2 className="mb-2 text-center font-headline text-lg italic text-[#d14124] sm:mb-4 sm:text-2xl">
          Eat, Explore & Escape with Tapa King
        </h2>
        <p className="mx-auto px-5 text-center text-sm text-[#8a2a2b] sm:max-w-xl sm:text-base">
          8 Lucky winners will win 3D2N stays (airfare included) in partnership
          with Discovery Hotels & Resorts. <br /> Earn 1 raffle entry for every
          750 dine-in spend.
        </p>

        <h2 className="my-12 mb-3 text-center text-sm sm:text-base">
          In partnership with
        </h2>

        <div className="grid grid-cols-3 grid-rows-2 items-center justify-items-center gap-8 px-6 sm:px-7 md:grid-cols-5 md:grid-rows-1">
          {sponsorLogos.map((logo, index) => {
            if (index === 3 || index === 4) return null;

            return (
              <div
                key={logo.alt}
                className="relative flex h-[60px] w-auto items-center justify-center sm:h-auto sm:w-[140px]"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={94}
                  className="h-full w-auto"
                  priority={true}
                />
              </div>
            );
          })}

          {/* Mobile-only bottom row wrapper for logos 4 and 5 */}
          <div className="col-span-3 row-start-2 flex justify-center gap-8 md:hidden">
            {sponsorLogos.slice(3).map((logo) => (
              <div
                key={logo.alt}
                className="relative flex h-[60px] w-auto items-center justify-center sm:h-auto sm:w-[140px]"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={94}
                  className="h-full w-auto"
                  priority={true}
                />
              </div>
            ))}
          </div>

          {/* Desktop rendering of logos 4 and 5 */}
          {[sponsorLogos[3], sponsorLogos[4]].map((logo) => (
            <div
              key={`${logo.alt}-desktop`}
              className="relative hidden h-[60px] w-auto items-center justify-center sm:h-auto sm:w-[140px] md:flex"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={94}
                className="h-full w-auto"
                priority={true}
              />
            </div>
          ))}
        </div>

        <Badge
          variant="secondary"
          className="mx-auto mb-4 mt-12 block w-fit rounded-full px-3 py-1 text-sm font-medium text-[#444] sm:mb-5"
        >
          ✈️ Travel Destinations
        </Badge>
        <div className="flex flex-wrap justify-center gap-8 px-5">
          {destinationsData.map((destination) => (
            <div className="w-[330px] sm:w-[450px]" key={destination.name}>
              <div className="h-[203px] w-[330px] overflow-hidden rounded-md bg-white shadow-lg sm:h-[300px] sm:w-[450px]">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  width={450}
                  height={300}
                  className="h-full w-full object-cover"
                  priority={true}
                />
              </div>
              <div className="mt-1 flex justify-between">
                <div className="text-[#d14124]">{destination.name}</div>
                <div className="font-headline text-[#d14124]">
                  {destination.winners}
                </div>
              </div>
              <div className="flex items-center text-sm text-[#8a2a2b]">
                <MapPin size={14} color="#8a2a2b" className="mb-1 mr-0.5" />
                {destination.location}
              </div>
            </div>
          ))}
        </div>

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
