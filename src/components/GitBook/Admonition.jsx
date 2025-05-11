import React from 'react';
import styles from './Admonition.module.css';

export default function Admonition({ children, type }) {
  const getIconAndClass = (type) => {
    switch (type) {
      case 'info':
        return { 
          icon: 'ℹ️',
          className: styles.info
        };
      case 'warning':
        return { 
          icon: '⚠️',
          className: styles.warning
        };
      case 'danger':
        return { 
          icon: '🚫',
          className: styles.danger
        };
      case 'success':
        return { 
          icon: '✅',
          className: styles.success
        };
      default:
        return { 
          icon: 'ℹ️',
          className: styles.info
        };
    }
  };

  const { icon, className } = getIconAndClass(type);

  return (
    <div className={`${styles.admonition} ${className}`}>
      <div className={styles.admonitionHeading}>
        <span className={styles.admonitionIcon}>{icon}</span>
      </div>
      <div className={styles.admonitionContent}>{children}</div>
    </div>
  );
} 