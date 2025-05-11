import React, { useState } from 'react';
import styles from './Tabs.module.css';

export default function Tabs({ children }) {
  // 确保children是数组
  const childrenArray = React.Children.toArray(children);
  
  // 提取所有标题
  const titles = childrenArray.map(child => child.props.title);
  
  // 状态管理当前活动tab
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabList}>
        {titles.map((title, index) => (
          <div
            key={index}
            className={`${styles.tabButton} ${index === activeTab ? styles.active : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {title}
          </div>
        ))}
      </div>
      <div className={styles.tabContent}>
        {React.cloneElement(childrenArray[activeTab])}
      </div>
    </div>
  );
}

export function Tab({ children, title }) {
  return <div className={styles.tabPanel}>{children}</div>;
} 