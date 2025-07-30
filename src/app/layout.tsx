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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="font-body antialiased">
        <div className="flex h-[100px] w-full items-center justify-center bg-[#d14124]">
          <Image
            src="/imgs/tk-white.png"
            alt="Tapa King Logo"
            width={200}
            height={50}
            className="h-[50px] w-[200px]"
            priority
          />
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
