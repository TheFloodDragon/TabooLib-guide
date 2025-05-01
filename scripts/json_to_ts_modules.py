#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import os
import re
from collections import defaultdict

# 定义颜色映射，每个提供者对应一个16进制颜色
PROVIDER_COLORS = {
    "TabooLib": "#3b82f6",  # 亮蓝色
    "TrMenu": "#f59e0b",    # 橙色
    "Chemdah": "#10b981",   # 绿色
    "Invero": "#8b5cf6",    # 紫色
    "Zaphkiel": "#ec4899",  # 粉色
    "Adyeshach": "#6366f1", # 靛蓝色
    "Neigeitems": "#f43f5e", # 红色
    "DefaultProvider": "#6b7280" # 默认灰色
}

class KetherConverter:
    def __init__(self, input_file, output_dir):
        """初始化转换器"""
        self.input_file = input_file
        self.output_dir = output_dir
        self.actions = []
        self.modules = defaultdict(list)
    
    def load_json(self):
        """加载JSON文件"""
        try:
            with open(self.input_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.actions = data.get('actions', [])
                print(f"已加载 {len(self.actions)} 个动作")
        except Exception as e:
            print(f"加载JSON文件时出错: {e}")
            return False
        return True
    
    def group_by_provider(self):
        """按提供者分组动作"""
        for action in self.actions:
            provider = action.get('provider', 'DefaultProvider')
            self.modules[provider].append(action)
        
        print(f"已将动作分组为 {len(self.modules)} 个提供者模块")
    
    def sanitize_module_name(self, name):
        """将提供者名称转换为有效的文件名"""
        # 移除非字母数字字符，转为camelCase
        sanitized = re.sub(r'[^a-zA-Z0-9]', '', name)
        # 确保第一个字符小写
        if sanitized and sanitized[0].isupper():
            sanitized = sanitized[0].lower() + sanitized[1:]
        return sanitized
    
    def generate_module_file(self, provider, actions):
        """为提供者生成TypeScript模块文件"""
        module_name = self.sanitize_module_name(provider)
        file_path = os.path.join(self.output_dir, f"{module_name}.ts")
        
        color = PROVIDER_COLORS.get(provider, PROVIDER_COLORS["DefaultProvider"])
        
        # 生成TypeScript文件内容
        content = f"""import {{ KetherActionModule }} from './index';

const {module_name}: KetherActionModule = {{
  name: "{provider}",
  color: "{color}",
  actions: [
"""
        
        # 添加每个动作
        for action in actions:
            action_id = action.get('id', '')
            action_name = action.get('name', '')
            action_desc = action.get('description', '').replace('\n', '\\n')
            action_provider = action.get('provider', provider)
            action_type = action.get('type', 'public')
            action_category = action.get('category', '未分类')
            action_syntax = action.get('syntax', '')
            action_example = action.get('example', '').replace('\n', '\\n')
            
            content += f"""    {{
      id: "{action_id}",
      name: "{action_name}",
      description: "{action_desc}",
      provider: "{action_provider}",
      type: "{action_type}",
      category: "{action_category}",
"""
            if action_syntax:
                content += f'      syntax: "{action_syntax}",\n'
            if action_example:
                content += f'      example: "{action_example}"\n'
            else:
                # 删除最后一个逗号
                content = content.rstrip(',\n') + '\n'
            
            content += '    },\n'
        
        # 完成模块文件
        content += """  ]
};

export default """ + module_name + """;
"""
        
        # 写入文件
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"生成模块文件: {file_path}")
        except Exception as e:
            print(f"写入文件 {file_path} 时出错: {e}")
    
    def generate_index_file(self):
        """生成索引文件"""
        file_path = os.path.join(self.output_dir, "index.ts")
        
        content = """// 定义插件模块类型
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
  category: string;     // 类别
  example?: string;     // 示例代码
  syntax?: string;      // 语法
}

// 导入各个模块
"""
        
        # 添加导入语句
        imports = []
        module_list = []
        for provider in self.modules.keys():
            module_name = self.sanitize_module_name(provider)
            imports.append(f"import {module_name} from './{module_name}';")
            module_list.append(module_name)
        
        content += '\n'.join(imports) + '\n\n'
        content += """// 导出所有模块
export const modules: KetherActionModule[] = [
  """ + ',\n  '.join(module_list) + """
];

// 导出所有动作的扁平数组
export const getAllActions = (): KetherAction[] => {
  return modules.flatMap(module => module.actions);
};
"""
        
        # 写入文件
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"生成索引文件: {file_path}")
        except Exception as e:
            print(f"写入文件 {file_path} 时出错: {e}")
    
    def convert(self):
        """执行整个转换过程"""
        if not self.load_json():
            return False
        
        # 创建输出目录
        os.makedirs(self.output_dir, exist_ok=True)
        
        self.group_by_provider()
        
        # 为每个提供者生成模块文件
        for provider, actions in self.modules.items():
            self.generate_module_file(provider, actions)
        
        # 生成索引文件
        self.generate_index_file()
        
        return True


def main():
    print("Kether动作JSON转TypeScript模块转换工具")
    
    # 获取输入文件路径
    default_input = "../src/components/KetherList/ketherActions.json"
    input_file = input(f"输入JSON文件路径 (默认: {default_input}): ") or default_input
    
    # 获取输出目录
    default_output = "../src/components/KetherList/actions"
    output_dir = input(f"输出目录 (默认: {default_output}): ") or default_output
    
    # 执行转换
    converter = KetherConverter(input_file, output_dir)
    if converter.convert():
        print("转换完成！")
    else:
        print("转换失败!")


if __name__ == "__main__":
    main() 