import styles from './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  children: string;
  isLoading?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <div>
      <button
        onClick={props.onClick}
        className={`${styles.button} ${props.isLoading ? styles.loading : ''}`}
        disabled={props.isLoading}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
