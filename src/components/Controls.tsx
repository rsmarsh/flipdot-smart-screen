import type { DotMatrix } from "@/types/flipdot";
import Randomise from "./controls/Randomise";
import TextToFont from "./controls/TextToFont";
import SendToScreen from "./controls/SendToScreen";
import FontSelector from "./controls/FontSelector";
import styles from "./Controls.module.css";
import { useState } from "react";
import { Fonts } from "figlet";

interface ControlsProps {
  setMatrix: (matrix: DotMatrix) => void;
}

const Controls = (props: ControlsProps) => {
  const [activeMessage, setActiveMessage] = useState("");
  const [activeFont, setActiveFont] = useState<Fonts>("Banner");

  return (
    <div className={styles.controls}>
      <FontSelector activeFont={activeFont} setActiveFont={setActiveFont} />
      <TextToFont
        activeMessage={activeMessage}
        activeFont={activeFont}
        setActiveMessage={setActiveMessage}
        setMatrix={props.setMatrix}
      />
      <Randomise setMatrix={props.setMatrix} />
      <SendToScreen activeMessage={activeMessage} activeFont={activeFont} />
    </div>
  );
};

export default Controls;
