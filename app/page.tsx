import Link from 'next/link';

import { projects } from '@/data';
import { formatNumber } from '@/utils';

import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.homePage}>
      <h1 className={styles.title}>Project List</h1>
      <ul className={styles.projects}>
        {projects.map(({ title, href }, idx) => (
          <li key={idx} className={styles.project}>
            <Link href={href}>
              Experiment {formatNumber(idx, 1, 3)} - {title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
