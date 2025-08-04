'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname(); // <-- gets current path, e.g., "/about"

  useEffect(() => {
    if (!window.gtag) return; // make sure gtag is loaded

    // Send a pageview event to GA with the current path
    window.gtag('config', 'G-YDLTRXCFVB', {
      page_path: pathname,
    });
  }, [pathname]); // run this effect every time pathname changes

  return null;
}
