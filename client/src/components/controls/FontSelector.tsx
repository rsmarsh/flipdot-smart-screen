import { fontList } from '@/utils/fontList';
import type { Fonts } from 'figlet';

interface FontSelectorProps {
  activeFont: Fonts;
  setActiveFont: (newFont: Fonts) => void;
}

const FontSelector = (props: FontSelectorProps) => {
  const onFontChange = (newFont: Fonts) => {
    props.setActiveFont(newFont);
  };

  return (
    <div>
      <label>
        <div style={{ color: '#fff' }}>Font:</div>
        <select
          style={{ height: '3rem' }}
          value={props.activeFont}
          onChange={(e) => onFontChange(e.currentTarget.value as Fonts)}
        >
          {fontList.map((fontName) => (
            <option
              key={fontName}
              value={fontName}
              // selected={fontName === props.activeFont}
            >
              {fontName}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default FontSelector;
