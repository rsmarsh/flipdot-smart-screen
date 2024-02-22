import type { ChangeEvent } from 'react';
import styles from './TextInput.module.css';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (newText: string) => void;
}

const TextInput = (props: TextInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    props.onChange(newValue);
  };

  return (
    <div className={styles.textInputWrapper}>
      <label className={styles.textInputLabel}>{props.label}</label>
      <input
        type='text'
        value={props.value}
        onChange={handleChange}
        className={styles.textInput}
      />
    </div>
  );
};

export default TextInput;
