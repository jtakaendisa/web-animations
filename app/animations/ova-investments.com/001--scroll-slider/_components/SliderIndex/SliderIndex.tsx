'use client';

import { formatNumber } from '@/utils';
import { useSliderIndex } from '../../_hooks/useSliderIndex';

import styles from './SliderIndex.module.scss';

interface Props {
  index: number;
  isFocused: boolean;
  onSnap: (index: number) => void;
}

const SliderIndex = ({ index, isFocused, onSnap }: Props) => {
  const { showMarker, toggleIsHovered } = useSliderIndex(isFocused);

  return (
    <div className={styles.sliderIndex}>
      <span
        className={styles.marker}
        style={{
          transform: `scaleX(${showMarker ? 1 : 0}) translateX(${
            showMarker ? 0 : '12px'
          })`,
        }}
      />

      <span
        className={styles.index}
        style={{ opacity: isFocused ? 0.5 : 1 }}
        onClick={() => onSnap(index)}
        onMouseEnter={toggleIsHovered}
        onMouseLeave={toggleIsHovered}
      >
        {formatNumber(index, 1)}
      </span>
    </div>
  );
};

export default SliderIndex;
