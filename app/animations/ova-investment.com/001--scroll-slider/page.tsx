import { Geist_Mono, Inter } from 'next/font/google';

import TitleBlock from './_components/TitleBlock/TitleBlock';
import Slider from './_components/Slider/Slider';

import styles from './page.module.scss';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const ScrollSliderPage = () => {
  return (
    <main
      className={`${geistMono.variable} ${inter.variable} ${styles.scrollSliderPage}`}
    >
      <TitleBlock>
        Scroll to explore the rhythm of still images that move quietly between story and
        sensation.
      </TitleBlock>

      <Slider />

      <TitleBlock>
        The rhythm has come to an end. Only the stillness of memory remains.
      </TitleBlock>
    </main>
  );
};

export default ScrollSliderPage;
