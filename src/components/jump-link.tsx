import Link from 'next/link';

export default function JumpLink() {
  return (
    <div className="absolute -bottom-16 left-1/2 z-20 w-[calc(100%-70px)] -translate-x-1/2 rounded-2xl bg-white p-3 text-warm-red shadow-lg sm:max-w-3xl sm:p-4 md:max-w-3xl md:px-6">
      <h2 className="text-center text-xl font-extrabold sm:text-3xl">
        Discover the Philippines
      </h2>
      <p className="mt-2 text-center text-base text-warm-orange sm:text-xl">
        In celebration of our 38th Anniversary, get a chance to experience an
        escape with Tapa King's{' '}
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
  );
}
