import styles from './SelectInput.module.css';

interface SelectInputProps {
  onChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  defaultValue?: string;
  options: SelectOption[];
}

export interface SelectOption {
  label: string;
  value: string;
}

const SelectInput = (props: SelectInputProps) => {
  const defaultValue = props.defaultValue || props.options[0].value;

  return (
    <div className={styles.selectInputWrapper}>
      <label>
        <div className={styles.inputLabel}>{props.label}:</div>
        <select
          name='section'
          defaultValue={defaultValue}
          onChange={props.onChange}
          className={styles.selectInput}
        >
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectInput;
