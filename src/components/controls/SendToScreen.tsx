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
}

const SendToScreen = (props: ControlProps) => {
  // const handleClick = () => {
  //   sendTextToDisplay({
  //     message: props.activeMessage,
  //     password: props.passwordEntered,
  //     font: props.activeFont
  //   });
  // };

  const handleClick = () => {
    const booleanMatrixArray = convertMatrixToBooleanArray(props.activeMatrix);

    sendMatrixToDisplay({
      matrix: booleanMatrixArray,
      password: props.passwordEntered
    });
  };

  return (
    <div>
      <Button onClick={handleClick}>Send to real Flipdot</Button>
    </div>
  );
};

export default SendToScreen;
