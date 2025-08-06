import type { Metadata } from 'next';
import Script from 'next/script';
import { Toaster } from '@/components/ui/toaster';
import Analytics from '@/components/analytics';
import './globals.css';

export const metadata: Metadata = {
  title: "Join Tapa King's Discover the Philippines Travel Raffle Promo",
  description: 'Eat, Explore, and Escape with Tapa King!',

  openGraph: {
    title: "Join Tapa King's Discover the Philippines Travel Raffle Promo",
    description: 'Eat, Explore, and Escape with Tapa King!',
    url: 'https://tkdiscoverphraffle.netlify.app/imgs/tk-travel-raffle-promo.jpg',
    siteName: 'Tapa King',
    images: [
      {
        url: 'https://tkdiscoverphraffle.netlify.app/imgs/tk-travel-raffle-promo.jpg',
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
      'https://tkdiscoverphraffle.netlify.app/imgs/tk-travel-raffle-promo.jpg',
    ],
    site: '@TapaKingPHL',
  },
};

const GA_TRACKING_ID = 'G-YDLTRXCFVB';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Load GA script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />

        {/* Init GA */}
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        <main className="flex min-h-dvh w-full flex-col items-center">
          {children}
        </main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
