'use client';

import type { DotMatrix } from '@/types/flipdot';
import { useState } from 'react';
import { applyArrayToMatrix } from '@/utils/display';
import TextInput from '@/components/inputs/TextInput';

interface ControlProps {
  setMatrix: (matrix: DotMatrix) => void;
}

const TextToFont = (props: ControlProps) => {
  const [message, setMessage] = useState('');
  const [liveUpdate, setLiveUpdate] = useState(false);

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
      <TextInput
        label={'Message: '}
        value={message}
        onChange={(value: string) => setMessage(value)}
      />
      <button onClick={onSubmit}>Convert to font</button>
    </div>
  );
};

export default TextToFont;
