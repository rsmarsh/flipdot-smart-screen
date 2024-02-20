'use client';

import type { DotMatrix } from '@/types/flipdot';
import { useState } from 'react';
import { applyArrayToMatrix } from '@/utils/display';

interface ControlProps {
  setMatrix: (matrix: DotMatrix) => void;
}

const TextToFont = (props: ControlProps) => {
  const [message, setMessage] = useState('');

  const onSubmit = async () => {
    const urlParams = new URLSearchParams({
      message: message
    });

    const textRes = await fetch('/api/text?' + urlParams);
    const resJSON = await textRes.json();

    const matrixWithText = applyArrayToMatrix(resJSON.matrix);

    props.setMatrix(matrixWithText);
  };

  return (
    <div>
      <input
        value={message}
        type='text'
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={onSubmit}>Convert to font</button>
    </div>
  );
};

export default TextToFont;
