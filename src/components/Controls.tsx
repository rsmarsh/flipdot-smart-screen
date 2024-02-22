import type { DotMatrix } from '@/types/flipdot';
import Randomise from './controls/Randomise';
import TextToFont from './controls/TextToFont';
import styles from './Controls.module.css';

interface ControlsProps {
  setMatrix: (matrix: DotMatrix) => void;
}

const Controls = (props: ControlsProps) => {
  return (
    <div className={styles.controls}>
      <TextToFont setMatrix={props.setMatrix} />
      <Randomise setMatrix={props.setMatrix} />
    </div>
  );
};

export default Controls;
