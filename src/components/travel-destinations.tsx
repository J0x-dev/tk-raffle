import Image from 'next/image';
import { Badge } from './ui/badge';
import { destinationsData } from './destinations-data';
import { MapPin } from 'lucide-react';

export default function TravelDestinations() {
  return (
    <>
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
    </>
  );
}
