import React from "react";
import styles from './Warning.module.css';

export default function Warning(props: React.PropsWithChildren) {
  return (
    <p><span className={styles.marker}>WARNING</span> <span className={styles.message}>{props.children}</span></p>
  );
}