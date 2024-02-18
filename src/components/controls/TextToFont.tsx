'use client';

import type { DotMatrix } from '@/types/flipdot';
import { useState } from 'react';

interface ControlProps {
  setMatrix: (matrix: DotMatrix) => void;
}

const TextToFont = (props: ControlProps) => {
  const [message, setMessage] = useState('');

  const onSubmit = async () => {
    const urlParams = new URLSearchParams({
      text: message
    });

    const fontRes = await fetch('/api/text?' + urlParams);
    console.log(fontRes);
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
