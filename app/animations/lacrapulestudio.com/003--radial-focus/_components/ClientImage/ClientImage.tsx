'use client';

import { useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Transition } from 'react-transition-group';
import gsap from 'gsap';

import styles from './ClientImage.module.scss';

interface Props {
  imgSrc: StaticImageData;
  imgAlt: string;
  inProp: boolean;
}

const ClientImage = ({ imgSrc, imgAlt, inProp }: Props) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  return (
    <Transition
      in={inProp}
      timeout={{ enter: 1300, exit: 550 }}
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
      onEnter={() => {
        const node = nodeRef.current;
        if (!node) return;
        const img = node.querySelector('img');
        gsap.killTweensOf([node, img]);
        gsap.set(node, {
          clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
        });
        gsap.set(img, { scale: 1.25, autoAlpha: 0 });
        gsap.to(node, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.65,
          ease: 'hop',
        });
        gsap.to(img, {
          autoAlpha: 1,
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(img, {
          scale: 1,
          duration: 1.25,
          ease: 'hop',
        });
      }}
      onExit={() => {
        const node = nodeRef.current;
        if (!node) return;
        const img = node.querySelector('img');
        gsap.killTweensOf([node, img]);
        gsap.to(img, {
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power1.out',
        });
      }}
    >
      <div ref={nodeRef} className={styles.clientImage}>
        <Image src={imgSrc} alt={imgAlt} />
      </div>
    </Transition>
  );
};

export default ClientImage;
