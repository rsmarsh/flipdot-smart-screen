'use client';

import Emulator from './Emulator';
import Controls from './Controls';
import SIZE from '@/config/size';

import { useState } from 'react';
import { emptyMatrix } from '@/utils/display';

const FlipdotWrapper = () => {
  const initialMatrix = emptyMatrix(SIZE);
  const [matrix, setMatrix] = useState(initialMatrix);

  return (
    <div>
      <Emulator height={SIZE.height} width={SIZE.width} matrix={matrix} />
      <Controls setMatrix={setMatrix} activeMatrix={matrix} />
    </div>
  );
};

export default FlipdotWrapper;
