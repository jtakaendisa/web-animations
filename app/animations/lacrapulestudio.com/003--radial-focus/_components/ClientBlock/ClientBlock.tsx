'use client';

import { useState } from 'react';

import { clients } from '../../_data';
import { ActiveIndex } from '../../_types';
import ClientPreview from '../ClientPreview/ClientPreview';
import ClientHeader from '../ClientHeader/ClientHeader';
import ClientList from '../ClientList/ClientList';

import styles from './ClientBlock.module.scss';

const ClientBlock = () => {
  const [activeIndex, setActiveIndex] = useState<ActiveIndex>(null);

  const handleUpdateActiveIndex = (activeIndex: ActiveIndex) =>
    setActiveIndex(activeIndex);

  return (
    <section className={styles.clientBlock}>
      <ClientPreview clients={clients} activeIndex={activeIndex} />

      <ClientHeader />

      <ClientList clients={clients} onHover={handleUpdateActiveIndex} />
    </section>
  );
};

export default ClientBlock;
