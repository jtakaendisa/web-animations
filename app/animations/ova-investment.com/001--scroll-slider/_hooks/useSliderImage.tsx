'use client';

import { RefObject, useEffect } from 'react';
import gsap from 'gsap';

export const useSliderImage = (nodeRef: RefObject<HTMLDivElement | null>) => {
  // Cleanup GSAP animations in case of unexpected unmounts
  useEffect(() => {
    const node = nodeRef.current;
    return () => {
      if (node) {
        gsap.killTweensOf(node);
      }
    };
  }, [nodeRef]);

  return null;
};
