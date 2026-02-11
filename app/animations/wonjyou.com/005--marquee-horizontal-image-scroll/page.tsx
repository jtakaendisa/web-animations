'use client';

import { useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import gsap from 'gsap';

import { useGSAP } from '@/components/gsap/useGSAP';
import { ScrollTrigger } from '@/components/gsap/scroll-trigger';
import { Flip } from '@/components/gsap/flip';
import { marqueeImages } from './_data';

import styles from './page.module.scss';

const lightColor = '#edf1e8';
const darkColor = '#101010';

const interpolateColor = (color1: string, color2: string, factor: number): string =>
  gsap.utils.interpolate(color1, color2, factor);

const MarqueeHorizontalImageScrollPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedImageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: `.${styles.marquee}`,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const xPosition = -75 + progress * 25;

          gsap.set(`.${styles.marqueeImages}`, {
            x: `${xPosition}%`,
          });
        },
      });

      let pinnedImageClone: HTMLDivElement | null = null;
      let isPinnedImageCloneActive = false;

      const createPinnedImageClone = () => {
        const pinnedImage = pinnedImageRef.current;

        if (!pinnedImage || isPinnedImageCloneActive) return;

        const rect = pinnedImage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        pinnedImageClone = pinnedImage.cloneNode(true) as HTMLDivElement;

        gsap.set(pinnedImageClone, {
          position: 'fixed',
          left: centerX - pinnedImage.offsetWidth / 2,
          top: centerY - pinnedImage.offsetHeight / 2,
          width: pinnedImage.offsetWidth,
          height: pinnedImage.offsetHeight,
          transform: 'rotate(-5deg)',
          transformOrigin: 'center center',
          pointerEvents: 'none',
          zIndex: 100,
        });

        const container = containerRef.current;

        if (container) {
          container.appendChild(pinnedImageClone);
        }

        gsap.set(pinnedImage, { opacity: 0 });
        isPinnedImageCloneActive = true;
      };

      const removePinnedImageClone = () => {
        const pinnedImage = pinnedImageRef.current;

        if (!pinnedImage || !isPinnedImageCloneActive) return;

        if (pinnedImageClone) {
          pinnedImageClone.remove();
          pinnedImageClone = null;
        }

        gsap.set(pinnedImage, { opacity: 1 });
        isPinnedImageCloneActive = false;
      };

      ScrollTrigger.create({
        trigger: `.${styles.horizontalScroll}`,
        start: 'top top',
        end: `+=${window.innerHeight * 5}`,
        pin: true,
      });

      ScrollTrigger.create({
        trigger: `.${styles.marquee}`,
        start: 'top top',
        onEnter: createPinnedImageClone,
        onLeaveBack: removePinnedImageClone,
      });

      let flipAnimation: Flip | null = null;

      ScrollTrigger.create({
        trigger: `.${styles.horizontalScroll}`,
        start: 'top 50%',
        end: `${window.innerHeight * 5.5}`,
        onEnter: () => {
          if (pinnedImageClone && isPinnedImageCloneActive && !flipAnimation) {
            const state = Flip.getState(pinnedImageClone);

            gsap.set(pinnedImageClone, {
              position: 'fixed',
              left: 0,
              top: 0,
              width: '100%',
              height: '100vh',
              transform: 'rotate(0deg)',
              transformOrigin: 'center center',
            });

            flipAnimation = Flip.from(state, {
              duration: 1,
              ease: 'none',
              paused: true,
            });
          }
        },
        onLeaveBack: () => {
          if (flipAnimation) {
            flipAnimation.revert();
            flipAnimation = null;
          }

          gsap.set(containerRef.current, {
            backgroundColor: lightColor,
          });
          gsap.set(`.${styles.horizontalScrollWrapper}`, {
            x: 0,
          });
        },
      });

      ScrollTrigger.create({
        trigger: `.${styles.horizontalScroll}`,
        start: 'top 50%',
        end: `+=${window.innerHeight * 5.5}`,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress <= 0.05) {
            const bgColorProgress = Math.min(progress / 0.05, 1);
            const newBgColor = interpolateColor(lightColor, darkColor, bgColorProgress);

            gsap.set(containerRef.current, {
              backgroundColor: newBgColor,
            });
          } else if (progress > 0.05) {
            gsap.set(containerRef.current, {
              backgroundColor: darkColor,
            });
          }

          if (progress <= 0.2) {
            const scaleProgress = progress / 0.2;

            if (flipAnimation) {
              flipAnimation.progress(scaleProgress);
            }
          }

          if (progress > 0.2 && progress <= 0.95) {
            if (flipAnimation) {
              flipAnimation.progress(1);
            }

            const horizontalProgress = (progress - 0.2) / 0.75;
            const wrapperTranslateX = -66.67 * horizontalProgress;

            gsap.set(`.${styles.horizontalScrollWrapper}`, {
              x: `${wrapperTranslateX}%`,
            });

            const slideMovement = (66.67 / 100) * 3 * horizontalProgress;
            const imageTranslateX = -slideMovement * 100;

            gsap.set(pinnedImageClone, {
              x: `${imageTranslateX}%`,
            });
          } else if (progress > 0.95) {
            if (flipAnimation) {
              flipAnimation.progress(1);
            }

            gsap.set(pinnedImageClone, {
              x: '-200%',
            });
            gsap.set(`.${styles.horizontalScrollWrapper}`, {
              x: '-66.67%',
            });
          }
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <main ref={containerRef} className={styles.marqueeHorizontalImageScrollPage}>
      <section className={styles.hero}>
        <h1>
          Fragments of thought arranged in sequence become patterns. They unfold step by
          step, shaping meaning as they move forward.
        </h1>
      </section>

      <section className={styles.marquee}>
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeImages}>
            {marqueeImages.map(({ src, alt }, idx) => (
              <div
                key={idx}
                ref={(ref) => {
                  if (idx === 6) {
                    pinnedImageRef.current = ref;
                  }
                }}
                className={styles.marqueeImage}
              >
                <Image src={src} alt={alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.horizontalScroll}>
        <div className={styles.horizontalScrollWrapper}>
          <div className={clsx(styles.horizontalSlide, styles.horizontalSpacer)}></div>

          <div className={styles.horizontalSlide}>
            <div className={styles.col}>
              <h3>
                A landscape in constant transition, where every shape, sound, and shadow
                refuses to stay still. What seems stable begins to dissolve, and what
                fades returns again in a new form.
              </h3>
            </div>
            <div className={styles.col}>
              <Image src={marqueeImages[0].src} alt={marqueeImages[0].alt} />
            </div>
          </div>

          <div className={styles.horizontalSlide}>
            <div className={styles.col}>
              <h3>
                The rhythm of motion carries us forward into spaces that feel familiar
                yet remain undefined. Each shift is subtle, yet together they remind us
                that nothing we see is ever permanent.
              </h3>
            </div>
            <div className={styles.col}>
              <Image src={marqueeImages[1].src} alt={marqueeImages[1].alt} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.outro}>
        <h1>
          Shadows fold into light. Shapes shift across the frame, reminding us that
          stillness is only temporary.
        </h1>
      </section>
    </main>
  );
};

export default MarqueeHorizontalImageScrollPage;
