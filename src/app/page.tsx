import Image from 'next/image';
import JumpLink from '@/components/jump-link';
import HeadingText from '@/components/heading-text';
import InPartnership from '@/components/in-partnership';
import TravelDestinations from '@/components/travel-destinations';
import ConsolationPrize from '@/components/consolation-prize';
import FaqContent from '@/components/faq-content';
import FooterContent from '@/components/footer-content';
import { blurSamalIsland } from '@/data/blurData';

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
          priority={true}
          blurDataURL={blurSamalIsland}
        />

        <JumpLink />
      </div>

      <div className="relative w-full pt-24 sm:pt-[140px]">
        <div
          style={{
            backgroundImage: "url('/imgs/border.png')",
            backgroundSize: '100%',
          }}
          className="absolute left-0 top-0 z-10 h-full w-3 sm:w-5"
        ></div>
        <div
          style={{
            backgroundImage: "url('/imgs/border.png')",
            backgroundSize: '100%',
          }}
          className="absolute right-0 top-0 z-10 h-full w-3 sm:w-5"
        ></div>

        <HeadingText />
        <InPartnership />
        <TravelDestinations />
        <ConsolationPrize />
        <FaqContent />
      </div>

      <FooterContent />
    </>
  );
}
