'use client';

import Link from "next/link";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { destinationsData, sponsorLogos } from "@/components/destinations-data";

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <div className="max-w-5xl w-full">
      <div className="relative w-full min-h-[230px]">
        <Image
          src="/imgs/destinations/samal-island-beach.jpg"
          alt="Discovery Samal Island"
          width={1575}
          height={1278}
          className="w-full h-auto"
          priority={true}
        />
        <Image
          src="/imgs/38th-tk-logo.png"
          alt="Discovery Samal Island"
          width={50}
          height={43}
          className="w-[50px] h-auto absolute top-2 right-2 sm:top-4 sm:right-4 z-10 sm:w-[70px]"
          priority={true}
        />
        <div className="w-full max-w-[90%] sm:max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-3 sm:p-4 absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <h2 className="text-center font-headline text-base sm:text-xl font-bold text-[#d14124] tracking-wide mb-1">Discover the Philippines</h2>
          <p className="text-xs sm:text-sm text-center text-[#d25d1c]">
            In Celebration of our 38th Anniversary, get a chance to experience an esacape with Tapa King's Discover the Philippines: Travel Raffle Promo!
          </p>
          <Link className="font-headline bg-[#d14124] rounded-full py-1 px-6 text-base sm:text-lg mt-2 text-white mx-auto block w-fit" href={'/raffle-form'}>Join Now</Link>
        </div>
      </div>

      <h2 className="text-center font-headline italic text-[#d14124] text-lg mt-20 mb-2 sm:mb-4 sm:text-2xl sm:mt-24">Eat, Explore & Escape with Tapa King</h2>
      <p className="sm:max-w-xl mx-auto text-[#8a2a2b] text-center text-sm sm:text-base px-4">
        8 Lucky winners will win 3D2N stays (airfare included) in partnership with Discovery Hotels & Resorts. Earn 1 raffle entry for every 750 dine-in spend.
      </p>

      <h2 className="text-center text-gray-600 text-sm sm:text-base my-10 mb-3 sm:mb-5">In partnership with</h2>

      {isMobile ? (<div className="px-4 max-w-lg mx-auto">
        <div className="grid grid-cols-3 gap-6 mb-4">
          {sponsorLogos.slice(0, 3).map((logo) => (
            <div key={logo.alt} className="flex justify-center items-center relative h-[60px]">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={60}
                className="object-contain"
                priority={true}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 px-6">
          {sponsorLogos.slice(3).map((logo) => (
            <div key={logo.alt} className="flex justify-center items-center relative h-[60px]">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
                className="object-contain"
                priority={true}
              />
            </div>
          ))}
        </div>
      </div>) : <div className="flex justify-center items-center gap-8">
        {sponsorLogos.map((logo) => (
          <div key={logo.alt} className="flex justify-center items-center relative w-[140px] h-auto">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={94}
              className="object-contain"
              priority={true}
            />
          </div>
        ))}
      </div>}

      <div className="flex flex-wrap gap-8 justify-center mt-10">
        {destinationsData.map((destination) => (
          <div className="w-[330px] sm:w-[450px]" key={destination.name}>
            <Image
              src={destination.image}
              alt={destination.name}
              width={450}
              height={300}
              className="w-[330px] sm:w-[450px] h-[203px] sm:h-[300px] object-cover rounded-md shadow-lg"
              priority={true}
            />
            <div className="flex justify-between mt-1">
              <div className="text-[#d14124]">{destination.name}</div>
              <div className="text-[#8a2a2b]">{destination.winners}</div>
            </div>
            <p className=" text-[#8a2a2b]">{destination.location}</p>
          </div>
        ))}
      </div>

        <div className="w-full min-h-[300px] max-w-3xl mt-12 mx-auto p-6">
          <h2 className="text-center text-[#8a2a2b] text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="bg-white rounded-2xl shadow p-4">
            <details className="mb-4">
              <summary className="cursor-pointer font-semibold text-[#8a2a2b] py-2">What is the promo period?</summary>
              <div className="mt-2 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim.</div>
            </details>
            <details className="mb-4">
              <summary className="cursor-pointer font-semibold text-[#8a2a2b] py-2">How do I join the raffle?</summary>
              <div className="mt-2 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim.</div>
            </details>
            <details>
              <summary className="cursor-pointer font-semibold text-[#8a2a2b] py-2">Who can participate?</summary>
              <div className="mt-2 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim.</div>
            </details>
          </div>
        </div>
    </div>
  );
}
