import styles from './Checkbox.module.css';

interface CheckboxProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
  label: string;
}

const Checkbox = (props: CheckboxProps) => {
  return (
    <div className={styles.checkboxWrapper}>
      {props.label}:
      <input
        type='checkbox'
        className={styles.checkbox}
        checked={props.checked}
        onChange={(e) => props.onChange(e.currentTarget.checked)}
      />
    </div>
  );
};

export default Checkbox;
