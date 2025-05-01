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
    "Kether": "#059669",    # 深绿色
    "Vulpecula": "#9333ea", # 深紫色
    "DungeonPlus": "#0ea5e9", # 天蓝色
    "DefaultProvider": "#6b7280" # 默认灰色
}

def sanitize_module_name(name):
    """将提供者名称转换为有效的文件名"""
    # 移除非字母数字字符，转为camelCase
    sanitized = re.sub(r'[^a-zA-Z0-9]', '', name)
    # 确保第一个字符小写
    if sanitized and sanitized[0].isupper():
        sanitized = sanitized[0].lower() + sanitized[1:]
    return sanitized

def convert_color_to_hex(color_str):
    """将RGB颜色字符串转换为十六进制颜色"""
    try:
        # 尝试解析RGB格式 "255,105,180"
        rgb = [int(c.strip()) for c in color_str.split(',')]
        if len(rgb) == 3:
            return f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"
    except:
        pass
    return None

def get_action_type(type_str):
    """将动作类型字符串转换为标准格式"""
    if type_str == "PUBLIC_ACTION":
        return "public"
    elif type_str == "PRIVATE_ACTION":
        return "private"
    else:
        return "both"

def escape_string(s):
    """转义字符串中的特殊字符，确保其在JS中可用"""
    if s is None:
        return ""
    
    # 替换反斜杠
    s = s.replace("\\", "\\\\")
    
    # 替换引号
    s = s.replace('"', '\\"')
    
    # 替换特殊字符
    s = s.replace('\n', '\\n')
    s = s.replace('\r', '\\r')
    s = s.replace('\t', '\\t')
    
    # 处理一些可能导致问题的字符
    s = s.replace('{', '\\{')
    s = s.replace('}', '\\}')
    s = s.replace('[', '\\[')
    s = s.replace(']', '\\]')
    s = s.replace('+', '\\+')
    
    return s

def process_json_file(json_file_path, output_dir):
    """处理单个JSON文件并转换为TS模块"""
    try:
        with open(json_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        # 从文件获取提供者名称和颜色
        provider = data.get('id', os.path.splitext(os.path.basename(json_file_path))[0])
        color_str = data.get('color', '')
        print(f"处理提供者: {provider}")
        
        module_name = sanitize_module_name(provider)
        file_path = os.path.join(output_dir, f"{module_name}.ts")
        
        # 转换颜色或使用预定义的颜色
        color = convert_color_to_hex(color_str) or PROVIDER_COLORS.get(provider, PROVIDER_COLORS["DefaultProvider"])
        
        # 生成TypeScript文件内容
        content = f"""import {{ KetherActionModule }} from './index';

const {module_name}: KetherActionModule = {{
  name: "{provider}",
  color: "{color}",
  actions: [
"""
        
        # 添加每个动作
        actions_obj = data.get('actions', {})
        for action_id, action_data in actions_obj.items():
            action_name = action_data.get('name', action_id)
            action_type = get_action_type(action_data.get('type', ''))
            
            # 处理描述（使用information字段）
            description = action_data.get('information', [])
            # 连接为单行字符串，并转义特殊字符
            raw_desc = "\\n".join(description) if description else ""
            description_str = escape_string(raw_desc)
            
            # 处理语法（使用parser字段）
            syntax = action_data.get('parser', [])
            raw_syntax = "\\n".join(syntax) if syntax else ""
            syntax_str = escape_string(raw_syntax)
            
            # 处理示例（使用examples字段）
            example = action_data.get('examples', [])
            raw_example = "\\n".join(example) if example else ""
            example_str = escape_string(raw_example)
            
            # 处理版本
            version = action_data.get('version', '')
            
            # 处理分类（默认为"未分类"）
            category = "未分类"
            
            content += f"""    {{
      id: "{action_id}",
      name: "{action_name}",
      description: "{description_str}",
      provider: "{provider}",
      type: "{action_type}",
      category: "{category}",
"""
            if syntax_str:
                content += f'      syntax: "{syntax_str}",\n'
            if example_str:
                content += f'      example: "{example_str}"\n'
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
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"生成模块文件: {file_path}")
        return provider, list(actions_obj.keys())
    except Exception as e:
        print(f"处理文件 {json_file_path} 时出错: {e}")
        return None, []

def update_index_file(modules_dict, output_dir):
    """更新或创建索引文件"""
    file_path = os.path.join(output_dir, "index.ts")
    
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
    for provider in modules_dict.keys():
        module_name = sanitize_module_name(provider)
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
        print(f"更新索引文件: {file_path}")
    except Exception as e:
        print(f"写入文件 {file_path} 时出错: {e}")

def main():
    print("Kether动作JSON目录转TypeScript模块工具")
    
    # 获取输入目录
    default_input = "src/components/KetherList/actions"
    input_dir = input(f"输入JSON文件目录 (默认: {default_input}): ") or default_input
    
    # 获取输出目录（与输入目录相同）
    output_dir = input_dir
    
    # 确保目录存在
    if not os.path.exists(input_dir):
        print(f"目录不存在: {input_dir}")
        return
    
    # 收集所有JSON文件
    json_files = [f for f in os.listdir(input_dir) if f.endswith('.json')]
    if not json_files:
        print(f"在 {input_dir} 中未找到JSON文件")
        return
    
    print(f"找到 {len(json_files)} 个JSON文件")
    
    # 处理每个JSON文件
    modules_dict = {}
    for json_file in json_files:
        json_path = os.path.join(input_dir, json_file)
        provider, actions = process_json_file(json_path, output_dir)
        if provider:
            modules_dict[provider] = actions
    
    # 更新索引文件
    update_index_file(modules_dict, output_dir)
    
    print("转换完成！")

if __name__ == "__main__":
    main() 