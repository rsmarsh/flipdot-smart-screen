import styles from './Dot.module.css';

interface Props {
  col: number | string;
  row: number | string;
  lit: boolean;
}

const Dot = (props: Props) => {
  return (
    <div className={`${styles.dot} ${props.lit ? styles.active : ''}`}></div>
  );
};

export default Dot;
