'use client';

import type { DotMatrix } from '@/types/flipdot';
import { randomMatrix } from '@/utils/display';
import SIZE from '@/config/size';

interface ControlProps {
  setMatrix: (matrix: DotMatrix) => void;
}

const Randomise = (props: ControlProps) => {
  const handleClick = () => {
    const randomisedMatrix = randomMatrix(SIZE);
    props.setMatrix(randomisedMatrix);
  };

  return (
    <div>
      <button onClick={handleClick}>Randomise Screen</button>
    </div>
  );
};

export default Randomise;
