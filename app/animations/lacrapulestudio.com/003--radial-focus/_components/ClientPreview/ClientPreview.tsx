import { Client } from '../../_types';
import ClientImage from '../ClientImage/ClientImage';

import styles from './ClientPreview.module.scss';

interface Props {
  clients: Client[];
  activeIndex: number | null;
}

const ClientPreview = ({ clients, activeIndex }: Props) => {
  return (
    <div className={styles.clientPreview}>
      {clients.map(({ image, name }, idx) => (
        <ClientImage
          key={name}
          imgSrc={image}
          imgAlt={name}
          inProp={idx === activeIndex}
        />
      ))}
    </div>
  );
};

export default ClientPreview;
