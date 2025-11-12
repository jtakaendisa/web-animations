'use client';

import { RefObject, useEffect, useRef } from 'react';
import gsap from 'gsap/all';

import { ScrollTrigger } from '@/components/gsap/scroll-trigger';
import { Slide } from '../_types';

export const useSliderIndicator = (
  ref: RefObject<HTMLDivElement | null>,
  progressRef: RefObject<HTMLDivElement | null>,
  slides: Slide[],
  onUpdateIndex: (index: number) => void
) => {
  const lastIndexRef = useRef(-1);

  useEffect(() => {
    const slider = ref.current;
    const progress = progressRef.current;

    if (typeof window === 'undefined' || !slider || !progress) {
      return;
    }

    const pinDistance = slides.length * window.innerHeight;

    const st = ScrollTrigger.create({
      trigger: slider,
      start: 'top top',
      end: `+=${pinDistance}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(progress, { scaleY: self.progress });

        const raw = self.progress * slides.length; // ranges 0 .. slides.length
        let idx = Math.floor(raw);
        if (idx >= slides.length) idx = slides.length - 1; // clamp at end
        if (idx < 0) idx = 0;

        // only set state when index changes
        if (idx !== lastIndexRef.current) {
          lastIndexRef.current = idx;
          onUpdateIndex(idx);
        }
      },
    });

    return () => {
      st?.kill();
    };
  }, [ref, progressRef, slides, onUpdateIndex]);

  return null;
};
