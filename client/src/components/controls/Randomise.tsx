'use client';

import type { DotMatrix } from '@/types/flipdot';
import { randomMatrix } from '@/utils/display';
import Button from '@/components/inputs/Button';
import SIZE from '@/config/size';
import { useMatrix } from '@/contexts/matrix';

const Randomise = () => {
  const { matrixDispatch } = useMatrix();
  const handleClick = () => {
    const randomisedMatrix = randomMatrix(SIZE);
    matrixDispatch({ type: 'setMatrix', payload: randomisedMatrix });
  };

  return (
    <div>
      <Button onClick={handleClick}>Randomise Screen</Button>
    </div>
  );
};

export default Randomise;
