import React from 'react';
import styles from './styles.module.css';
import { IoArrowBack, IoDownloadOutline, IoLogoGithub, IoDocumentTextOutline, IoGlobeOutline, IoFolderOutline } from 'react-icons/io5';
import { FaGamepad } from 'react-icons/fa';
import { Plugin } from './data/plugins';

interface PluginDetailProps {
  plugin: Plugin;
  onClose: () => void;
}

/**
 * 插件详情组件
 */
const PluginDetail: React.FC<PluginDetailProps> = ({ plugin, onClose }) => {
  // 获取类别显示名称
  const getCategoryDisplayName = (category: string): string => {
    const categoryNames: Record<string, string> = {
      'menu': '菜单',
      'npc': 'NPC',
      'quest': '任务',
      'script': '脚本',
      'item': '物品',
      'utility': '实用',
      'chat': '聊天',
      'level': '等级',
      'attribute': '属性',
      'dungeon': '地牢',
      'enchant': '附魔',
      'expansion': '拓展',
      'effect': '效果',
      'economy': '经济',
      'ui': '界面',
      'strengthen': '强化'
    };
    
    return categoryNames[category] || category;
  };

  // 获取链接图标
  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'github':
        return <IoLogoGithub size={16} />;
      case 'docs':
        return <IoDocumentTextOutline size={16} />;
      case 'download':
        return <IoDownloadOutline size={16} />;
      case 'mcbbs':
      case 'minebbs':
      case 'spigotmc':
        return <FaGamepad size={14} />;
      default:
        return <IoGlobeOutline size={16} />;
    }
  };

  return (
    <div className={styles.detailSidebar}>
      <div className={styles.detailHeader}>
        <button 
          className={styles.backButton}
          onClick={onClose}
          aria-label="返回"
        >
          <IoArrowBack size={22} />
        </button>
        <h2 className={styles.detailTitle}>{plugin.name}</h2>
      </div>
      
      <div className={styles.detailBody}>
        {/* 插件基本信息 */}
        <div className={styles.detailSection}>
          <div className={styles.pluginInfoRow}>
            <div className={styles.pluginIconLarge}>
              {plugin.letter}
            </div>
            <div className={styles.pluginInfoDetails}>
              <h3 className={styles.detailPluginName}>{plugin.name}</h3>
              <div className={styles.detailPluginId}>{plugin.id}</div>
              
              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <IoFolderOutline />
                  <span>分类: {getCategoryDisplayName(plugin.category)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.detailTags}>
            <div className={styles.detailTag}>
              {getCategoryDisplayName(plugin.category)}
            </div>
            <div className={styles.detailTag}>
              {plugin.letter}
            </div>
          </div>
        </div>
        
        {/* 插件描述 */}
        <div className={styles.detailSection}>
          <h3 className={styles.detailSectionTitle}>插件描述</h3>
          <p className={styles.detailDescription}>
            {plugin.detail || plugin.description}
          </p>
        </div>
        
        {/* 链接列表 */}
        <div className={styles.detailSection}>
          <h3 className={styles.detailSectionTitle}>相关链接</h3>
          <div className={styles.linksList}>
            {plugin.links.map((link, index) => (
              link.type === 'download' ? (
                <a 
                  key={index}
                  href={link.url}
                  className={styles.detailDownloadButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`下载 ${plugin.name}`}
                >
                  <IoDownloadOutline /> 下载插件
                </a>
              ) : (
                <a 
                  key={index}
                  href={link.url}
                  className={styles.detailLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} 链接`}
                >
                  {getLinkIcon(link.type)} {link.label}
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PluginDetail; 