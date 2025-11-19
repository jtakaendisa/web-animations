'use client';

import { useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Transition } from 'react-transition-group';
import gsap from 'gsap';

import styles from './SliderImage.module.scss';

interface Props {
  src: StaticImageData;
  alt: string;
  inProp: boolean;
}

const SliderImage = ({ src, alt, inProp }: Props) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  return (
    <Transition
      in={inProp}
      timeout={{ enter: 800, exit: 500 }}
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
      onEnter={() => {
        const node = nodeRef.current;
        if (!node) return;
        const img = node.querySelector('img');
        gsap.killTweensOf(img);
        gsap.from(img, {
          scale: 1.1,
          autoAlpha: 0,
          duration: 0.75,
          ease: 'power3.out',
        });
      }}
      onExit={() => {
        const node = nodeRef.current;
        if (!node) return;
        const img = node.querySelector('img');
        gsap.killTweensOf(img);
        gsap.to(img, {
          autoAlpha: 0,
          duration: 0.45,
          ease: 'power3.in',
        });
      }}
    >
      <div ref={nodeRef} className={styles.sliderImage}>
        <Image src={src} alt={alt} />
      </div>
    </Transition>
  );
};

export default SliderImage;
