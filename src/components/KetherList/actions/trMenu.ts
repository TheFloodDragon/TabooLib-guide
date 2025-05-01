import { KetherActionModule } from './index';

const trMenu: KetherActionModule = {
  name: "TrMenu",
  color: "#00dee6",
  actions: [
    {
      id: "item_match",
      name: "ItemMatcher",
      description: "将动作的\{返回值\}作为\{物品特征解析式\}判断玩家是否持有。\r\\n物品特征解析式详见 \{TrMenu\} 文档。",
      provider: "TrMenu",
      type: "private",
      categories: ["物品操作"],
      syntax: "item \{action\}",
      example: "\{item\} \"material:diamond_block\"\r\\n\{item\} \"material:diamond_block,data:0,amount:64\""
    },
    {
      id: "menu",
      name: "Menu",
      description: "将动作的\{返回值\}作为菜单名称打开或关闭玩家当前菜单。",
      provider: "TrMenu",
      type: "private",
      categories: ["菜单控制"],
      syntax: "menu open \{action\}\r\\nmenu close",
      example: "\{menu open\} Example\r\\n\{menu close\}"
    },
    {
      id: "metadata",
      name: "Metadata",
      description: "获取或赋值玩家的\{元数据\}。\r\\n\r\\n\{meta\} 是临时存储在服务器内存,\r\\n\{data\} 则会调用 TabooLib 提供的 \{LocalPlayer\} 存储在玩家独立数据文件。",
      provider: "TrMenu",
      type: "private",
      categories: ["数据存储", "变量操作"],
      syntax: "data (get|set|del) \{action\} \[to \{action\}\]\r\\nmeta (get|set|del) \{action\} \[to \{action\}\]",
      example: "\{data\} \{set\} test \{to\} value\r\\n\{data\} \{del\} test\r\\n\r\\n\{meta\} \{set\} test \{to\} value\r\\n\{meta\} \{del\} test\r\\n\r\\nprint \{data\} \{get\} test"
    },
    {
      id: "money",
      name: "Money",
      description: "将动作的\{返回值\}作为 \{Vault\} 货币判断玩家是否持有。",
      provider: "TrMenu",
      type: "private",
      categories: ["经济系统"],
      syntax: "money \{action\}",
      example: "print \{money\} 100"
    },
    {
      id: "playerpoints",
      name: "PlayerPoints",
      description: "将动作的\{返回值\}作为 \{PlayerPoints\} 货币判断玩家是否持有。",
      provider: "TrMenu",
      type: "private",
      categories: ["经济系统"],
      syntax: "points \{action\}",
      example: "print \{points\} 100"
    },
    {
      id: "variable",
      name: "Variable",
      description: "替换动作的\{返回值\}中所有 \{TrMenu\} 变量函数。 \r\\n\r\\n引用：\r\\nhttps://trmenu.trixey.cc/usage/functions",
      provider: "TrMenu",
      type: "private",
      categories: ["变量操作", "文本处理"],
      syntax: "var\[s\] \{action\}",
      example: "tell \{var\} \"\{\\\{\}<Index>\{\\\}\}\"\r\\ntell \{var\} \"\{\\\{\}meta: <Key>\{\\\}\}\""
    },
  ]
};

export default trMenu;
