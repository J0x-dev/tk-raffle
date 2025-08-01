import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { destinationsData } from './destinations-data';

export default function TravelDestinations() {
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-8 px-5">
      {destinationsData.map((destination) => (
        <div className="w-[340px] sm:w-[450px]" key={destination.name}>
          <div className="relative aspect-[450/300] overflow-hidden rounded-md bg-white shadow-lg">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              sizes="(max-width: 450px) 100vw, 450px"
              className="object-cover object-center"
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
  );
}
