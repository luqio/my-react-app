import List from './components/List';
import styles from './index.module.less';

const ListComponent = () => {
  return (
    <div className={styles.content}>
      <List UserName="" phoneNumber={0} hidden />
    </div>
  );
};

export default ListComponent;
