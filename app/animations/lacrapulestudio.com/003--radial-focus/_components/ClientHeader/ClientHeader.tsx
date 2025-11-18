import styles from './ClientHeader.module.scss';

const ClientHeader = () => {
  return (
    <div className={styles.clientHeader}>
      <p className={styles.headerText}>Trusted By</p>
    </div>
  );
};

export default ClientHeader;
