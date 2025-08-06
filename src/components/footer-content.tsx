import Image from 'next/image';

export default function FooterContent() {
  return (
    <footer className="flex h-[115px] w-full flex-col items-center justify-center text-center text-xs text-maroon">
      <Image
        src="/imgs/tk-red.webp"
        alt="Tapa King Logo"
        width={100}
        height={25}
        className="mx-auto mb-2 h-auto w-[100px]"
        priority={true}
      />
      <p>Copyright &copy; 2025 Tapa King Inc.</p>
      <p>All rights reserved.</p>
    </footer>
  );
}
