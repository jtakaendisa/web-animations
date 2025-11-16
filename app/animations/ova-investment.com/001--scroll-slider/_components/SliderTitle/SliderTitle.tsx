'use client';

import { useRef } from 'react';

import { useSliderTitle } from '../../_hooks/useSliderTitle';

import styles from './SliderTitle.module.scss';

interface Props {
  title: string;
}

const SliderTitle = ({ title }: Props) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const splitTextRef = useRef<InstanceType<typeof SplitText> | null>(null);

  useSliderTitle(titleRef, splitTextRef);

  return (
    <div className={styles.sliderTitle}>
      <h1 ref={titleRef}>{title}</h1>
    </div>
  );
};

export default SliderTitle;
