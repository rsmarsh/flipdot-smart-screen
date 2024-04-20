import styles from './SelectInput.module.css';

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
        <div className={styles.inputLabel}>{props.label}:</div>
        <select
          name='section'
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          className={styles.selectInput}
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
