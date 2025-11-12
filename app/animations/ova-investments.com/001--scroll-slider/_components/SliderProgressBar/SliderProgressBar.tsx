import { RefObject } from 'react';

import styles from './SliderProgressBar.module.scss';

interface Props {
  ref: RefObject<HTMLDivElement | null>;
}

const SliderProgressBar = ({ ref }: Props) => {
  return (
    <div className={styles.progressBar}>
      <div ref={ref} className={styles.progress} />
    </div>
  );
};

export default SliderProgressBar;
