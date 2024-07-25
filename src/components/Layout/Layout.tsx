import React from 'react';
import styles from './Layout.module.css';

export default function Layout(props: React.PropsWithChildren) {
  return <div className={styles.layout}>{props.children}</div>;
}
