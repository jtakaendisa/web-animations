import { PropsWithChildren } from 'react';

import styles from './TitleBlock.module.scss';

const TitleBlock = ({ children }: PropsWithChildren) => {
  return (
    <section className={styles.titleBlock}>
      <h1 className={styles.title}>{children}</h1>
    </section>
  );
};

export default TitleBlock;
