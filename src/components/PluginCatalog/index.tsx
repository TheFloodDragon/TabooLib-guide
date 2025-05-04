import React, { useState, useEffect, useMemo, useRef } from 'react';
import styles from './styles.module.css';
import { IoSearch, IoGrid, IoList, IoApps, IoClose, IoChevronDown, IoChevronForward, IoHomeOutline, 
  IoLogoGithub, IoDocumentTextOutline, IoDownloadOutline, IoStorefront, IoGlobeOutline, 
  IoFolderOutline, IoArrowBack, 
  IoFilter, IoSwapVertical, IoTimeOutline, IoTextOutline, IoCodeOutline } from 'react-icons/io5';
import { FaGamepad } from 'react-icons/fa';
import Link from '@docusaurus/Link';
import { Plugin, plugins, getAllPlugins, getCategories, getLetters } from './data/plugins';

// 布局类型
type LayoutType = 'grid' | 'compact' | 'list';

// 排序类型
type SortType = 'name' | 'letter' | 'category';

/**
 * PluginCatalog 组件
 */
export default function PluginCatalog(): JSX.Element {
  // 状态管理
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(['all']));
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [layoutType, setLayoutType] = useState<LayoutType>('grid');
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null);
  const [sortType, setSortType] = useState<SortType>('name');
  const [sortAscending, setSortAscending] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);
  // 新增状态：侧边栏状态和可见性
  const [sidebarState, setSidebarState] = useState<'entering' | 'visible' | 'leaving' | 'hidden'>('hidden');
  const [sidebarPlugin, setSidebarPlugin] = useState<Plugin | null>(null);
  
  // 侧边栏引用 - 用于检测点击外部
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // 类别和字母列表
  const categories = getCategories();
  const letters = getLetters();
  
  // 初始加载
  useEffect(() => {
    // 模拟加载
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 处理点击外部关闭侧边栏
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 确保点击的是空白区域，而不是另一个插件卡片
      const target = event.target as HTMLElement;
      const isPluginCard = target.closest(`.${styles.pluginCard}`);
      
      if (selectedPlugin && sidebarRef.current && !sidebarRef.current.contains(target as Node) && !isPluginCard) {
        closePluginDetail();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedPlugin]);

  // 侧边栏动画状态管理
  useEffect(() => {
    if (sidebarState === 'entering') {
      // 入场动画完成后设置为可见状态
      const timer = setTimeout(() => {
        setSidebarState('visible');
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [sidebarState]);

  // 搜索处理函数
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 清除搜索
  const clearSearch = () => {
    setSearchTerm('');
  };

  // 排序函数 - 移到filteredPlugins之前定义
  const sortPlugins = (pluginsToSort: Plugin[]): Plugin[] => {
    return [...pluginsToSort].sort((a, b) => {
      let comparison = 0;
      
      switch (sortType) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'letter':
          comparison = a.letter.localeCompare(b.letter);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }
      
      return sortAscending ? comparison : -comparison;
    });
  };

  // 筛选插件
  const filteredPlugins = useMemo(() => {
    let result = plugins.filter(plugin => {
      // 搜索词筛选
      const matchesSearch = 
        searchTerm === '' || 
        plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        plugin.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plugin.id.toLowerCase().includes(searchTerm.toLowerCase());

      // 类别筛选
      const matchesCategory = 
        selectedCategories.has('all') || 
        selectedCategories.has(plugin.category);
        
      // 字母筛选
      const matchesLetter = 
        selectedLetter === 'all' || 
        plugin.letter === selectedLetter;

      return matchesSearch && matchesCategory && matchesLetter;
    });
    
    // 应用排序
    result = sortPlugins(result);
    
    return result;
  }, [searchTerm, selectedCategories, selectedLetter, sortType, sortAscending]);

  // 处理排序变更
  const handleSortChange = (newSortType: SortType) => {
    if (sortType === newSortType) {
      // 如果选择相同的排序方式，则反转排序方向
      setSortAscending(!sortAscending);
    } else {
      // 如果选择不同的排序方式，设置为升序
      setSortType(newSortType);
      setSortAscending(true);
    }
  };

  // 处理类别选择
  const handleCategorySelect = (category: string) => {
    const newSelected = new Set(selectedCategories);
    
    if (category === 'all') {
      // 如果选择"全部"，则清除其他所有选择
      newSelected.clear();
      newSelected.add('all');
    } else {
      // 如果已选择了"全部"，先移除它
      if (newSelected.has('all')) {
        newSelected.delete('all');
      }
      
      // 如果已选择了这个类别，则移除它
      if (newSelected.has(category)) {
        newSelected.delete(category);
        // 如果移除后没有任何选择，则重新选择"全部"
        if (newSelected.size === 0) {
          newSelected.add('all');
        }
      } else {
        // 否则添加这个类别
        newSelected.add(category);
      }
    }
    
    setSelectedCategories(newSelected);
  };

  // 字母选择
  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter);
  };

  // 布局切换
  const handleLayoutChange = (layout: LayoutType) => {
    setLayoutType(layout);
  };

  // 打开插件详情
  const openPluginDetail = (plugin: Plugin) => {
    // 如果已经有插件详情打开，直接更新内容，不需要关闭再打开
    if (selectedPlugin) {
      setSidebarPlugin(plugin);
      setSelectedPlugin(plugin);
    } else {
      // 第一次打开，显示入场动画
      setSidebarPlugin(plugin);
      setSidebarState('entering');
      setSelectedPlugin(plugin);
      
      // 添加类名以触发动画
      document.body.classList.add('sidebar-open');
      
      // 防止滚动穿透
      document.body.style.overflow = 'hidden';
    }
  };

  // 关闭插件详情
  const closePluginDetail = () => {
    setSidebarState('leaving');
    
    // 等待动画完成后再移除组件
    setTimeout(() => {
      setSelectedPlugin(null);
      setSidebarState('hidden');
      
      // 移除类名以恢复动画
      document.body.classList.remove('sidebar-open');
      
      // 恢复滚动
      document.body.style.overflow = '';
    }, 350); // 动画持续时间
  };

  // 切换筛选面板
  const toggleFilterPanel = () => {
    setFilterVisible(!filterVisible);
  };

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
      'ui': '界面'
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

  // 获取链接类型显示名称，你可以在这里来定义其他的按钮分类qwq
  const getLinkTypeName = (type: string) => {
    switch (type) {
      case 'github':
        return 'GitHub';
      case 'docs':
        return '文档';
      case 'download':
        return '下载';
      case 'mcbbs':
        return 'MCBBS';
      case 'minebbs':
        return 'MineBBS';
      case 'spigotmc':
        return 'SpigotMC';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  // 渲染排序按钮
  const renderSortButton = (type: SortType, label: string, icon: React.ReactNode) => {
    const isActive = sortType === type;
    
    return (
      <button
        className={`${styles.sortButton} ${isActive ? styles.active : ''}`}
        onClick={() => handleSortChange(type)}
        title={`按${label}排序`}
      >
        {icon}
        <span>{label}</span>
        {isActive && (
          <IoChevronDown className={sortAscending ? styles.ascending : styles.descending} />
        )}
      </button>
    );
  };

  // 渲染加载状态
  if (isLoading) {
    return (
      <div className={styles.ketherContainer}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.logoSection}>
              <div className={styles.logo}>
                <IoStorefront />
              </div>
              <h2 className={styles.title}>TabooLib 插件目录</h2>
            </div>
          </div>
        </div>
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  // 渲染空状态
  if (filteredPlugins.length === 0) {
    return (
      <div className={styles.ketherContainer}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.logoSection}>
              <div className={styles.logo}>
                <IoStorefront />
              </div>
              <h2 className={styles.title}>TabooLib 插件目录</h2>
            </div>
            <div className={styles.searchSection}>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="搜索插件..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <IoSearch className={styles.searchIcon} />
                {searchTerm && (
                  <button className={styles.clearButton} onClick={clearSearch} aria-label="清除搜索">
                    <IoClose />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <IoClose />
          </div>
          <h3>没有找到匹配的插件</h3>
          <p>尝试使用不同的搜索词或清除筛选条件</p>
          <button className={styles.resetButton} onClick={() => {
            setSearchTerm('');
            setSelectedCategories(new Set(['all']));
            setSelectedLetter('all');
          }}>
            重置筛选条件
          </button>
        </div>
      </div>
    );
  }
  
  // 渲染插件卡片
  const renderPluginCard = (plugin: Plugin) => {
    // 列表视图特殊布局
    if (layoutType === 'list') {
      // 筛选最重要的链接显示在卡片上
      const getImportantLinks = (links: Plugin['links']) => {
        // 优先找下载链接
        const downloadLinks = links.filter(link => link.type === 'download');
        if (downloadLinks.length > 0) {
          return [downloadLinks[0]];
        }
        
        // 其次是文档链接
        const docsLinks = links.filter(link => link.type === 'docs');
        if (docsLinks.length > 0) {
          return [docsLinks[0]];
        }
        
        // 最后是其他链接，最多显示2个
        return links.slice(0, 2);
      };
      
      const linksToShow = getImportantLinks(plugin.links);
      
      return (
        <div 
          key={plugin.id} 
          className={styles.pluginCard} 
          onClick={() => openPluginDetail(plugin)}
        >
          <div className={styles.pluginIconAndInfo}>
            <div className={styles.pluginIcon}>{plugin.letter}</div>
            <div className={styles.pluginDetails}>
              <h3 className={styles.pluginName}>{plugin.name}</h3>
              <p className={styles.pluginDescription}>{plugin.description}</p>
              <div className={styles.pluginTags}>
                <span className={`${styles.pluginTag} ${styles.categoryTag}`}>
                  {getCategoryDisplayName(plugin.category)}
                </span>
                <span className={`${styles.pluginTag} ${styles.letterTag}`}>
                  {plugin.letter}
                </span>
                {plugin.links.length > linksToShow.length && (
                  <span className={`${styles.pluginTag} ${styles.moreLinksTag}`}>
                    更多链接
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.pluginLinks} onClick={(e) => e.stopPropagation()}>
            {linksToShow.map((link, index) => (
              link.type === 'download' ? (
                <a 
                  key={index}
                  href={link.url}
                  className={styles.downloadButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`下载 ${plugin.name}`}
                >
                  <IoDownloadOutline /> 下载
                </a>
              ) : (
                <a 
                  key={index}
                  href={link.url}
                  className={styles.pluginLink}
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
      );
    }

    // 默认（网格和紧凑）视图的原始布局
    // 筛选最重要的链接显示在卡片上
    const getImportantLinks = (links: Plugin['links']) => {
      // 优先找下载链接
      const downloadLinks = links.filter(link => link.type === 'download');
      if (downloadLinks.length > 0) {
        // 如果有下载链接，只显示下载链接
        return [downloadLinks[0]];
      }
      
      // 如果没有下载链接，最多显示2个其他链接
      return links.slice(0, 2);
    };
    
    const linksToShow = getImportantLinks(plugin.links);
    
    return (
      <div 
        key={plugin.id} 
        className={styles.pluginCard} 
        onClick={() => openPluginDetail(plugin)}
      >
        <div className={styles.pluginIcon}>{plugin.letter}</div>
        <h3 className={styles.pluginName}>{plugin.name}</h3>
        <p className={styles.pluginDescription}>{plugin.description}</p>
        <div className={styles.pluginTags}>
          <span className={`${styles.pluginTag} ${styles.categoryTag}`}>
            {getCategoryDisplayName(plugin.category)}
          </span>
          <span className={`${styles.pluginTag} ${styles.letterTag}`}>
            {plugin.letter}
          </span>
          {plugin.links.length > linksToShow.length && (
            <span className={`${styles.pluginTag} ${styles.moreLinksTag}`}>
              更多链接
            </span>
          )}
        </div>
        <div className={styles.pluginLinks} onClick={(e) => e.stopPropagation()}>
          {linksToShow.map((link, index) => (
            link.type === 'download' ? (
              <a 
                key={index}
                href={link.url}
                className={styles.downloadButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`下载 ${plugin.name}`}
              >
                <IoDownloadOutline /> 下载
              </a>
            ) : (
              <a 
                key={index}
                href={link.url}
                className={styles.pluginLink}
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
    );
  };

  // 主界面渲染
  return (
    <div className={`${styles.ketherContainer} ${sidebarState !== 'hidden' ? styles.withSidebar : ''}`}>
      {/* 头部区域 */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoSection}>
            <div className={styles.logo}>
              <IoStorefront />
            </div>
            <h1 className={styles.title}>TabooLib 插件目录</h1>
          </div>
          <div className={styles.searchSection}>
            <div className={styles.searchContainer}>
              <div className={styles.searchIcon}>
                <IoSearch />
              </div>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="搜索插件..."
                value={searchTerm}
                onChange={handleSearch}
              />
              {searchTerm && (
                <button className={styles.clearButton} onClick={clearSearch}>
                  <IoClose />
                </button>
              )}
            </div>
            <button
              className={`${styles.filterToggle} ${filterVisible ? styles.active : ''}`}
              onClick={toggleFilterPanel}
              aria-label="筛选条件"
            >
              <IoFilter />
              <span>筛选</span>
              {(selectedCategories.size > 1 || selectedLetter !== 'all') && (
                <span className={styles.filterBadge}>
                  {(selectedCategories.size > 1 ? selectedCategories.size - 1 : 0) + (selectedLetter !== 'all' ? 1 : 0)}
                </span>
              )}
            </button>
            <div className={styles.layoutControls}>
              <button
                className={`${styles.layoutButton} ${layoutType === 'grid' ? styles.active : ''}`}
                onClick={() => handleLayoutChange('grid')}
                title="网格视图"
                aria-label="网格视图"
              >
                <IoGrid />
              </button>
              <button
                className={`${styles.layoutButton} ${layoutType === 'compact' ? styles.active : ''}`}
                onClick={() => handleLayoutChange('compact')}
                title="宽松视图"
                aria-label="宽松视图"
              >
                <IoApps />
              </button>
              <button
                className={`${styles.layoutButton} ${layoutType === 'list' ? styles.active : ''}`}
                onClick={() => handleLayoutChange('list')}
                title="列表视图"
                aria-label="列表视图"
              >
                <IoList />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 筛选面板 */}
      <div className={`${styles.filtersWrapper} ${filterVisible ? styles.show : ''}`}>
        <div className={styles.filtersPanel}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterSectionTitle}>排序方式</h3>
            <div className={styles.sortButtons}>
              {renderSortButton('name', '名称', <IoTextOutline />)}
              {renderSortButton('letter', '字母', <IoCodeOutline />)}
              {renderSortButton('category', '分类', <IoFolderOutline />)}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterSectionTitle}>分类筛选 <span className={styles.filterSectionSubTitle}>(可多选)</span></h3>
            <div className={styles.filterChips}>
              <div 
                className={`${styles.filterChip} ${selectedCategories.has('all') ? styles.active : ''}`}
                onClick={() => handleCategorySelect('all')}
              >
                全部
              </div>
              {categories.map(category => (
                <div
                  key={category}
                  className={`${styles.filterChip} ${selectedCategories.has(category) ? styles.active : ''}`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {getCategoryDisplayName(category)}
                  {selectedCategories.has(category) && !selectedCategories.has('all') && (
                    <span className={styles.chipCheckmark}>✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterSectionTitle}>字母筛选</h3>
            <div className={styles.filterChips}>
              <div 
                className={`${styles.filterChip} ${selectedLetter === 'all' ? styles.active : ''}`}
                onClick={() => handleLetterSelect('all')}
              >
                全部
              </div>
              {letters.map(letter => (
                <div
                  key={letter}
                  className={`${styles.filterChip} ${selectedLetter === letter ? styles.active : ''}`}
                  onClick={() => handleLetterSelect(letter)}
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 活跃标签 */}
      {(searchTerm || selectedCategories.size > 1 || selectedLetter !== 'all') && (
        <div className={styles.activeTagsContainer}>
          <div className={styles.activeTags}>
            {searchTerm && (
              <div className={styles.activeTag} onClick={clearSearch}>
                <span>搜索: {searchTerm}</span>
                <IoClose />
              </div>
            )}
            
            {/* 显示所有已选类别 */}
            {!selectedCategories.has('all') && Array.from(selectedCategories).map(category => (
              <div 
                key={category} 
                className={styles.activeTag} 
                onClick={() => {
                  // 如果只剩一个类别，点击时会自动切换回"全部"
                  handleCategorySelect(category);
                }}
              >
                <span>分类: {getCategoryDisplayName(category)}</span>
                <IoClose />
              </div>
            ))}
            
            {selectedLetter !== 'all' && (
              <div className={styles.activeTag} onClick={() => handleLetterSelect('all')}>
                <span>字母: {selectedLetter}</span>
                <IoClose />
              </div>
            )}
            
            {/* 清除全部按钮 */}
            {(searchTerm || !selectedCategories.has('all') || selectedLetter !== 'all') && (
              <div className={styles.activeTagsClearButton} onClick={() => {
                setSearchTerm('');
                setSelectedCategories(new Set(['all']));
                setSelectedLetter('all');
              }}>
                <span>清除全部</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 主内容区域 */}
      <div className={styles.contentWrapper}>
        <div className={`${styles.content} ${sidebarState !== 'hidden' ? styles.withSidebar : ''} ${styles[layoutType]}`}>
          {/* 结果统计 */}
          <div className={styles.resultsHeader}>
            <div className={styles.resultStats}>
              <span className={styles.resultCount}>{filteredPlugins.length}</span>
              <span className={styles.resultLabel}>个插件</span>
            </div>
            <div className={styles.currentSort}>
              <IoSwapVertical />
              当前排序: 
              <span className={styles.currentSortType}>
                {sortType === 'name' && '名称'}
                {sortType === 'letter' && '字母'}
                {sortType === 'category' && '分类'}
                <IoChevronDown className={sortAscending ? styles.ascending : styles.descending} />
              </span>
            </div>
          </div>

          {/* 插件区域 - 直接使用filteredPlugins确保排序正确生效 */}
          <div className={styles.pluginsGrid}>
            {filteredPlugins.map(plugin => renderPluginCard(plugin))}
          </div>
          
          {/* 底部提示信息 */}
          <div className={styles.disclaimerContainer}>
            <div className={styles.disclaimer}>
              <IoTimeOutline className={styles.disclaimerIcon} />
              <p className={styles.disclaimerText}>
                本插件目录中的内容均由社区成员人工收录和整理，可能不包含所有TabooLib插件。
                如果您发现有缺失或需要更新的插件，欢迎在<a href="https://github.com/8aka-Team/TabooLib-guide" target="_blank" rel="noopener noreferrer">GitHub仓库</a>中提交贡献。
              </p>
            </div>
          </div>
        </div>

        {/* 插件详情 - 始终渲染但通过状态控制可见性 */}
        {(sidebarState !== 'hidden' || selectedPlugin) && (
          <div 
            className={`${styles.detailSidebar} ${styles[sidebarState]}`} 
            ref={sidebarRef}
          >
            <div className={styles.detailHeader}>
              <button 
                className={styles.backButton}
                onClick={closePluginDetail}
                aria-label="返回"
              >
                <IoArrowBack size={22} />
              </button>
              <h2 className={styles.detailTitle}>{sidebarPlugin?.name || selectedPlugin?.name}</h2>
            </div>
            
            <div className={styles.detailBody}>
              {/* 插件基本信息 */}
              <div className={styles.detailSection}>
                <div className={styles.pluginInfoRow}>
                  <div className={styles.pluginIconLarge}>
                    {sidebarPlugin?.letter || selectedPlugin?.letter}
                  </div>
                  <div className={styles.pluginInfoDetails}>
                    <h3 className={styles.detailPluginName}>{sidebarPlugin?.name || selectedPlugin?.name}</h3>
                    
                    <div className={styles.metaRow}>
                      <div className={styles.metaItem}>
                        <IoFolderOutline />
                        <span>分类: {getCategoryDisplayName(sidebarPlugin?.category || selectedPlugin?.category || '')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.detailTags}>
                  <div className={styles.detailTag}>
                    {getCategoryDisplayName(sidebarPlugin?.category || selectedPlugin?.category || '')}
                  </div>
                  <div className={styles.detailTag}>
                    {sidebarPlugin?.letter || selectedPlugin?.letter}
                  </div>
                </div>
              </div>
              
              {/* 插件描述 */}
              <div className={styles.detailSection}>
                <h3 className={styles.detailSectionTitle}>插件描述</h3>
                <p className={styles.detailDescription}>
                  {sidebarPlugin?.detail || selectedPlugin?.detail || sidebarPlugin?.description || selectedPlugin?.description}
                </p>
              </div>
              
              {/* 链接列表 */}
              <div className={styles.detailSection}>
                <h3 className={styles.detailSectionTitle}>相关链接</h3>
                
                {/* 链接分组显示 */}
                {(() => {
                  // 获取所有链接
                  const links = sidebarPlugin?.links || selectedPlugin?.links || [];
                  
                  // 按类型分组
                  const groupedLinks: Record<string, typeof links> = {};
                  links.forEach(link => {
                    if (!groupedLinks[link.type]) {
                      groupedLinks[link.type] = [];
                    }
                    groupedLinks[link.type].push(link);
                  });
                  
                  return (
                    <div className={styles.linksList}>
                      {/* 优先显示下载链接 */}
                      {groupedLinks['download']?.map((link, index) => (
                        <a 
                          key={`download-${index}`}
                          href={link.url}
                          className={styles.detailDownloadButton}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`下载 ${sidebarPlugin?.name || selectedPlugin?.name}`}
                        >
                          <IoDownloadOutline /> 下载插件
                        </a>
                      ))}
                      
                      {/* 显示其他类型的链接，并在有多个相同类型链接时显示序号 */}
                      {Object.entries(groupedLinks)
                        .filter(([type]) => type !== 'download')
                        .map(([type, typeLinks]) => (
                          <div key={type} className={styles.linkGroup}>
                            {typeLinks.length > 1 && (
                              <div className={styles.linkGroupTitle}>
                                {getLinkTypeName(type)}
                              </div>
                            )}
                            
                            {typeLinks.map((link, index) => (
                              <a 
                                key={`${type}-${index}`}
                                href={link.url}
                                className={styles.detailLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${link.label || getLinkTypeName(type)} 链接`}
                              >
                                {getLinkIcon(type)} 
                                {typeLinks.length > 1 
                                  ? `${link.label || getLinkTypeName(type)} ${index + 1}` 
                                  : link.label || getLinkTypeName(type)}
                              </a>
                            ))}
                          </div>
                        ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}