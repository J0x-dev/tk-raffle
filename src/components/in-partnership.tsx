import Image from 'next/image';
import { sponsorLogos } from './destinations-data';

export default function InPartnership() {
  return (
    <>
      <h2 className="my-12 mb-3 text-center text-sm sm:text-lg">
        In partnership with
      </h2>

      <div className="grid grid-cols-3 grid-rows-2 items-center justify-items-center gap-8 px-6 sm:px-20 md:grid-cols-5 md:grid-rows-1">
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
    </>
  );
}
