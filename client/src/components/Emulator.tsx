import styles from './Emulator.module.css';
import Dot from './Dot';
import type { DotMatrix } from '@/types/flipdot';
import { useMatrix } from '@/contexts/matrix';

interface EmulatorProps {
  matrix: DotMatrix;
}

const Emulator = () => {
  // TODO wrap this in a component to provide the context, so that the emulator can also use a matrix from a prop, and show multiple different versions at once
  const { matrix } = useMatrix();
  return (
    <div className={styles.frameWrapper}>
      <div className={styles.frame}>
        {Object.keys(matrix).map((rowNum) => (
          <div key={rowNum} className={styles.row}>
            {Object.keys(matrix[rowNum]).map((colNum) => (
              <Dot
                key={`${rowNum}-${colNum}`}
                col={colNum}
                row={rowNum}
                lit={matrix[rowNum][colNum].lit}
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
