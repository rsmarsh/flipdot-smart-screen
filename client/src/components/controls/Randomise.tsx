'use client';

import type { DotMatrix } from '@/types/flipdot';
import { randomMatrix } from '@/utils/display';
import Button from '@/components/inputs/Button';
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
      <Button onClick={handleClick}>Randomise Screen</Button>
    </div>
  );
};

export default Randomise;
