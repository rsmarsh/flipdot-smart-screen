import styles from './Emulator.module.css';
import Dot from './Dot';
import type { DotMatrix } from '@/types/flipdot';

interface EmulatorProps {
  matrix: DotMatrix;
}

const Emulator = (props: EmulatorProps) => {
  return (
    <div className={styles.frameWrapper}>
      <div className={styles.frame}>
        {Object.keys(props.matrix).map((rowNum) => (
          <div key={rowNum} className={styles.row}>
            {Object.keys(props.matrix[rowNum]).map((colNum) => (
              <Dot
                key={`${rowNum}-${colNum}`}
                col={colNum}
                row={rowNum}
                lit={props.matrix[rowNum][colNum].lit}
                data-col={colNum}
                data-row={rowNum}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Emulator;
