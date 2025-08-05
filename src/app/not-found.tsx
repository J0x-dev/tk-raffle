import Link from 'next/link';
import HeaderContent from '@/components/header-content';
import FooterContent from '@/components/footer-content';

export default function NotFound() {
  return (
    <>
      <HeaderContent />

      <main className="flex min-h-[calc(100dvh-215px)] flex-col items-center justify-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <p className="text-xl text-gray-600">Oops! Page not found.</p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-warm-red px-6 py-3 text-base font-semibold text-white shadow transition-colors hover:bg-[#b32e1c]"
        >
          Go back to Homepage
        </Link>
      </main>

      <FooterContent />
    </>
  );
}
