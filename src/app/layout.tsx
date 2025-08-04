import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import Analytics from '@/components/analytics';
import './globals.css';

export const metadata: Metadata = {
  title: "Join Tapa King's Discover the Philippines Travel Raffle Promo",
  description: 'Eat, Explore, and Escape with Tapa King!',

  openGraph: {
    title: "Join Tapa King's Discover the Philippines Travel Raffle Promo",
    description: 'Eat, Explore, and Escape with Tapa King!',
    url: 'http://tkdiscoverphraffle.netlify.app/imgs/tk-travel-raffle-promo.jpg',
    siteName: 'Tapa King',
    images: [
      {
        url: 'http://tkdiscoverphraffle.netlify.app/imgs/tk-travel-raffle-promo.jpg',
        width: 850,
        height: 1278,
        alt: 'Tapa King Discover the Philippines Promo Banner',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: "Join Tapa King's Discover the Philippines Travel Raffle Promo",
    description: 'Eat, Explore, and Escape with Tapa King!',
    images: [
      'http://tkdiscoverphraffle.netlify.app/imgs/tk-travel-raffle-promo.jpg',
    ],
    site: '@TapaKingPHL',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="flex min-h-screen w-full flex-col items-center">
          {children}
        </main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
