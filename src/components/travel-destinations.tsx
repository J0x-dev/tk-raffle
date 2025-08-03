import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { destinationsData } from '../data/destinations-data';

interface Destination {
  name: string;
  image: string;
  location: string;
  winners: string;
}

export default function TravelDestinations() {
  return (
    <div className="mt-16 flex flex-wrap justify-center gap-8 px-5">
      {destinationsData.map((destination: Destination) => (
        <div className="w-[340px] sm:w-[450px]" key={destination.name}>
          <div className="relative aspect-[450/300] overflow-hidden rounded-md bg-white shadow-lg">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              sizes="(max-width: 450px) 100vw, 450px"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="mt-1 flex justify-between">
            <div className="text-warm-red">{destination.name}</div>
            <div className="text-warm-red font-extrabold">
              {destination.winners}
            </div>
          </div>
          <div className="text-maroon flex items-center text-sm">
            <MapPin size={14} color="#8a2a2b" className="mr-0.5 mb-1" />
            {destination.location}
          </div>
        </div>
      ))}
    </div>
  );
}
