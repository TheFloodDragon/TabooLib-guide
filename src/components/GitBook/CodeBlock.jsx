import React from 'react';
import styles from './CodeBlock.module.css';

export default function CodeBlock({ children, title }) {
  return (
    <div className={styles.codeBlockContainer}>
      {title && <div className={styles.codeBlockTitle}>{title}</div>}
      <div className={styles.codeBlock}>{children}</div>
    </div>
  );
} 