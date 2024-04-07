import styles from './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  children: string;
}

const Button = (props: ButtonProps) => {
  return (
    <div>
      <button onClick={props.onClick} className={styles.button}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
