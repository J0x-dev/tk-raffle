export default function consolationPrize() {
  return (
    <div className="mx-auto mt-12 flex min-h-20 w-[calc(100%-40px)] max-w-xl gap-2 rounded-2xl bg-warm-red p-2">
      <div className="flex h-[75px] w-[80px] flex-col items-center justify-center rounded-xl border-2 border-white pt-1.5 sm:h-[85px] sm:w-[90px] sm:pt-2">
        <h2 className="text-[53px] font-extrabold leading-[40px] -tracking-wide text-white sm:text-[58px] sm:leading-[45px]">
          38
        </h2>
        <h3 className="text-base leading-[16px] text-white">WINNERS</h3>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <h2 className="text-center text-2xl text-white sm:text-3xl">
          Consolation Prize
        </h2>
        <h3 className="text-center text-lg text-white sm:text-2xl">
          Gift Box &amp; Gift Certificates
        </h3>
      </div>
    </div>
  );
}
