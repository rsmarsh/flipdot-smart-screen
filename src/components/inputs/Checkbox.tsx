interface CheckboxProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
  label: string;
}

const Checkbox = (props: CheckboxProps) => {
  return (
    <div>
      {props.label}:
      <input
        type='checkbox'
        checked={props.checked}
        onChange={(e) => props.onChange(e.currentTarget.checked)}
      />
    </div>
  );
};

export default Checkbox;
