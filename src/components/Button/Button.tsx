import { AllHTMLAttributes } from "react";
import styles from './Button.module.css';
import classNames from "classnames";

function Button(props: AllHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classNames(props.className, styles.button)} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>
  );
}

export default Button;