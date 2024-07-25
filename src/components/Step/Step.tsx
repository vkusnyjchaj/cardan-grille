import React from 'react';
import styles from './Step.module.css';

type StepProps = {
  step: number;
  message: string;
  className?: string;
};

export default function Step(props: React.PropsWithChildren<StepProps>) {
  return (
    <div className={props.className}>
      <div>
        <span className={styles.step}>STEP {props.step}&nbsp;</span>
        {props.message}
      </div>
      {props.children}
    </div>
  );
}
