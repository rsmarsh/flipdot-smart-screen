import styles from './Emulator.module.css';
import Dot from './Dot';

interface DotData {
  col: number;
  row: number;
}

const Emulator = () => {
  const gridWidth = 96;
  const gridHeight = 16;

  const rows: DotData[][] = [];

  for (let row = 0; row < gridHeight; row++) {
    const newRow: DotData[] = [];

    for (let col = 0; col < gridWidth; col++) {
      newRow.push({ col: col, row: row });
    }

    rows.push(newRow);
  }

  return (
    <div>
      <div className={styles.frame}>
        {rows.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className={styles.row}>
              {row.map((dot) => (
                <Dot
                  key={`${dot.row}${dot.col}`}
                  row={dot.row}
                  col={dot.col}
                  isActive={Math.random() > 0.5}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Emulator;
