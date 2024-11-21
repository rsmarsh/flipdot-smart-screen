import type { DotMatrix } from '@/types/flipdot';
import Randomise from './controls/Randomise';
import TextToFont from './controls/TextToFont';
import SendToScreen from './controls/SendToScreen';
import FontSelector from './controls/FontSelector';
import SectionSelect from './controls/SectionSelect';
import styles from './Controls.module.css';
import { useState } from 'react';
import type { Fonts } from 'figlet';

interface ControlsProps {
  activeMatrix: DotMatrix;
  setMatrix: (matrix: DotMatrix) => void;
}

const Controls = (props: ControlsProps) => {
  const [activeMessage, setActiveMessage] = useState('');
  const [passwordEntered, setPasswordEntered] = useState('');
  const [activeFont, setActiveFont] = useState<Fonts>('Banner');
  const [selectedSection, setSelectedSection] = useState<string>('all');

  return (
    <div className={styles.controls}>
      <SectionSelect onSectionChange={setSelectedSection} />
      <FontSelector activeFont={activeFont} setActiveFont={setActiveFont} />
      <TextToFont
        activeMessage={activeMessage}
        passwordEntered={passwordEntered}
        activeFont={activeFont}
        setActiveMessage={setActiveMessage}
        setPasswordEntered={setPasswordEntered}
        setMatrix={props.setMatrix}
      />
      <Randomise setMatrix={props.setMatrix} />
      <SendToScreen
        activeMessage={activeMessage}
        activeMatrix={props.activeMatrix}
        passwordEntered={passwordEntered}
        activeFont={activeFont}
        selectedSection={selectedSection}
      />
    </div>
  );
};

export default Controls;
