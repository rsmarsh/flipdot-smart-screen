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
import { getPreviewFromText } from '@/utils/network';
import { useMatrix } from '@/contexts/matrix';

interface ControlProps {
  activeMessage: string;
  passwordEntered: string;
  activeFont: Fonts;
  setActiveMessage: (message: string) => void;
  setPasswordEntered: (password: string) => void;
}

const TextToFont = (props: ControlProps) => {
  // default to true, don't see any reason to turn it off yet
  const [liveUpdate, setLiveUpdate] = useState(true);
  const { matrixDispatch } = useMatrix();

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
      matrixDispatch({ type: 'emptyMatrix' });
      return;
    }

    // gets a matrix from the next API to use in the screen emulator
    const preview = await getPreviewFromText({
      text: newMessage,
      font: font
    });

    const matrixWithText = applyArrayToMatrix(preview.matrix);
    const centeredMatrix = centerAlignMatrix(matrixWithText);
    matrixDispatch({ type: 'setMatrix', payload: centeredMatrix });
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
