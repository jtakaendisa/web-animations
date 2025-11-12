'use client';

import { RefObject, useEffect } from 'react';
import gsap from 'gsap/all';

import { SplitText } from '@/components/gsap/split-text';

export const useSliderTitle = (
  title: string,
  titleRef: RefObject<HTMLHeadingElement | null>,
  splitTextRef: RefObject<SplitText | null>
) => {
  useEffect(() => {
    const title = titleRef.current;

    if (typeof window === 'undefined' || !title) {
      return;
    }

    document.fonts.ready.then(() => {
      splitTextRef.current = SplitText.create(title, {
        type: 'lines',
        autoSplit: true,
        mask: 'lines',
        onSplit: (self) => {
          title.style.opacity = '1';
          gsap.from(self.lines, {
            yPercent: 100,
            autoAlpha: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
          });
        },
      });
    });

    return () => {
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
      gsap.killTweensOf(title);
    };
  }, [title, titleRef, splitTextRef]);

  return null;
};
