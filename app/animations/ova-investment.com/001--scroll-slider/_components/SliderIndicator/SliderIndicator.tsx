'use client';

import { RefObject, useRef } from 'react';

import { Slide } from '../../_types';
import { useSliderIndicator } from '../../_hooks/useSliderIndicator';
import SliderIndices from '../SliderIndices/SliderIndices';
import SliderProgressBar from '../SliderProgressBar/SliderProgressBar';

import styles from './SliderIndicator.module.scss';

interface Props {
  ref: RefObject<HTMLDivElement | null>;
  slides: Slide[];
  currentIndex: number;
  onUpdateIndex: (index: number) => void;
}

const SliderIndicator = ({ ref, slides, currentIndex, onUpdateIndex }: Props) => {
  const progressRef = useRef<HTMLDivElement | null>(null);

  useSliderIndicator(ref, progressRef, slides, onUpdateIndex);

  return (
    <aside className={styles.sliderIndicator}>
      <SliderIndices slides={slides} currentIndex={currentIndex} />

      <SliderProgressBar ref={progressRef} />
    </aside>
  );
};

export default SliderIndicator;
