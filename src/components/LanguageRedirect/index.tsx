import React, { useEffect, useState } from 'react';
import './styles.css';

export default function LanguageRedirect(): JSX.Element | null {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // 检查当前域名是否已经是中文站点
    const currentDomain = window.location.hostname;
    const isCnDomain = currentDomain.endsWith('.cn');
    
    // 如果已经在中文站点，不显示提示
    if (isCnDomain) {
      return;
    }

    // 检查浏览器语言
    const browserLanguage = navigator.language || (navigator as any).userLanguage;
    const isChineseLanguage = /^zh(-Hans|-CN)?$/i.test(browserLanguage);

    // 检查本地存储，避免重复显示
    const hasRedirectChoice = localStorage.getItem('language_redirect_choice');
    
    if (isChineseLanguage && !hasRedirectChoice) {
      // 延迟显示弹窗，给页面一些加载时间
      setTimeout(() => {
        setShowDialog(true);
      }, 1000);
    }
  }, []);

  const handleRedirect = () => {
    const currentUrl = window.location.href;
    const targetUrl = currentUrl.replace(/\.(org)/, '.cn');
    
    // 记录用户选择
    localStorage.setItem('language_redirect_choice', 'redirected');
    setShowDialog(false);
    
    // 跳转到中文站点
    window.location.href = targetUrl;
  };

  const handleDismiss = () => {
    // 记录用户选择
    localStorage.setItem('language_redirect_choice', 'dismissed');
    setShowDialog(false);
  };

  if (!showDialog) {
    return null;
  }

  return (
    <div className="language-redirect-overlay">
      <div className="language-redirect-dialog">
        <div className="language-redirect-header">
          <h3>语言提示</h3>
        </div>
        <div className="language-redirect-content">
          <p>检测到您的系统语言为中文，是否跳转到中文站点以获得更好的浏览体验？</p>
        </div>
        <div className="language-redirect-actions">
          <button 
            className="language-redirect-button language-redirect-button-cancel" 
            onClick={handleDismiss}
          >
            不用了，谢谢
          </button>
          <button 
            className="language-redirect-button language-redirect-button-confirm" 
            onClick={handleRedirect}
          >
            前往中文站点
          </button>
        </div>
      </div>
    </div>
  );
} 