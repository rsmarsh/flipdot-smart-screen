import styles from './SelectInput.module.css';
import { ChangeEvent, useState } from 'react';

interface SelectInputProps {
  onChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  defaultValue?: string;
  options: Record<string, string>;
}

const SelectInput = (props: SelectInputProps) => {
  return (
    <div className={styles.selectInputWrapper}>
      <label>
        {props.label}:
        <select
          name='section'
          defaultValue={props.defaultValue}
          onChange={props.onChange}
        >
          {Object.keys(props.options).map((optionName) => (
            <option key={optionName} value={optionName}>
              {props.options[optionName]}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectInput;
