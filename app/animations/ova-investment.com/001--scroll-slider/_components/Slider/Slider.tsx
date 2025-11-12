'use client';

import { useRef } from 'react';

import { slides } from '../../_data';
import { useSlider } from '../../_hooks/useSlider';
import SliderTitle from '../SliderTitle/SliderTitle';
import SliderImage from '../SliderImage/SliderImage';
import SliderIndicator from '../SliderIndicator/SliderIndicator';

import styles from './Slider.module.scss';

const Slider = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const { currentIndex, handleUpdateIndex } = useSlider();

  return (
    <section ref={sliderRef} className={styles.slider}>
      {slides.map((s, idx) => (
        <SliderImage
          key={idx}
          src={s.imageSrc}
          alt={s.imageAlt}
          inProp={idx === currentIndex}
        />
      ))}

      <SliderTitle title={slides[currentIndex].title} />

      <SliderIndicator
        ref={sliderRef}
        slides={slides}
        currentIndex={currentIndex}
        onUpdateIndex={handleUpdateIndex}
      />
    </section>
  );
};

export default Slider;
