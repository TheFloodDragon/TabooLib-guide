import React, { useState, useEffect, useMemo } from 'react';
import styles from './styles.module.css';
import { IoSearch, IoFilter, IoGrid, IoList, IoApps, IoClose, IoChevronDown, IoChevronForward } from 'react-icons/io5';
import { KetherAction, KetherActionModule, modules, getAllActions } from './actions';
// @ts-ignore
import CodeBlock from '@theme/CodeBlock';

// 布局类型
type LayoutType = 'grid' | 'compact' | 'list';

// 定义组件
export default function KetherList(): JSX.Element {
  // 状态管理
  const [actions, setActions] = useState<KetherAction[]>([]);
  const [moduleList, setModuleList] = useState<KetherActionModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedAction, setSelectedAction] = useState<KetherAction | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [layoutType, setLayoutType] = useState<LayoutType>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'public' | 'private'>('all');
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  // 检测屏幕尺寸
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 1200);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // 模糊搜索辅助函数
  const fuzzyMatch = (text: string, query: string): boolean => {
    if (!query) return true;
    if (!text) return false;
    
    // 转换为小写进行比较
    text = text.toLowerCase();
    query = query.toLowerCase();
    
    // 精确子字符串匹配
    if (text.includes(query)) return true;
    
    // 分词匹配（词组中每个词都匹配）
    const queryTerms = query.split(/\s+/).filter(term => term.length > 0);
    if (queryTerms.length > 1) {
      return queryTerms.every(term => fuzzyMatch(text, term));
    }
    
    // 特殊字符处理 - 忽略标点符号和特殊字符
    const cleanQuery = query.replace(/[^\p{L}\p{N}]/gu, '');
    const cleanText = text.replace(/[^\p{L}\p{N}]/gu, '');
    
    if (cleanText.includes(cleanQuery)) return true;
    
    // 缩写匹配 - 检查首字母是否匹配
    if (query.length <= 5) {
      const textWords = text.split(/\s+/);
      const firstLetters = textWords.map(word => word.charAt(0)).join('');
      if (firstLetters.includes(query)) return true;
    }
    
    // 编辑距离匹配（Levenshtein距离）
    // 允许较短的查询有更少的错误，较长的查询有更多的错误
    const maxDistance = Math.max(1, Math.floor(query.length / 4));
    
    // 如果查询字符串较短，在文本中寻找编辑距离较小的子串
    if (query.length <= 5) {
      for (let i = 0; i <= cleanText.length - query.length; i++) {
        const subText = cleanText.substr(i, query.length + 2);
        if (getEditDistance(subText, cleanQuery) <= maxDistance) {
          return true;
        }
      }
    }
    
    // 字符串序列匹配（query中的字符按顺序出现在text中）
    let textIndex = 0;
    for (let i = 0; i < query.length; i++) {
      const char = query[i];
      // 查找当前字符
      const found = text.indexOf(char, textIndex);
      if (found === -1) return false;
      textIndex = found + 1;
    }
    
    return true;
  };
  
  // 计算编辑距离 (Levenshtein距离)
  const getEditDistance = (a: string, b: string): number => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    
    const matrix: number[][] = [];
    
    // 初始化矩阵
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    
    // 填充矩阵
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // 替换
            matrix[i][j - 1] + 1,     // 插入
            matrix[i - 1][j] + 1      // 删除
          );
        }
      }
    }
    
    return matrix[b.length][a.length];
  };

  // 处理转义字符，将字符串中的'\n'转换为实际的换行符
  const parseText = (text: string) => {
    // 正则表达式匹配转义序列的模式
    return text.replace(/\\n/g, '\n')
               .replace(/\\r/g, '\r')
               .replace(/\\t/g, '\t');
  };

  // 用于渲染带换行符的文本
  const RenderWithLineBreaks = ({text}: {text: string}) => {
    const parsed = parseText(text);
    return (
      <>
        {parsed.split('\n').map((line, index, array) => (
          <React.Fragment key={index}>
            {line}
            {index < array.length - 1 && <br />}
          </React.Fragment>
        ))}
      </>
    );
  };

  // 获取模块颜色
  const getModuleColor = (provider: string): string => {
    const module = moduleList.find(m => m.name === provider);
    return module?.color || '#6b7280'; // 默认灰色
  };

  // 从模块加载数据
  useEffect(() => {
    const timer = setTimeout(() => {
      setModuleList(modules);
      setActions(getAllActions());
      setIsLoading(false);
      
      // 默认展开所有类别
      const allCategories = new Set<string>();
      getAllActions().forEach(action => {
        if (Array.isArray(action.categories)) {
          action.categories.forEach(cat => allCategories.add(cat));
        }
      });
      setExpandedCategories(allCategories);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // 获取所有类别
  const categories = useMemo(() => {
    const cats = new Set<string>();
    actions.forEach(action => {
      if (Array.isArray(action.categories)) {
        action.categories.forEach(cat => cats.add(cat));
      }
    });
    return Array.from(cats).sort();
  }, [actions]);

  // 获取所有提供者
  const providers = useMemo(() => {
    return moduleList.map(module => module.name).sort();
  }, [moduleList]);

  // 筛选动作
  const filteredActions = useMemo(() => {
    return actions.filter(action => {
      const matchesSearch = 
        searchTerm === '' || 
        fuzzyMatch(action.id, searchTerm) ||
        fuzzyMatch(action.name, searchTerm) ||
        fuzzyMatch(action.description, searchTerm);
      
      const matchesCategory = selectedCategory === 'all' || 
        (Array.isArray(action.categories) && action.categories.includes(selectedCategory));
      const matchesProvider = selectedProvider === 'all' || action.provider === selectedProvider;
      const matchesType = selectedType === 'all' || action.type === selectedType;
      const matchesTab = activeTab === 'all' || action.type === activeTab;
      
      return matchesSearch && matchesCategory && matchesProvider && matchesType && matchesTab;
    });
  }, [actions, searchTerm, selectedCategory, selectedProvider, selectedType, activeTab]);

  // 按类别分组
  const groupedActions = useMemo(() => {
    const groups: Record<string, KetherAction[]> = {};
    
    // 初始化所有类别
    categories.forEach(cat => {
      groups[cat] = [];
    });
    
    filteredActions.forEach(action => {
      if (Array.isArray(action.categories)) {
        action.categories.forEach(cat => {
          if (!groups[cat]) {
            groups[cat] = [];
          }
          // 避免重复添加
          if (!groups[cat].some(a => a.id === action.id)) {
            groups[cat].push(action);
          }
        });
      }
    });
    
    // 过滤掉没有动作的分类
    return Object.entries(groups)
      .filter(([_, actions]) => actions.length > 0)
      .sort(([a], [b]) => a.localeCompare(b));
  }, [filteredActions, categories]);

  // 按提供者分组
  const groupedByProvider = useMemo(() => {
    const groups: Record<string, KetherAction[]> = {};
    
    filteredActions.forEach(action => {
      if (!groups[action.provider]) {
        groups[action.provider] = [];
      }
      groups[action.provider].push(action);
    });
    
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredActions]);

  // 切换类别展开状态
  const toggleCategoryExpanded = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // 展开所有类别
  const expandAllCategories = () => {
    const allCategories = new Set<string>();
    categories.forEach(cat => allCategories.add(cat));
    setExpandedCategories(allCategories);
  };

  // 折叠所有类别
  const collapseAllCategories = () => {
    setExpandedCategories(new Set());
  };

  // 清除筛选条件
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedProvider('all');
    setSelectedType('all');
    setActiveTab('all');
  };

  // 处理搜索输入
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 获取动作类型翻译
  const translateType = (type: string) => {
    switch (type) {
      case 'public': return '公共';
      case 'private': return '私有';
      default: return type;
    }
  };

  // 主渲染函数
  return (
    <div className={`${styles.ketherContainer} ${selectedAction && !isSmallScreen ? styles.withSidebar : ''}`}>
      {/* 顶部导航栏 */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoSection}>
            <div className={styles.logo}>K</div>
            <h1 className={styles.title}>Kether Explorer</h1>
          </div>
          
          <div className={styles.searchSection}>
            <div className={styles.searchContainer}>
              <div className={styles.searchIcon}>
                <IoSearch />
              </div>
              <input
                type="text"
                placeholder="搜索动作..."
                value={searchTerm}
                onChange={handleSearch}
                className={styles.searchInput}
              />
              {searchTerm && (
                <button className={styles.clearButton} onClick={() => setSearchTerm('')}>
                  <IoClose />
                </button>
              )}
            </div>
            
            <button 
              className={`${styles.filterToggle} ${showFilters ? styles.active : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <IoFilter />
              <span>筛选</span>
            </button>
            
            <div className={styles.layoutControls}>
              <button 
                className={`${styles.layoutButton} ${layoutType === 'grid' ? styles.active : ''}`}
                onClick={() => setLayoutType('grid')}
                title="网格视图"
              >
                <IoGrid />
              </button>
              <button 
                className={`${styles.layoutButton} ${layoutType === 'compact' ? styles.active : ''}`}
                onClick={() => setLayoutType('compact')}
                title="紧凑视图"
              >
                <IoApps />
              </button>
              <button 
                className={`${styles.layoutButton} ${layoutType === 'list' ? styles.active : ''}`}
                onClick={() => setLayoutType('list')}
                title="列表视图"
              >
                <IoList />
              </button>
            </div>
          </div>
        </div>

        {/* 选项卡 */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabList}>
            <button
              className={`${styles.tabButton} ${activeTab === 'all' ? styles.active : ''}`}
              onClick={() => setActiveTab('all')}
            >
              全部动作
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'public' ? styles.active : ''}`}
              onClick={() => setActiveTab('public')}
            >
              公有动作
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'private' ? styles.active : ''}`}
              onClick={() => setActiveTab('private')}
            >
              私有动作
            </button>
          </div>
        </div>
        
        {/* 筛选器面板 */}
        {showFilters && (
          <div className={styles.filtersPanel}>
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}>类型</div>
              <div className={styles.filterOptions}>
                <button 
                  className={`${styles.filterOption} ${selectedType === 'all' ? styles.active : ''}`}
                  onClick={() => setSelectedType('all')}
                >
                  全部
                </button>
                <button 
                  className={`${styles.filterOption} ${selectedType === 'public' ? styles.active : ''}`}
                  onClick={() => setSelectedType('public')}
                >
                  公共
                </button>
                <button 
                  className={`${styles.filterOption} ${selectedType === 'private' ? styles.active : ''}`}
                  onClick={() => setSelectedType('private')}
                >
                  私有
                </button>
              </div>
            </div>
            
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}>类别</div>
              <div className={styles.filterOptions}>
                <button 
                  className={`${styles.filterOption} ${selectedCategory === 'all' ? styles.active : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  全部
                </button>
                {categories.map(category => (
                  <button 
                    key={category}
                    className={`${styles.filterOption} ${selectedCategory === category ? styles.active : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}>提供者</div>
              <div className={styles.filterOptions}>
                <button 
                  className={`${styles.filterOption} ${selectedProvider === 'all' ? styles.active : ''}`}
                  onClick={() => setSelectedProvider('all')}
                >
                  全部
                </button>
                {providers.map(provider => (
                  <button 
                    key={provider}
                    className={`${styles.filterOption} ${selectedProvider === provider ? styles.active : ''}`}
                    onClick={() => setSelectedProvider(provider)}
                    style={{ borderLeft: `3px solid ${getModuleColor(provider)}` }}
                  >
                    {provider}
                  </button>
                ))}
              </div>
            </div>
            
            {(searchTerm || selectedCategory !== 'all' || selectedProvider !== 'all' || selectedType !== 'all') && (
              <button className={styles.clearFiltersButton} onClick={clearFilters}>
                <IoClose />
                清除筛选
              </button>
            )}
          </div>
        )}
        
        {/* 活跃筛选标签 */}
        {(searchTerm || selectedCategory !== 'all' || selectedProvider !== 'all' || selectedType !== 'all' || activeTab !== 'all') && (
          <div className={styles.activeTags}>
            {searchTerm && (
              <div className={styles.activeTag} onClick={() => setSearchTerm('')}>
                <span>搜索: {searchTerm}</span>
                <IoClose />
              </div>
            )}
            {activeTab !== 'all' && (
              <div className={styles.activeTag} onClick={() => setActiveTab('all')}>
                <span>动作类型: {activeTab === 'public' ? '公有' : '私有'}</span>
                <IoClose />
              </div>
            )}
            {selectedType !== 'all' && (
              <div className={styles.activeTag} onClick={() => setSelectedType('all')}>
                <span>类型: {selectedType === 'public' ? '公共' : '私有'}</span>
                <IoClose />
              </div>
            )}
            {selectedCategory !== 'all' && (
              <div className={styles.activeTag} onClick={() => setSelectedCategory('all')}>
                <span>类别: {selectedCategory}</span>
                <IoClose />
              </div>
            )}
            {selectedProvider !== 'all' && (
              <div 
                className={styles.activeTag} 
                onClick={() => setSelectedProvider('all')}
                style={{ borderLeft: `3px solid ${getModuleColor(selectedProvider)}` }}
              >
                <span>提供者: {selectedProvider}</span>
                <IoClose />
              </div>
            )}
          </div>
        )}
      </div>

      {/* 主要内容区域 */}
      <div className={`${styles.content} ${selectedAction && !isSmallScreen ? styles.withSidebar : ''}`}>
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
            <p>加载 Kether 动作...</p>
          </div>
        ) : filteredActions.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3>未找到匹配的动作</h3>
            <p>尝试修改筛选条件或清除搜索词</p>
            <button className={styles.resetButton} onClick={clearFilters}>
              重置筛选
            </button>
          </div>
        ) : (
          <>
            <div className={styles.resultsHeader}>
              <div className={styles.resultStats}>
                <span className={styles.resultCount}>{filteredActions.length}</span>
                <span className={styles.resultLabel}>个动作</span>
                {(groupedActions.length > 1) && (
                  <div className={styles.expandCollapseControls}>
                    <button className={styles.expandCollapseButton} onClick={expandAllCategories}>展开全部</button>
                    <span>|</span>
                    <button className={styles.expandCollapseButton} onClick={collapseAllCategories}>折叠全部</button>
                  </div>
                )}
              </div>
            </div>
            
            <div className={`${styles.actionGroups} ${styles[layoutType]}`}>
              {groupedActions.map(([category, categoryActions]) => (
                <div key={category} className={styles.categorySection}>
                  <div 
                    className={styles.categoryHeader}
                    onClick={() => toggleCategoryExpanded(category)}
                  >
                    <h2 className={styles.categoryTitle}>
                      {expandedCategories.has(category) ? <IoChevronDown /> : <IoChevronForward />}
                      <span>{category}</span>
                      <span className={styles.categoryBadge}>{categoryActions.length}</span>
                    </h2>
                  </div>
                  
                  {expandedCategories.has(category) && (
                    <div className={styles.actionsGrid}>
                      {categoryActions.map(action => (
                        <div 
                          key={action.id}
                          className={`${styles.actionCard} ${selectedAction?.id === action.id ? styles.selected : ''}`}
                          onClick={() => setSelectedAction(action)}
                          style={{ borderLeft: `3px solid ${getModuleColor(action.provider)}` }}
                        >
                          <div className={styles.actionCardContent}>
                            <div className={styles.actionHeader}>
                              <h3 className={styles.actionName}>{action.name}</h3>
                              <div className={styles.actionMeta}>
                                <span className={`${styles.actionTag} ${styles[action.type]}Type`}>
                                  {action.type === 'public' ? '公共' : '私有'}
                                </span>
                                <span 
                                  className={styles.actionTag}
                                  style={{ 
                                    backgroundColor: getModuleColor(action.provider),
                                    color: '#fff'
                                  }}
                                >
                                  {action.provider}
                                </span>
                              </div>
                            </div>
                            
                            <div className={styles.actionId}>{action.id}</div>
                            
                            <p className={styles.actionDescription}>
                              {action.description.length > 100 && layoutType !== 'list'
                                ? `${parseText(action.description).split('\n')[0].substring(0, 100)}...`
                                : parseText(action.description).split('\n')[0]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 详情侧边栏 */}
      {selectedAction && (
        <div className={`${styles.detailSidebar} ${isSmallScreen ? styles.fullscreen : ''}`}>
          <div className={styles.detailHeader} style={{ borderBottom: `2px solid ${getModuleColor(selectedAction.provider)}` }}>
            <button 
              className={styles.closeDetailButton}
              onClick={() => setSelectedAction(null)}
            >
              <IoClose />
            </button>
            <div className={styles.detailTitle}>{selectedAction.name}</div>
            <div className={styles.detailId}>{selectedAction.id}</div>
          </div>
          
          <div className={styles.sidebarLayout}>
            {/* 类别索引区域 */}
            <div className={styles.categoryIndex}>
              <div className={styles.indexHeader}>
                <h3>分类导航</h3>
              </div>
              
              {selectedAction.categories && selectedAction.categories.map(category => (
                <div key={category} className={styles.indexCategory}>
                  <div className={styles.indexCategoryTitle}>{category}</div>
                  <div className={styles.indexActionsList}>
                    {actions.filter(action => 
                      action.categories && 
                      action.categories.includes(category)
                    ).map(action => (
                      <div 
                        key={action.id} 
                        className={`${styles.indexActionItem} ${selectedAction.id === action.id ? styles.indexActionActive : ''}`}
                        onClick={() => setSelectedAction(action)}
                        style={{ borderLeft: `2px solid ${getModuleColor(action.provider)}`}}
                      >
                        {action.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* 详情内容区域 */}
            <div className={styles.detailBody}>
              <div className={styles.detailTags}>
                <span className={`${styles.detailTag} ${styles[selectedAction.type]}Tag`}>
                  {selectedAction.type === 'public' ? '公共' : '私有'}
                </span>
                <span 
                  className={styles.detailTag}
                  style={{ 
                    backgroundColor: getModuleColor(selectedAction.provider),
                    color: '#fff'
                  }}
                >
                  {selectedAction.provider}
                </span>
                {Array.isArray(selectedAction.categories) && selectedAction.categories.map((category, index) => (
                  <span key={index} className={`${styles.detailTag} ${styles.detailCategoryTag}`}>
                    {category}
                  </span>
                ))}
              </div>
              
              <div className={styles.detailSection}>
                <h3 className={styles.detailSectionTitle}>描述</h3>
                <p className={styles.detailDescription}>
                  <RenderWithLineBreaks text={selectedAction.description} />
                </p>
              </div>
              
              {selectedAction.syntax && (
                <div className={styles.detailSection}>
                  <h3 className={styles.detailSectionTitle}>语法</h3>
                  <CodeBlock language="kotlin" showLineNumbers>
                    {parseText(selectedAction.syntax)}
                  </CodeBlock>
                </div>
              )}
              
              {selectedAction.example && (
                <div className={styles.detailSection}>
                  <h3 className={styles.detailSectionTitle}>示例代码</h3>
                  <CodeBlock language="kotlin" showLineNumbers>
                    {parseText(selectedAction.example)}
                  </CodeBlock>
                </div>
              )}

              <div className={styles.detailSection}>
                <h3 className={styles.detailSectionTitle}>提供者</h3>
                <p className={styles.detailProviderInfo}>
                  {selectedAction.provider === 'TabooLib' 
                    ? '原生动作' 
                    : `由 ${selectedAction.provider} 提供的${translateType(selectedAction.type)}动作`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 底部统计 */}
      <div className={`${styles.footer} ${selectedAction && !isSmallScreen ? styles.withSidebar : ''}`}>
        <div className={styles.statsSection}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{actions.length}</span>
            <span className={styles.statLabel}>总动作数</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{actions.filter(a => a.type === 'public').length}</span>
            <span className={styles.statLabel}>公共动作</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{actions.filter(a => a.type === 'private').length}</span>
            <span className={styles.statLabel}>私有动作</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{categories.length}</span>
            <span className={styles.statLabel}>类别数</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{moduleList.length}</span>
            <span className={styles.statLabel}>提供者数</span>
          </div>
        </div>
      </div>
    </div>
  );
}