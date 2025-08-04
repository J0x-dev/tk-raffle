'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// GA Tracking ID
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Same as layout

// Pageview tracker
const pageview = (url: string) => {
  window.gtag?.('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.gtag) return;
    pageview(pathname);
  }, [pathname]);

  return null;
}
