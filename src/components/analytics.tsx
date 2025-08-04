'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// ✅ Define your GA tracking ID here
export const GA_TRACKING_ID = 'G-YDLTRXCFVB';

// ✅ Pageview function
const pageview = (url: string) => {
  window.gtag?.('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_TRACKING_ID) return;
    if (!window.gtag) return;

    pageview(pathname);
  }, [pathname]);

  return null;
}
