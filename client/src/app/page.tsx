import styles from './page.module.css';
import FlipdotWrapper from '@/components/FlipdotWrapper';

export default function Home() {
  return (
    <main className={styles.main}>
      <FlipdotWrapper />
    </main>
  );
}
