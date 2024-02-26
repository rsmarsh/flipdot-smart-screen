'use client';

import type { DotMatrix } from '@/types/flipdot';
import { useState } from 'react';
import { applyArrayToMatrix, emptyMatrix } from '@/utils/display';
import TextInput from '@/components/inputs/TextInput';
import Button from '@/components/inputs/Button';
import Checkbox from '@/components/inputs/Checkbox';
import styles from './TextToFont.module.css';

interface ControlProps {
  setMatrix: (matrix: DotMatrix) => void;
}

const TextToFont = (props: ControlProps) => {
  const [message, setMessage] = useState('');
  const [liveUpdate, setLiveUpdate] = useState(true);

  const onMessageChange = (text: string) => {
    setMessage(text);

    if (liveUpdate) {
      submitMessage(text);
    }
  };

  const submitMessage = async (newMessage: string) => {
    if (!newMessage) {
      props.setMatrix(emptyMatrix());
      return;
    }

    const urlParams = new URLSearchParams({
      message: newMessage
    });

    const textRes = await fetch('/api/text?' + urlParams);
    const resJSON = await textRes.json();

    const matrixWithText = applyArrayToMatrix(resJSON.matrix);

    props.setMatrix(matrixWithText);
  };

  return (
    <div className={styles.textToFontWrapper}>
      <div className={styles.textInputWrapper}>
        <TextInput value={message} onChange={onMessageChange} />
      </div>
      <div className={styles.submitWrapper}>
        <Button onClick={() => submitMessage(message)}>⬆️</Button>
      </div>
      <div className={styles.liveInputWrapper}>
        <Checkbox
          label='Live update'
          onChange={setLiveUpdate}
          checked={liveUpdate}
        />
      </div>
    </div>
  );
};

export default TextToFont;
