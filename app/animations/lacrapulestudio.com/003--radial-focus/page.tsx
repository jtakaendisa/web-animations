import { DM_Mono, DM_Sans } from 'next/font/google';

import ClientBlock from './_components/ClientBlock/ClientBlock';

import styles from './page.module.scss';

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

const RadialFocusPage = () => {
  return (
    <main className={`${dmMono.variable} ${dmSans.variable} ${styles.radialFocusPage}`}>
      <ClientBlock />
    </main>
  );
};

export default RadialFocusPage;
