import { sendTextToDisplay, sendMatrixToDisplay } from '@/utils/network';
import { convertMatrixToBooleanArray } from '@/utils/display';
import Button from '@/components/inputs/Button';
import { Fonts } from 'figlet';
import type { DotMatrix } from '@/types/flipdot';
import { useState } from 'react';

interface ControlProps {
  activeMessage: string;
  passwordEntered: string;
  activeFont: Fonts;
  activeMatrix: DotMatrix;
  selectedSection: string;
}

const SendToScreen = (props: ControlProps) => {
  const [isSending, setIsSending] = useState(false);

  const handleClick = async () => {
    setIsSending(true);

    // All sends an entire matrix to the backend to display as sent
    if (props.selectedSection === 'all') {
      const booleanMatrixArray = convertMatrixToBooleanArray(
        props.activeMatrix
      );

      await sendMatrixToDisplay({
        matrix: booleanMatrixArray,
        password: props.passwordEntered,
        // fields not needed but useful to know what was sent, this may have to change if custom drawing is added
        message: props.activeMessage,
        font: props.activeFont
      });

      // Otherwise, we are sending the text for the backend to add to a specific section of the display
    } else {
      await sendTextToDisplay({
        message: props.activeMessage,
        font: props.activeFont,
        section: props.selectedSection,
        password: props.passwordEntered
      });
    }

    setIsSending(false);
  };

  return (
    <div>
      <Button onClick={handleClick} isLoading={isSending}>
        Send to real Flipdot
      </Button>
    </div>
  );
};

export default SendToScreen;
