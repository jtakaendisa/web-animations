import { ActiveIndex } from '../../_types';

import styles from './ClientListItem.module.scss';

interface Props {
  name: string;
  index: number;
  isLastItem: boolean;
  onHover: (ActiveIndex: ActiveIndex) => void;
}

const ClientListItem = ({ name, index, isLastItem, onHover }: Props) => {
  return (
    <div
      className={styles.clientName}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <span>
        {' '}
        {name}
        {!isLastItem ? ',' : '.'}
      </span>
    </div>
  );
};

export default ClientListItem;
