import Image from 'next/image';

export default function HeaderContent() {
  return (
    <div className="flex h-[100px] w-full items-center justify-center bg-warm-red">
      <Image
        src="/imgs/tk-white.png"
        alt="Tapa King Logo"
        width={200}
        height={50}
        className="h-[50px] w-[200px]"
        priority={true}
      />
    </div>
  );
}
