'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

import { useGSAP } from '@/components/gsap/useGSAP';
import { SplitText } from '@/components/gsap/split-text';
import { preloaderImages, headerRowTitles } from '../../_data';

import styles from './Preloader.module.scss';

const Preloader = () => {
  const preloaderElRef = useRef<HTMLDivElement | null>(null);
  const preloaderCopyElRef = useRef<HTMLDivElement | null>(null);
  const preloaderHeaderElRef = useRef<HTMLAnchorElement | null>(null);
  const dividerElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerElsRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const preloaderImageElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const preloaderProgressBarElRef = useRef<HTMLDivElement | null>(null);

  useGSAP((context) => {
    document.fonts.ready.then(() => {
      const preloaderEl = preloaderElRef.current;
      const preloaderCopyEl = preloaderCopyElRef.current;
      const preloaderHeaderEl = preloaderHeaderElRef.current;
      const dividerEls = dividerElsRef.current;
      const headerEls = headerElsRef.current;
      const preloaderImageEls = preloaderImageElsRef.current;
      const preloaderProgressBarEl = preloaderProgressBarElRef.current;

      if (
        !preloaderEl ||
        !preloaderCopyEl ||
        !preloaderHeaderEl ||
        !dividerEls ||
        !headerEls.length ||
        !preloaderImageEls.length ||
        !preloaderProgressBarEl
      ) {
        return;
      }

      const splitPreloaderCopy = SplitText.create(preloaderCopyEl, {
        type: 'lines',
        autoSplit: true,
        mask: 'lines',
      });

      const splitPreloaderHeader = SplitText.create(preloaderHeaderEl, {
        type: 'chars',
        autoSplit: true,
        mask: 'chars',
      });

      const splitHeader = SplitText.create(headerEls, {
        type: 'lines',
        autoSplit: true,
        mask: 'lines',
      });

      const chars = splitPreloaderHeader.chars;
      const lines = splitPreloaderCopy.lines;
      const headerLines = splitHeader.lines;
      const initialChar = chars[0];
      const lastChar = chars[chars.length - 1];

      chars.forEach((char, index) => {
        gsap.set(char, { yPercent: index % 2 === 0 ? -100 : 100 });
      });
      gsap.set(lines, { yPercent: 100 });
      gsap.set(headerLines, { yPercent: 100 });

      const preloaderImageElsInnerImgs = gsap.utils.toArray(
        'img',
      ) as unknown as HTMLImageElement[];

      const tl = gsap.timeline({ delay: 0.25 });

      tl.to(preloaderProgressBarEl, {
        scaleX: 1,
        duration: 4,
        ease: 'power3.inOut',
      })
        .set(preloaderProgressBarEl, { transformOrigin: 'right' })
        .to(preloaderProgressBarEl, { scaleX: 0, duration: 1, ease: 'power3.in' });

      tl.to(
        preloaderImageEls,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1,
          ease: 'hop2',
          stagger: 0.75,
        },
        '-=5',
      );

      tl.to(
        preloaderImageElsInnerImgs,
        {
          scale: 1,
          duration: 1.5,
          ease: 'hop2',
          stagger: 0.75,
        },
        '-=5.25',
      );

      tl.to(
        lines,
        {
          yPercent: 0,
          duration: 2,
          ease: 'hop2',
          stagger: 0.1,
        },
        '-=5.5',
      );

      tl.to(
        chars,
        {
          yPercent: 0,
          duration: 1,
          ease: 'hop2',
          stagger: 0.025,
        },
        '-=5',
      );

      tl.to(
        preloaderImageEls,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 1,
          ease: 'hop2',
        },
        '-=1.5',
      );

      tl.to(
        lines,
        {
          yPercent: -125,
          duration: 2,
          ease: 'hop2',
          stagger: 0.1,
        },
        '-=2',
      );

      tl.to(
        chars,
        {
          yPercent: (index) => {
            if (index === 0 || index === chars.length - 1) {
              return 0;
            }
            return index % 2 === 0 ? 100 : -100;
          },
          duration: 1,
          ease: 'hop2',
          stagger: 0.025,
          delay: 0.5,
          onStart: () => {
            const initialCharMask = initialChar.parentElement;
            const lastCharMask = lastChar.parentElement;

            if (!initialCharMask || !lastCharMask) {
              return;
            }

            initialCharMask.style.overflow = 'visible';
            lastCharMask.style.overflow = 'visible';

            const viewportWidth = window.innerWidth;
            const centerX = viewportWidth / 2;
            const initialCharRect = initialChar.getBoundingClientRect();
            const lastCharRect = lastChar.getBoundingClientRect();

            gsap.to([initialChar, lastChar], {
              duration: 1,
              ease: 'hop2',
              delay: 0.5,
              x: (index) => {
                if (index === 0) {
                  return centerX - initialCharRect.left - initialCharRect.width;
                } else {
                  return centerX - lastCharRect.left;
                }
              },
              onComplete: () => {
                // 1. Get the current top position (in pixels)
                const currentTop = preloaderHeaderEl.getBoundingClientRect().top;

                gsap.to(preloaderHeaderEl, {
                  y: -currentTop,
                  color: '#000',
                  scale: 0.35,
                  duration: 1.75,
                  ease: 'hop2',
                });
              },
            });
          },
        },
        '-=2.5',
      );

      tl.to(
        preloaderEl,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 1.75,
          ease: 'hop2',
        },
        '-=0.5',
      );

      tl.to(
        headerLines,
        {
          yPercent: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
        },
        '-=0.75',
      );

      tl.to(dividerEls, {
        scaleX: 1,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.1,
      });

      // console.log(context.data.length);
    });
  });

  return (
    <>
      <section ref={preloaderElRef} className={styles.preloader}>
        <div ref={preloaderProgressBarElRef} className={styles.preloaderProgressBar} />

        <div className={styles.preloaderImages}>
          {preloaderImages.map(({ imgSrc, imgAlt }, idx) => (
            <div
              key={idx}
              ref={(element) => {
                preloaderImageElsRef.current[idx] = element;
              }}
              className={styles.preloaderImage}
            >
              <Image src={imgSrc} alt={imgAlt} />
            </div>
          ))}
        </div>

        <div className={styles.preloaderCopy}>
          <p ref={preloaderCopyElRef}>
            A visual storyteller focused on shaping timeless fashion narratives through
            bold composition and refined tone.
          </p>
        </div>
      </section>

      <section className={styles.preloaderHeader}>
        <Link ref={preloaderHeaderElRef} href="#">
          Dorian Valez
        </Link>
      </section>

      <section className={styles.hero}>
        {headerRowTitles.map((title, idx) => (
          <div key={title} className={styles.headerRow}>
            <div
              ref={(element) => {
                dividerElsRef.current[idx] = element;
              }}
              className={styles.divider}
            />
            <h1
              ref={(element) => {
                headerElsRef.current[idx] = element;
              }}
            >
              {title}
            </h1>
          </div>
        ))}
      </section>
    </>
  );
};

export default Preloader;
