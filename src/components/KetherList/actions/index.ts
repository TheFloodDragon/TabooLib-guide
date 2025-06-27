// 定义插件模块类型
export interface KetherActionModule {
  name: string;         // 模块名称
  color: string;        // 模块颜色 (16进制)
  actions: KetherAction[];
}

// 定义Kether动作类型
export interface KetherAction {
  id: string;           // 动作ID
  name: string;         // 动作名称
  description: string;  // 描述
  provider: string;     // 提供者
  type: 'public' | 'private' | 'both'; // 类型
  categories: string[];  // 类别（修改为数组以支持多个分类）
  example?: string;     // 示例代码
  syntax?: string;      // 语法
}

// 导入各个模块
import adyeshach from './adyeshach';
import aiyatsbus from './aiyatsbus';
import arim from './arim';
import chemdah from './chemdah';
import dungeonPlus from './dungeonPlus';
import invero from './invero';
import kether from './kether';
import tabooLib from './taboolib';
import trmenu from './trmenu';
import vulpecula from './vulpecula';
import zaphkiel from './zaphkiel';

// 导出所有模块
export const modules: KetherActionModule[] = [
  adyeshach,
  aiyatsbus,
  arim,
  chemdah,
  dungeonPlus,
  invero,
  kether,
  tabooLib,
  trmenu,
  vulpecula,
  zaphkiel
];

// 导出所有动作的扁平数组
export const getAllActions = (): KetherAction[] => {
  return modules.flatMap(module => module.actions);
};
