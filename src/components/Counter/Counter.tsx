import classNames from 'classnames';
import styles from './Counter.module.css';

type CounterProps = {
  className?: string,
  value: number,
  step: number,
  min: number,
  max: number,
  onChange?: (size: number) => void
}

function Counter(props: CounterProps) {
  const isValueValid = props.value >= props.min && props.value <= props.max;

  if (!isValueValid) {
    throw new Error(`Expected value in range between ${props.min} and ${props.max}, but passed ${props.value}.`);
  }

  const emitChangeEvent = (size: number) => {
    if (props.onChange) {
      props.onChange(size);
    }
  }

  const increaseSize = () => {
    if (props.value + props.step <= props.max) {
      emitChangeEvent(props.value + props.step);
    }
  }

  const decreaseSize = () => {
    if (props.value - props.step >= props.min) {
      emitChangeEvent(props.value - props.step);
    }
  }

  return (
    <div className={classNames(styles.counter, props.className)}>
      <button className={styles.button} onClick={decreaseSize} disabled={props.value <= props.min}>-</button>
      <span className={styles.value}>{props.value}</span>
      <button className={styles.button} onClick={increaseSize} disabled={props.value >= props.max}>+</button>
    </div>
  );
}

export default Counter;