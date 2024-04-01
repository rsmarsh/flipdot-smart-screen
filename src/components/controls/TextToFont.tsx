'use client';

import type { DotMatrix } from '@/types/flipdot';
import { useState, useEffect } from 'react';
import {
  applyArrayToMatrix,
  centerAlignMatrix,
  emptyMatrix
} from '@/utils/display';
import TextInput from '@/components/inputs/TextInput';
import styles from './TextToFont.module.css';
import type { Fonts } from 'figlet';

interface ControlProps {
  activeMessage: string;
  passwordEntered: string;
  activeFont: Fonts;
  setMatrix: (matrix: DotMatrix) => void;
  setActiveMessage: (message: string) => void;
  setPasswordEntered: (password: string) => void;
}

const TextToFont = (props: ControlProps) => {
  // default to true, don't see any reason to turn it off yet
  const [liveUpdate, setLiveUpdate] = useState(true);

  // so that the preview immediately updates when the font changes
  useEffect(() => {
    submitMessage(props.activeMessage, props.activeFont);
  }, [props.activeFont]);

  const onMessageChange = (text: string) => {
    props.setActiveMessage(text);

    if (liveUpdate) {
      submitMessage(text, props.activeFont);
    }
  };

  const onPasswordChange = (password: string) => {
    props.setPasswordEntered(password);
  };

  const submitMessage = async (newMessage: string, font: Fonts) => {
    if (!newMessage) {
      props.setMatrix(emptyMatrix());
      return;
    }

    const data = {
      text: newMessage,
      font: font
    };

    const textRes = await fetch('/api/text', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const resJSON = await textRes.json();

    const matrixWithText = applyArrayToMatrix(resJSON.matrix);
    const centeredMatrix = centerAlignMatrix(matrixWithText);
    props.setMatrix(centeredMatrix);
  };

  return (
    <div className={styles.textToFontWrapper}>
      <div className={styles.textInputWrapper}>
        <TextInput
          type='text'
          label='Message:'
          value={props.activeMessage}
          onChange={onMessageChange}
        />
        <TextInput
          type='password'
          label='Password:'
          value={props.passwordEntered}
          onChange={onPasswordChange}
        />
      </div>
    </div>
  );
};

export default TextToFont;
