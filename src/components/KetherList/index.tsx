import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
  
  // 侧边栏宽度管理
  const [sidebarWidth, setSidebarWidth] = useState<number>(450);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  
  // 筛选器状态
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    category: [],
    provider: [],
    type: []
  });

  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);

  // 检测屏幕尺寸
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 1200);
      
      // 根据窗口宽度自动调整布局类型
      if (window.innerWidth <= 768) {
        setLayoutType('list'); // 移动设备上使用列表视图
      } else if (window.innerWidth <= 1100) {
        setLayoutType('compact'); // 中等屏幕使用紧凑视图
      } else {
        // 保持用户的选择，如果之前没有选择过，则默认为网格视图
        setLayoutType(prevLayout => 
          prevLayout === 'list' || prevLayout === 'compact' ? prevLayout : 'grid'
        );
      }
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
      
      // 默认展开所有类别，无论是单个分类还是多个分类
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
      
      // 多选筛选逻辑
      const matchesCategory = 
        activeFilters.category.length === 0 || 
        (Array.isArray(action.categories) && 
          action.categories.some(cat => activeFilters.category.includes(cat)));
      
      const matchesProvider = 
        activeFilters.provider.length === 0 || 
        activeFilters.provider.includes(action.provider);
      
      const matchesTab = activeTab === 'all' || action.type === activeTab;
      
      return matchesSearch && matchesCategory && matchesProvider && matchesTab;
    });
  }, [actions, searchTerm, activeFilters, activeTab]);

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

  // 切换筛选面板
  const toggleFilterPanel = () => {
    setShowFilters(!showFilters);
  };

  // 修改筛选类型的处理函数，支持多选
  const toggleFilter = (type: 'category' | 'provider' | 'type', value: string) => {
    setActiveFilters(prev => {
      const newFilters = {...prev};
      if (newFilters[type].includes(value)) {
        // 如果已经存在，就移除
        newFilters[type] = newFilters[type].filter(v => v !== value);
      } else {
        // 如果不存在，就添加
        newFilters[type] = [...newFilters[type], value];
      }
      return newFilters;
    });
  };
  
  // 清除所有筛选条件
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all'); // 保留这个状态更新以确保向后兼容
    setSelectedProvider('all'); // 保留这个状态更新以确保向后兼容
    setActiveTab('all');
    setActiveFilters({
      category: [],
      provider: [],
      type: []
    });
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

  // 处理点击事件，点击空白区域关闭侧边栏
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // 判断点击元素是否是卡片或卡片内部元素
      const isCardClick = target.closest(`.${styles.actionCard}`) !== null;
      
      // 只有在侧边栏打开、点击不在侧边栏内部、且不是点击卡片时才关闭
      if (selectedAction && sidebarRef.current && 
          !sidebarRef.current.contains(target) && 
          !isCardClick) {
        setSelectedAction(null);
      }
    };

    // 添加点击事件监听
    document.addEventListener('mousedown', handleClickOutside);

    // 清除监听
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedAction]);

  // 优化cookie操作辅助函数，增加调试信息
  const setCookie = (name: string, value: string, days: number = 365) => {
    try {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = `expires=${date.toUTCString()}`;
      // 设置cookie的path为根路径，确保整个网站可用
      document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
      console.log(`设置Cookie: ${name}=${value}`);
      
      // 同时保存到localStorage作为备份方案
      localStorage.setItem(name, value);
    } catch (e) {
      console.error('设置Cookie失败:', e);
      // 当cookie设置失败时，尝试使用localStorage
      try {
        localStorage.setItem(name, value);
        console.log(`Cookie设置失败，使用localStorage: ${name}=${value}`);
      } catch (localStorageError) {
        console.error('localStorage保存也失败:', localStorageError);
      }
    }
  };
  
  const getCookie = (name: string): string | null => {
    try {
      const nameEQ = `${name}=`;
      const ca = document.cookie.split(';');
      
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
          const value = c.substring(nameEQ.length, c.length);
          console.log(`从Cookie读取: ${name}=${value}`);
          return value;
        }
      }
      
      // 如果cookie不存在，尝试从localStorage读取
      const localValue = localStorage.getItem(name);
      if (localValue) {
        console.log(`从localStorage读取: ${name}=${localValue}`);
        return localValue;
      }
      
      console.log(`未找到${name}的存储值`);
      return null;
    } catch (e) {
      console.error('获取Cookie失败:', e);
      
      // 尝试从localStorage读取
      try {
        const localValue = localStorage.getItem(name);
        if (localValue) {
          console.log(`Cookie获取失败，从localStorage读取: ${name}=${localValue}`);
          return localValue;
        }
      } catch (localStorageError) {
        console.error('localStorage读取也失败:', localStorageError);
      }
      
      return null;
    }
  };
  
  // 改进初始加载宽度的逻辑，确保始终能找到并应用保存的宽度
  useEffect(() => {
    const loadSavedWidth = () => {
      const DEFAULT_WIDTH = 450;
      const MIN_WIDTH = 300;
      const MAX_WIDTH = window.innerWidth * 0.8;
      
      try {
        console.log('尝试读取保存的侧边栏宽度...');
        
        // 尝试从cookie或localStorage读取
        const savedWidth = getCookie('ketherListSidebarWidth');
        
        if (savedWidth) {
          const width = parseInt(savedWidth, 10);
          if (!isNaN(width) && width >= MIN_WIDTH && width <= MAX_WIDTH) {
            console.log(`应用保存的宽度: ${width}px`);
            
            // 更新状态
            setSidebarWidth(width);
            
            // 直接设置CSS变量供样式使用
            document.documentElement.style.setProperty('--kether-list-sidebar-width', `${width}px`);
            
            return width;
          } else {
            console.log(`保存的宽度${width}px无效，使用默认宽度`);
          }
        }
        
        // 使用默认宽度
        console.log(`使用默认宽度: ${DEFAULT_WIDTH}px`);
        document.documentElement.style.setProperty('--kether-list-sidebar-width', `${DEFAULT_WIDTH}px`);
        return DEFAULT_WIDTH;
      } catch (e) {
        console.error('读取保存的宽度时出错:', e);
        
        // 使用默认值
        document.documentElement.style.setProperty('--kether-list-sidebar-width', `${DEFAULT_WIDTH}px`);
        return DEFAULT_WIDTH;
      }
    };
    
    // 执行加载
    const width = loadSavedWidth();
    setSidebarWidth(width);
  }, []); // 仅在组件挂载时执行一次
  
  // 当侧边栏显示时应用宽度
  useEffect(() => {
    if (!isSmallScreen && selectedAction && sidebarRef.current) {
      console.log(`侧边栏已显示，应用宽度: ${sidebarWidth}px`);
      
      // 应用宽度到DOM和CSS变量
      sidebarRef.current.style.width = `${sidebarWidth}px`;
      document.documentElement.style.setProperty('--kether-list-sidebar-width', `${sidebarWidth}px`);
      
      // 更新内容区域宽度
      const contentElements = document.querySelectorAll(`.${styles.content}`);
      contentElements.forEach((element: Element) => {
        const htmlElement = element as HTMLElement;
        if (htmlElement) {
          htmlElement.style.width = `calc(100% - ${sidebarWidth}px)`;
        }
      });
    }
  }, [selectedAction, sidebarWidth, isSmallScreen]); // 添加sidebarWidth作为依赖项

  // 重置侧边栏宽度
  const handleResetSidebarWidth = () => {
    const defaultWidth = 450;
    
    // 更新状态
    setSidebarWidth(defaultWidth);
    
    // 直接应用到DOM和CSS变量
    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${defaultWidth}px`;
    }
    document.documentElement.style.setProperty('--kether-list-sidebar-width', `${defaultWidth}px`);
    
    // 更新内容区域宽度
    const contentElements = document.querySelectorAll(`.${styles.content}`);
    contentElements.forEach((element: Element) => {
      const htmlElement = element as HTMLElement;
      if (htmlElement) {
        htmlElement.style.width = `calc(100% - ${defaultWidth}px)`;
      }
    });
    
    // 保存到cookie和localStorage
    setCookie('ketherListSidebarWidth', defaultWidth.toString());
    console.log(`侧边栏宽度已重置为默认值: ${defaultWidth}px`);
  };
  
  // 添加拖拽实现，优化拖拽体验
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // 记录拖拽开始时的位置和宽度
    const startX = e.clientX;
    const startWidth = sidebarWidth;
    
    // 添加拖拽指示样式
    document.body.classList.add(styles.resizingBody);
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (isSmallScreen) return;
      
      // 计算新宽度：向左拖动宽度增加，向右拖动宽度减少
      const deltaX = startX - moveEvent.clientX;
      const newWidth = Math.min(
        Math.max(startWidth + deltaX, 300), // 最小宽度300px
        window.innerWidth * 0.8  // 最大宽度为窗口的80%
      );
      
      // 设置拖动状态
      setIsResizing(true);
      
      // 更新侧边栏宽度
      setSidebarWidth(newWidth);
      
      // 应用样式到UI
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      
      // 直接应用样式以避免重渲染延迟
      if (sidebarRef.current) {
        sidebarRef.current.style.width = `${newWidth}px`;
        sidebarRef.current.style.transition = 'none';
      }
      
      // 更新CSS变量，确保全局一致性
      document.documentElement.style.setProperty('--kether-list-sidebar-width', `${newWidth}px`);
      
      // 更新内容区域宽度
      const contentElements = document.querySelectorAll(`.${styles.content}`);
      contentElements.forEach((element: Element) => {
        const htmlElement = element as HTMLElement;
        if (htmlElement) {
          htmlElement.style.width = `calc(100% - ${newWidth}px)`;
          htmlElement.style.transition = 'none';
        }
      });
      
      // 计算新的网格列数以适应内容区域
      calculateGridColumns();
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      // 获取当前实际宽度，而不是依赖状态值
      let finalWidth = sidebarWidth;
      if (sidebarRef.current) {
        const computedWidth = window.getComputedStyle(sidebarRef.current).width;
        const numericWidth = parseInt(computedWidth, 10);
        if (!isNaN(numericWidth)) {
          finalWidth = numericWidth;
          // 确保状态也同步更新
          setSidebarWidth(numericWidth);
        }
      }
      
      // 取消拖动状态
      setIsResizing(false);
      document.body.classList.remove(styles.resizingBody);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      // 恢复过渡动画
      if (sidebarRef.current) {
        sidebarRef.current.style.transition = 'width 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
      }
      
      const contentElements = document.querySelectorAll(`.${styles.content}`);
      contentElements.forEach((element: Element) => {
        const htmlElement = element as HTMLElement;
        if (htmlElement) {
          htmlElement.style.transition = 'width 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
        }
      });
      
      // 在拖拽结束后更新CSS变量，确保全局一致性
      document.documentElement.style.setProperty('--kether-list-sidebar-width', `${finalWidth}px`);
      
      // 确保使用最新的宽度值保存到cookie和localStorage
      setCookie('ketherListSidebarWidth', finalWidth.toString());
      console.log(`拖拽结束，保存宽度: ${finalWidth}px`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // 添加计算网格列数的逻辑，优化内容布局
  const calculateGridColumns = useCallback(() => {
    if (isSmallScreen || !selectedAction) {
      return undefined;
    }
    
    // 计算剩余的内容区域宽度（窗口宽度减去侧边栏宽度）
    const contentWidth = window.innerWidth - sidebarWidth;
    
    // 根据内容区域宽度和当前布局类型计算合适的列数
    if (layoutType === 'grid') {
      // 网格布局
      if (contentWidth >= 1600) return 4; // 超宽屏
      if (contentWidth >= 1200) return 3; // 宽屏
      if (contentWidth >= 800) return 2; // 普通宽度
      return 1; // 较窄
    } else if (layoutType === 'compact') {
      // 紧凑布局
      if (contentWidth >= 1400) return 3; // 超宽屏
      if (contentWidth >= 1000) return 2; // 宽屏
      return 1; // 普通或较窄
    } else {
      // 列表布局始终为1列
      return 1;
    }
  }, [isSmallScreen, selectedAction, sidebarWidth, layoutType]);
  
  // 计算网格列数
  const gridColumns = calculateGridColumns();
  
  // 监听窗口大小变化和侧边栏宽度变化，重新计算列数
  useEffect(() => {
    const handleResize = () => {
      // 强制重新渲染以更新网格列数
      // 这里只需要调用calculateGridColumns就会触发重新渲染
      calculateGridColumns();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateGridColumns]);

  // 主渲染函数
  return (
    <div className={`${styles.ketherContainer} ${selectedAction && !isSmallScreen ? styles.withSidebar : ''}`}>
      {/* 顶部导航栏 */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoSection}>
            <div className={styles.logo}>K</div>
            <h2 className={styles.title}>Kether Explorer</h2>
          </div>
          
          <div className={styles.searchSection}>
            <div className={styles.searchContainer}>
              <div className={styles.searchIcon}>
                <IoSearch />
              </div>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="搜索 Kether 动作..."
                value={searchTerm}
                onChange={handleSearch}
              />
              {searchTerm && (
                <button className={styles.clearButton} onClick={() => setSearchTerm('')}>
                  <IoClose />
                </button>
              )}
            </div>
            
            <button 
              className={`${styles.filterToggle} ${showFilters ? styles.active : ''}`}
              onClick={toggleFilterPanel}
              aria-label="筛选条件"
            >
              <IoFilter />
              筛选
              {Object.values(activeFilters).flat().length > 0 && (
                <span className={styles.filterBadge}>
                  {Object.values(activeFilters).flat().length}
                </span>
              )}
            </button>
            
            {/* 布局控制按钮 */}
            <div className={styles.layoutControls}>
              <button 
                className={`${styles.layoutButton} ${layoutType === 'grid' ? styles.active : ''}`}
                onClick={() => setLayoutType('grid')}
                title="网格视图"
                aria-label="网格视图"
              >
                <IoGrid />
              </button>
              <button 
                className={`${styles.layoutButton} ${layoutType === 'compact' ? styles.active : ''}`}
                onClick={() => setLayoutType('compact')}
                title="紧凑视图"
                aria-label="紧凑视图"
              >
                <IoApps />
              </button>
              <button 
                className={`${styles.layoutButton} ${layoutType === 'list' ? styles.active : ''}`}
                onClick={() => setLayoutType('list')}
                title="列表视图"
                aria-label="列表视图"
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
        
        {/* 筛选面板 */}
        <div className={`${styles.filtersWrapper} ${showFilters ? styles.show : ''}`}>
          <div className={styles.filtersPanel}>
            {/* 类别筛选 */}
            <div className={styles.filterSection}>
              <h3 className={styles.filterSectionTitle}>类别</h3>
              <div className={styles.filterChips}>
                {categories.map(category => (
                <div 
                  key={category}
                  className={`${styles.filterChip} ${activeFilters.category.includes(category) ? styles.active : ''}`}
                  onClick={() => toggleFilter('category', category)}
                  >
                  {category}
                  {activeFilters.category.includes(category) && <IoClose className={styles.chipCloseIcon} />}
                </div>
                ))}
              </div>
            </div>
            
            {/* 提供者筛选 */}
            <div className={styles.filterSection}>
              <h3 className={styles.filterSectionTitle}>提供者</h3>
              <div className={styles.filterChips}>
                {moduleList.map(module => (
                <div
                  key={module.name}
                  className={`${styles.filterChip} ${activeFilters.provider.includes(module.name) ? styles.active : ''}`}
                  onClick={() => toggleFilter('provider', module.name)}
                  style={activeFilters.provider.includes(module.name) ? {} : { borderLeft: `3px solid ${getModuleColor(module.name)}` }}
                  >
                  {module.name}
                  {activeFilters.provider.includes(module.name) && <IoClose className={styles.chipCloseIcon} />}
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* 活跃标签 */}
        {(searchTerm || activeFilters.category.length > 0 || activeFilters.provider.length > 0 || activeTab !== 'all') && (
          <div className={styles.activeTagsContainer}>
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
              {activeFilters.category.map(category => (
                <div key={category} className={styles.activeTag} onClick={() => toggleFilter('category', category)}>
                  <span>类别: {category}</span>
                  <IoClose />
                </div>
              ))}
              {activeFilters.provider.map(provider => (
                <div 
                  key={provider}
                  className={styles.activeTag} 
                  onClick={() => toggleFilter('provider', provider)}
                  style={{ borderLeft: `3px solid ${getModuleColor(provider)}` }}
                >
                  <span>提供者: {provider}</span>
                  <IoClose />
                </div>
              ))}
              
              {(searchTerm || activeFilters.category.length > 0 || activeFilters.provider.length > 0 || activeTab !== 'all') && (
                <div className={styles.activeTagsClearButton} onClick={clearFilters}>
                  <span>清除全部</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 主要内容区域 */}
      <div 
        className={styles.content}
        style={{ 
          width: selectedAction && !isSmallScreen ? `calc(100% - ${sidebarWidth}px)` : '100%',
          transition: isResizing ? 'none' : 'width 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      >
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
                  {/* 如果只有一个分类，不显示分类标题，直接展示内容 */}
                  {groupedActions.length > 1 ? (
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
                  ) : null}
                  
                  {/* 如果只有一个分类或者分类被展开，则显示内容 */}
                  {(groupedActions.length === 1 || expandedCategories.has(category)) && (
                    <div 
                      className={styles.actionsGrid}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: gridColumns 
                          ? `repeat(${gridColumns}, 1fr)` 
                          : undefined,
                        gap: selectedAction && !isSmallScreen ? '16px' : '24px',
                        padding: selectedAction && !isSmallScreen ? '16px' : '20px 24px',
                        transition: isResizing ? 'none' : 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
                      }}
                    >
                      {categoryActions.map(action => (
                        <div 
                          key={`${category}-${action.provider}-${action.id}`}
                          className={`${styles.actionCard} ${selectedAction?.id === action.id ? styles.selected : ''}`}
                          onClick={() => setSelectedAction(action)}
                          style={{ borderLeft: `3px solid ${getModuleColor(action.provider)}` }}
                        >
                          <div className={styles.actionCardContent}>
                            <div className={styles.actionHeader}>
                              <h3 className={styles.actionName}>{action.name}</h3>
                              <div className={styles.actionMeta}>
                                <span className={`${styles.actionTag} ${action.type === 'public' ? styles.publicType : styles.privateType}`}>
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
        <div 
          ref={sidebarRef}
          className={`${styles.detailSidebar} ${isSmallScreen ? styles.fullscreen : ''}`}
          style={{
            width: !isSmallScreen ? `${sidebarWidth}px` : '100%',
            transition: isResizing ? 'none' : 'width 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        >
          {/* 使用更宽的拖动手柄 */}
          {!isSmallScreen && (
            <div 
              className={styles.resizeHandle}
              ref={resizeHandleRef}
              onMouseDown={handleResizeStart}
              onDoubleClick={handleResetSidebarWidth}
              title="拖动调整宽度 (双击重置)"
            >
              <div className={styles.resizeHandleIndicator} />
            </div>
          )}
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
              
              {selectedAction.categories && selectedAction.categories.length === 1 ? (
                // 只有一个分类时的布局
                <div className={styles.indexCategory}>
                  <div className={styles.indexCategoryTitle}>{selectedAction.categories[0]}</div>
                  <div className={styles.indexActionsList}>
                    {actions.filter(action => 
                      action.categories && 
                      action.categories.includes(selectedAction.categories[0])
                    ).map(action => (
                      <div 
                        key={`${selectedAction.categories[0]}-${action.provider}-${action.id}`} 
                        className={`${styles.indexActionItem} ${selectedAction.id === action.id ? styles.indexActionActive : ''}`}
                        onClick={() => setSelectedAction(action)}
                        style={{ borderLeft: `2px solid ${getModuleColor(action.provider)}`}}
                      >
                        {action.name}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // 多个分类时的原有布局
                selectedAction.categories && selectedAction.categories.map(category => (
                  <div key={category} className={styles.indexCategory}>
                    <div className={styles.indexCategoryTitle}>{category}</div>
                    <div className={styles.indexActionsList}>
                      {actions.filter(action => 
                        action.categories && 
                        action.categories.includes(category)
                      ).map(action => (
                        <div 
                          key={`${category}-${action.provider}-${action.id}`} 
                          className={`${styles.indexActionItem} ${selectedAction.id === action.id ? styles.indexActionActive : ''}`}
                          onClick={() => setSelectedAction(action)}
                          style={{ borderLeft: `2px solid ${getModuleColor(action.provider)}`}}
                        >
                          {action.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* 详情内容区域 */}
            <div className={styles.detailBody}>
              <div className={styles.detailTags}>
                <span className={`${styles.detailTag} ${selectedAction.type === 'public' ? styles.publicTag : styles.privateTag}`}>
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