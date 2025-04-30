import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageQuickStart from '../components/HomepageQuickStart';
import HomepageCodeExample from '../components/HomepageCodeExample';
import styles from './styles.module.css';

// @ts-ignore - 忽略类型错误
// 现代像素风格Banner
function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      {/* 背景元素 */}
      <div className={styles.heroBackgroundGlow}></div>
      <div className={styles.heroBackgroundGrid}></div>
      <div className={styles.heroBackgroundDots}></div>
      <div className={styles.particlesContainer} id="particles-js"></div>
      
      {/* 内容区域 */}
      <div className={styles.bannerContainer}>

        
        <div className={styles.heroContent}>
          <div className={styles.pixelTitleWrapper}>
          <h2 className={styles.pixelTitle}>TabooLib</h2>
          </div>
          <h1 className={styles.mainTitle}>跨平台服务端插件开发框架</h1>
        
          <div className={styles.subtitleWrapper}>
            <p className={styles.subtitle}>
            这里是 TabooLib 开发框架的非官方用户文档
            <br />
            这里集合收录社区中的常用资源
          </p>
        </div>
        
          <div className={styles.ctaButtons}>
            <Link className={styles.primaryCta} to="/intro">
            快速开始
          </Link>
            <Link className={styles.secondaryCta} to="https://tabooproject.org/">
            官方文档
          </Link>
            <Link className={styles.secondaryCta} to="/kether">
            Kether 语句
          </Link>
          </div>

          {/* 添加装饰元素 */}
          <div className={styles.decorationPixel1}></div>
          <div className={styles.decorationPixel2}></div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  
  // 添加粒子效果脚本
  React.useEffect(() => {
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
    };
  }, []);
  
  return (
    <>
      <div className={styles.fullscreenBanner}>
        <HomepageHeader />
      </div>
      
      <Layout
        title={`${siteConfig.title} - 多平台 Minecraft 插件开发框架`}
        description="Taboolib 非官方用户文档，整合了大量社区资源">
        <main>
          <HomepageQuickStart />
          <HomepageCodeExample />
        </main>
      </Layout>
    </>
  );
} 