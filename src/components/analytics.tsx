'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GA_TRACKING_ID = 'G-YDLTRXCFVB'; // Replace with your real GA Measurement ID

// Function to send a pageview event to Google Analytics
function pageview(url: string) {
  window.gtag?.('config', GA_TRACKING_ID, {
    page_path: url,
  });
}

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.gtag) return;
    pageview(pathname);
  }, [pathname]);

  return null;
}
