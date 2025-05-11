import React, { useEffect, useState, useRef } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import { IoRocketOutline, IoDocumentTextOutline, IoCodeSlashOutline } from 'react-icons/io5';

// @ts-ignore - 忽略类型错误
// 现代像素风格Banner
function HomepageHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    // 设置可见性延迟，用于初始动画
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <header ref={headerRef} className={`${styles.heroBanner} ${isVisible ? styles.visible : ''}`}>
      {/* 背景元素 */}
      <div className={styles.heroBackground}>
        <div className={styles.backgroundGradient}></div>
        <div className={styles.backgroundGrid}></div>
        <div className={styles.particlesContainer} id="particles-js"></div>
      </div>
      
      {/* 内容区域 */}
      <div className={styles.bannerContainer}>
        {/* 标题区域 */}
        <div className={styles.heroContent}>
          <div className={styles.pixelTitleWrapper}>
            <h2 className={styles.pixelTitle}>TabooLib</h2>
          </div>
          
          <h1 className={styles.mainTitle}>跨平台服务端插件开发框架</h1>
          
          <div className={styles.subtitleWrapper}>
            <p className={styles.subtitle}>
              强大、易用、高效的Minecraft插件开发框架
              <br />
              集成跨平台支持，简化开发流程，让您专注于创造力
            </p>
          </div>
          
          {/* 操作按钮区 */}
          <div className={styles.ctaButtons}>
            <Link className={styles.primaryCta} to="/intro">
              <IoRocketOutline className={styles.ctaIcon} />
              <span>快速开始</span>
            </Link>
            <Link className={styles.secondaryCta} to="https://tabooproject.org/">
              <IoDocumentTextOutline className={styles.ctaIcon} />
              <span>官方文档</span>
            </Link>
            <Link className={styles.secondaryCta} to="/kether-list">
              <IoCodeSlashOutline className={styles.ctaIcon} />
              <span>Kether 语句</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  
  // 加载粒子效果和移除默认导航
  useEffect(() => {
    // 添加自定义样式以隐藏导航和页脚
    const style = document.createElement('style');
    style.innerHTML = `
      nav.navbar, footer.footer, .navbar-sidebar, .theme-doc-sidebar-container, .theme-doc-footer {
        display: none !important;
      }
      body {
        margin: 0 !important;
        padding: 0 !important;
        overflow-x: hidden !important;
      }
      #__docusaurus {
        margin: 0 !important;
        padding: 0 !important;
      }
      .main-wrapper {
        margin: 0 !important;
        padding: 0 !important;
      }
    `;
    document.head.appendChild(style);
    
    // 移除DOM中的导航元素
    document.querySelector('nav.navbar')?.remove();
    document.querySelector('footer.footer')?.remove();
    
    // 加载粒子效果
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore - particles.js全局对象
      window.particlesJS && window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: '#3a85ff' },
          shape: { type: 'circle' },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: '#3a85ff', opacity: 0.2, width: 1 },
          move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out' }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true
          }
        },
        retina_detect: true
      });
    };

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className={styles.homepageWrapper}>
      <HomepageHeader />
    </div>
  );
} 