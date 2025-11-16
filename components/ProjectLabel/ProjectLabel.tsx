'use client';

import { usePathname } from 'next/navigation';
import { Geist_Mono } from 'next/font/google';

import styles from './ProjectLabel.module.scss';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const ProjectLabel = () => {
  const pathname = usePathname();

  const parts = pathname.split('/');
  const info = parts[parts.length - 1];
  const [number, label] = info.split('--');

  if (pathname === '/') return null;

  return (
    <section className={`${geistMono.variable} ${styles.projectLabel}`}>
      <div className={styles.experiment}>
        <span>Experiment {number}</span>
      </div>
      <span className={styles.label}>[ {label.replace('-', ' ')} ]</span>
    </section>
  );
};

export default ProjectLabel;
