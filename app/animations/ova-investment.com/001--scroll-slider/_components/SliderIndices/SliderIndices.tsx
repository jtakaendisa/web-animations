import { Slide } from '../../_types';
import { useSliderIndices } from '../../_hooks/useSliderIndices';
import SliderIndex from '../SliderIndex/SliderIndex';

import styles from './SliderIndices.module.scss';

interface Props {
  slides: Slide[];
  currentIndex: number;
}

const SliderIndices = ({ slides, currentIndex }: Props) => {
  const { handleSnapToIndex } = useSliderIndices();

  return (
    <div className={styles.sliderIndices}>
      {slides.map((_, idx) => (
        <SliderIndex
          key={idx}
          index={idx}
          isFocused={idx === currentIndex}
          onSnap={handleSnapToIndex}
        />
      ))}
    </div>
  );
};

export default SliderIndices;
