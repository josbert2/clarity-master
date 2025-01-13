'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { IStaticMethods } from 'clarity/flyonui';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export default function FlyonuiScript() {
  const path = usePathname();

  useEffect(() => {
    const loadFlyonui = async () => {
      await import('clarity/flyonui');

      window.HSStaticMethods.autoInit();
    };

    loadFlyonui();
  }, [path]);

  return null;
}
