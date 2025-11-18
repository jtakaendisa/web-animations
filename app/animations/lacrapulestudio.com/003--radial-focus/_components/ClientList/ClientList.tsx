import { ActiveIndex, Client } from '../../_types';
import ClientListItem from '../ClientListItem/ClientListItem';

import styles from './ClientList.module.scss';

interface Props {
  clients: Client[];
  onHover: (activeIndex: ActiveIndex) => void;
}

const ClientList = ({ clients, onHover }: Props) => {
  return (
    <div className={styles.clientList}>
      {clients.map(({ name }, idx) => (
        <ClientListItem
          key={name}
          name={name}
          index={idx}
          isLastItem={idx === clients.length - 1}
          onHover={onHover}
        />
      ))}
    </div>
  );
};

export default ClientList;
