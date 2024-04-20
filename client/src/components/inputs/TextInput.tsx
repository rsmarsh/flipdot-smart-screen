import type { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import styles from './TextInput.module.css';

interface TextInputProps {
  label?: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  onChange: (newText: string) => void;
}

const TextInput = (props: TextInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    props.onChange(newValue);
  };

  const inputType = props.type || 'text';

  return (
    <div className={styles.textInputWrapper}>
      <label>
        <div className={styles.textInputLabel}>{props.label}</div>
        <input
          type={inputType}
          value={props.value}
          onChange={handleChange}
          className={styles.textInput}
        />
      </label>
    </div>
  );
};

export default TextInput;
