export default function ConsolationPrize() {
  return (
    <div className="mx-auto mt-8 flex min-h-20 w-[310px] gap-2 rounded-2xl bg-warm-red p-2 sm:mt-12 sm:w-[450px]">
      <div className="flex h-[65px] w-[70px] flex-col items-center justify-center rounded-xl border-2 border-white pt-2 sm:h-[85px] sm:w-[90px] sm:pt-3">
        <h2 className="text-[45px] font-extrabold leading-[32px] -tracking-wide text-white sm:text-[58px] sm:leading-[38px]">
          38
        </h2>
        <h3 className="text-sm leading-[16px] text-white sm:text-base">
          WINNERS
        </h3>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center pt-1 sm:pt-0">
        <h2 className="text-center text-[22px] font-extrabold leading-[20px] text-white sm:text-3xl">
          Consolation Prize
        </h2>
        <h3 className="text-center text-lg text-white sm:text-2xl">
          Gift Box &amp; Gift Certificates
        </h3>
      </div>
    </div>
  );
}
