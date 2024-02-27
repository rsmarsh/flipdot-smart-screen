import { sendTextToDisplay } from "@/utils/network";
import Button from "@/components/inputs/Button";
import { Fonts } from "figlet";

interface ControlProps {
  activeMessage: string;
  activeFont: Fonts;
}

const SendToScreen = (props: ControlProps) => {
  const handleClick = () => {
    sendTextToDisplay(props.activeMessage, props.activeFont);
  };

  return (
    <div>
      <Button onClick={handleClick}>Send to real Flipdot</Button>
    </div>
  );
};

export default SendToScreen;
