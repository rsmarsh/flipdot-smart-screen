import { sendTextToDisplay } from '@/utils/network';
import Button from '@/components/inputs/Button';
import { Fonts } from 'figlet';

interface ControlProps {
  activeMessage: string;
  passwordEntered: string;
  activeFont: Fonts;
}

const SendToScreen = (props: ControlProps) => {
  const handleClick = () => {
    sendTextToDisplay({
      message: props.activeMessage,
      password: props.passwordEntered,
      font: props.activeFont
    });
  };

  return (
    <div>
      <Button onClick={handleClick}>Send to real Flipdot</Button>
    </div>
  );
};

export default SendToScreen;
