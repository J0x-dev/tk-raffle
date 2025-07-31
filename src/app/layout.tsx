import type { Metadata } from 'next';
import Image from 'next/image';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  title: "Join Tapa King's Discover the Philippines Travel Raffle Promo",
  description: "Eat, Explore, and Escape with Tapa King!",

  openGraph: {
    title: "Join Tapa King's Discover the Philippines Travel Raffle Promo",
    description: "Eat, Explore, and Escape with Tapa King!",
    url: "http://tkdiscoverphraffle.netlify.app/imgs/tk-promo-banner.jpg",
    siteName: "Tapa King",
    images: [
      {
        url: "http://tkdiscoverphraffle.netlify.app/imgs/tk-promo-banner.jpg",
        width: 850,
        height: 1278,
        alt: "Tapa King Discover Philippines Promo Banner",
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },

  twitter: {
    card: "summary_large_image",
    title: "Join Tapa King's Discover the Philippines Travel Raffle Promo",
    description: "Eat, Explore, and Escape with Tapa King!",
    images: ["http://tkdiscoverphraffle.netlify.app/imgs/tk-promo-banner.jpg"],
    site: "@TapaKingPHL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <main className='min-h-screen w-full flex items-center flex-col'>
          {children}
        </main>
        {/* Copyright Footer */}
        {/* <footer className="w-full text-center py-6 text-xs text-[#8a2a2b]">
          &copy; 2025 Tapa King Inc.
        </footer> */}
        <Toaster />
      </body>
    </html>
  );
}
