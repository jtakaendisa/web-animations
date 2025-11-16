'use client';

import gsap from 'gsap';

export const useSliderIndices = () => {
  const handleSnapToIndex = (index: number) => {
    const slideHeight = window.innerHeight;
    const targetScroll = 1.5 * slideHeight + index * slideHeight;

    gsap.to(window, {
      scrollTo: { y: targetScroll },
      duration: 0.65,
      ease: 'power3.inOut',
    });
  };

  return { handleSnapToIndex };
};
