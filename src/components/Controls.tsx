import type { DotMatrix } from '@/types/flipdot';
import Randomise from './controls/Randomise';
import TextToFont from './controls/TextToFont';

interface ControlsProps {
  setMatrix: (matrix: DotMatrix) => void;
}

const Controls = (props: ControlsProps) => {
  return (
    <div>
      <TextToFont setMatrix={props.setMatrix} />
      <Randomise setMatrix={props.setMatrix} />
    </div>
  );
};

export default Controls;
