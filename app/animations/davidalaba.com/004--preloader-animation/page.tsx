import { Agdasima, Manrope } from 'next/font/google';

import Preloader from './_components/Preloader/Preloader';

import styles from './page.module.scss';

const agdasima = Agdasima({
  variable: '--font-agdasima',
  weight: ['400', '700'],
  subsets: ['latin'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const PreloaderAnimationPage = () => {
  return (
    <main
      className={`${agdasima.variable} ${manrope.variable} ${styles.preloaderAnimationPage}`}
    >
      <Preloader />
    </main>
  );
};

export default PreloaderAnimationPage;
