'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useCallback, useEffect, useEffectEvent } from 'react';
import { useLenis } from 'lenis/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.clearScrollMemory('manual');
}

export function GSAPScrollTrigger() {
  const handleUpdate = useCallback(() => {
    ScrollTrigger.update();
  }, []);

  const handleRefresh = useEffectEvent(() => {
    ScrollTrigger.refresh();
  });

  const lenis = useLenis(handleUpdate);

  // biome-ignore lint/correctness/useExhaustiveDependencies: handleRefresh is useEffectEvent
  useEffect(() => {
    if (lenis) {
      handleRefresh();
    }
  }, [lenis]);

  return null;
}

export { ScrollTrigger };
