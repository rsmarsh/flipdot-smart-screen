import { sendTextToDisplay, sendMatrixToDisplay } from '@/utils/network';
import { convertMatrixToBooleanArray } from '@/utils/display';
import Button from '@/components/inputs/Button';
import { Fonts } from 'figlet';
import type { DotMatrix } from '@/types/flipdot';

interface ControlProps {
  activeMessage: string;
  passwordEntered: string;
  activeFont: Fonts;
  activeMatrix: DotMatrix;
  selectedSection: string;
}

const SendToScreen = (props: ControlProps) => {
  const handleClick = () => {
    // All sends an entire matrix to the backend to display as sent
    if (props.selectedSection === 'all') {
      const booleanMatrixArray = convertMatrixToBooleanArray(
        props.activeMatrix
      );

      sendMatrixToDisplay({
        matrix: booleanMatrixArray,
        password: props.passwordEntered
      });

      // Otherwise, we are sending the text for the backend to add to a specific section of the display
    } else {
      sendTextToDisplay({
        message: props.activeMessage,
        font: props.activeFont,
        section: props.selectedSection,
        password: props.passwordEntered
      });
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>Send to real Flipdot</Button>
    </div>
  );
};

export default SendToScreen;
