import styles from './Dot.module.css';

interface Props {
  col: number;
  row: number;
  isActive: boolean;
}

const Dot = (props: Props) => {
  return (
    <div
      className={`${styles.dot} ${props.isActive ? styles.active : ''}`}
    ></div>
  );
};

export default Dot;
