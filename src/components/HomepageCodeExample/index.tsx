import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const usageExamples = [
  {
    label: '不知道写啥',
    code: `# 不知道写啥

不知道写啥:
  # 不知道写啥
  不知道写啥: 不知道写啥
  # 不知道写啥
  不知道写啥: '不知道写啥'
  # 不知道写啥
  不知道写啥:
    - '不知道写啥'
    - '不知道写啥'
  # 不知道写啥
  不知道写啥: 不知道写啥
  # 不知道写啥
  不知道写啥:
    不知道写啥: 不知道写啥
  # 不知道写啥
  不知道写啥:
    - '不知道写啥'
    - '不知道写啥'`
  },
  {
    label: '不知道写啥',
    code: `# 不知道写啥

不知道写啥:
  # 不知道写啥
  不知道写啥: |-
    # 不知道写啥
    不知道写啥 "不知道写啥"
    # 不知道写啥
    不知道写啥 不知道写啥
    # 不知道写啥
    不知道写啥 "不知道写啥" 不知道写啥 不知道写啥
    # 不知道写啥
    不知道写啥 "不知道写啥" 不知道写啥 不知道写啥 不知道写啥 不知道写啥

不知道写啥:
  # 不知道写啥
  不知道写啥: |-
    # 不知道写啥
    不知道写啥 "不知道写啥"
    # 不知道写啥
    不知道写啥 "不知道写啥" 不知道写啥 不知道写啥 不知道写啥 不知道写啥
    # 不知道写啥
    不知道写啥 不知道写啥
    # 不知道写啥
    不知道写啥 不知道写啥 不知道写啥 "不知道写啥"`
  },
  {
    label: '不知道写啥',
    code: `# 不知道写啥

# 不知道写啥
不知道写啥 不知道写啥 = 不知道写啥
不知道写啥 不知道写啥 = 不知道写啥.不知道写啥
不知道写啥 不知道写啥 = 不知道写啥.不知道写啥

# 不知道写啥
不知道写啥 不知道写啥.不知道写啥("不知道写啥") {
  # 不知道写啥
  不知道写啥 不知道写啥 "不知道写啥"
  
  # 不知道写啥
  不知道写啥 不知道写啥 不知道写啥 不知道写啥 {
    # 不知道写啥
    不知道写啥 不知道写啥 不知道写啥 不知道写啥
    不知道写啥 不知道写啥 不知道写啥
  }
} 不知道写啥 {
  # 不知道写啥
  不知道写啥 不知道写啥 "不知道写啥"
}

# 不知道写啥
不知道写啥 不知道写啥(不知道写啥) {
  # 不知道写啥
  不知道写啥 "不知道写啥" 不知道写啥 {不知道写啥} 不知道写啥 不知道写啥 不知道写啥,不知道写啥,不知道写啥
  不知道写啥 "不知道写啥" 不知道写啥 {不知道写啥} 不知道写啥 不知道写啥
}`
  },
];

export default function HomepageCodeExample(): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className={styles.codeExample}>
      <div className="container">
        <h2 className={styles.codeExampleTitle}>不知道写啥</h2>
        <p className={styles.codeExampleSubtitle}>
          不知道写啥
        </p>
        
        <div className={styles.codeExampleTabs}>
          <ul className={styles.codeExampleTabList}>
            {usageExamples.map((example, index) => (
              <li
                key={index}
                className={clsx(styles.codeExampleTab, index === activeTab && styles.codeExampleTabActive)}
                onClick={() => setActiveTab(index)}
              >
                {example.label}
              </li>
            ))}
          </ul>
          
          <div className={styles.codeExampleContent}>
            <pre>
              <code>{usageExamples[activeTab].code}</code>
            </pre>
          </div>
        </div>
        
        <div className={styles.codeExampleDescription}>
          <p>
            不知道写啥
          </p>
          <div style={{ textAlign: 'center' }}>
            <button className={styles.codeExampleButton}>
              不知道写啥
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 