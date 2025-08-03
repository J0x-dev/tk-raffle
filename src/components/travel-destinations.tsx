import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { destinationsData } from '../data/destinations-data';

interface Destination {
  name: string;
  image: string;
  location: string;
  blurDataURL: string;
  winners: string;
}

export default function TravelDestinations() {
  return (
    <>
      <h2 className="mb-5 mt-16 text-center text-lg font-extrabold text-warm-red sm:text-2xl">
        Major Prizes
      </h2>

      <div className="flex flex-wrap justify-center gap-8 px-5">
        {destinationsData.map((destination: Destination) => (
          <div className="w-[340px] sm:w-[450px]" key={destination.name}>
            <div className="relative aspect-[450/300] overflow-hidden rounded-md bg-white shadow-lg">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                sizes="(max-width: 450px) 100vw, 450px"
                className="object-cover object-center"
                placeholder="blur"
                blurDataURL={destination.blurDataURL}
              />
            </div>
            <div className="mt-1 flex justify-between">
              <div className="text-warm-red">{destination.name}</div>
              <div className="font-extrabold text-warm-red">
                {destination.winners}
              </div>
            </div>
            <div className="flex items-center text-sm text-maroon">
              <MapPin size={14} color="#8a2a2b" className="mb-1 mr-0.5" />
              {destination.location}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
