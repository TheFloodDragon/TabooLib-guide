import React from 'react';
import Link from '@docusaurus/Link';
import styles from './PageRef.module.css';

export default function PageRef({ to }) {
  // 从路径中提取页面标题
  const getPageTitle = (path) => {
    // 移除 .md 扩展名和路径前缀
    const cleanPath = path.replace(/\.md$/, '');
    // 获取最后一个路径部分
    const parts = cleanPath.split('/');
    const lastPart = parts[parts.length - 1];
    
    // 转换为标题格式（将连字符替换为空格并首字母大写）
    return lastPart
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className={styles.pageRef}>
      <Link to={to.replace(/\.md$/, '')}>
        <div className={styles.pageRefInner}>
          <div className={styles.pageRefTitle}>{getPageTitle(to)}</div>
          <div className={styles.pageRefArrow}>→</div>
        </div>
      </Link>
    </div>
  );
} 