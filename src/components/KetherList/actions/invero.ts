import { KetherActionModule } from './index';

const invero: KetherActionModule = {
  name: "Invero",
  color: "hsl(185, 69.6%, 27.1%)",
  actions: [
    {
      id: "message",
      name: "Message",
      description: "向玩家发送一个支持 Invero 相关格式化的消息",
      provider: "Invero",
      type: "private",
      categories: ["消息显示"],
      syntax: "msg <消息文本>",
      example: "msg \"<red>Hello {{player name}}\""
    },
    {
      id: "money",
      name: "Money",
      description: "控制 Vault 经济",
      provider: "Invero",
      type: "private",
      categories: ["经济"],
      syntax: "money get\nmoney has <action>\nmoney give <action>\nmoney take <action>\nmoney set <action>",
      example: 'money give 1000'
    },
    {
      id: "points",
      name: "Points",
      description: "控制 PlayerPoints 经济",
      provider: "Invero",
      type: "private",
      categories: ["经济"],
      syntax: "money get\nmoney has <action>\nmoney give <action>\nmoney take <action>\nmoney set <action>",
      example: 'money give 1000'
    },
    {
      id: "connect",
      name: "Connect",
      description: "跨服",
      provider: "Invero",
      type: "private",
      categories: ["菜单"],
      syntax: "connect <action>\nconnect <serverName> for <playerName>",
      example: 'context yizhan_server'
    },
    {
      id: "depend",
      name: "Depend",
      description: "检查服务器是否有指定依赖。返回: true/false",
      provider: "Invero",
      type: "private",
      categories: ["系统"],
      syntax: "depend plugin <action>\ndepend papi <action>",
      example: 'depend plugin Vault\ndepend papi Math'
    },
    {
      id: "context",
      name: "Context",
      description: "context /ctx 在具有菜单语境（即开启菜单）的情况下，操作菜单语境中的变量数据",
      provider: "Invero",
      type: "private",
      categories: ["数据"],
      syntax: "context get <key>\ncontext has <key>\ncontext (no|without) <key>\ncontext (rem|del|delete) <key>\ncontext (inc|increase) <key> by <value>\ncontext (dec|decrease) <key>\ncontext set <key> to <value>",
      example: '懒得写'
    },
    {
      id: "persist",
      name: "Persist",
      description: "独立于菜单语境操作持久数据",
      provider: "Invero",
      type: "private",
      categories: ["数据"],
      syntax: "persist get <key> by global\npersist set <key> to <value> by global\n\npersist get <key> player \"PlayerName\"\npersist set <key> to <value> player \"PlayerName\"",
      example: '懒得写'
    },
    {
      id: "menu",
      name: "Menu",
      description: "菜单相关操作",
      provider: "Invero",
      type: "private",
      categories: ["菜单"],
      syntax: "menu title to <text>\nmenu title pause\nmenu title resume\nmenu title update\nmenu close\nmenu open <menuId> for [player]\nmenu open_ctx <menuId> for [player]",
      example: '看上面'
    },
    {
      id: "icon",
      name: "Icon",
      description: "图标操作：\nrelocate\nupdate\nrefresh\nindex | sub_index\npause_update\npause_relocate\npause_frames\nresume_update\nresume_relocate\nresume_frames\nrefresh = update（更新变量） + relocate（重定向子图标）",
      provider: "Invero",
      type: "private",
      categories: ["菜单"],
      syntax: "icon (by <id> | at <slot>) <operator>",
      example: 'icon by A update\n特别地，你可以使用 icons 来操作所有图标，例如：\nicons update'
    },
    {
      id: "page",
      name: "Page",
      description: "翻页面板操作（需要在可翻页面板的语境下）",
      provider: "Invero",
      type: "private",
      categories: ["菜单"],
      syntax: "page isFirst\npage isLast\npage get\npage max\npage next (by <value>)\npage previous (by <value>)\npage set <value>",
      example: 'page next'
    },
    {
      id: "scroll",
      name: "Scroll",
      description: "滚动面板操作（需要在可滚动面板的语境下）",
      provider: "Invero",
      type: "private",
      categories: ["菜单"],
      syntax: "scroll index\nscroll next\nscroll previous\nscroll reset",
      example: 'scroll next'
    },
    {
      id: "regenerate",
      name: "Regenerate",
      description: "元素生成器面板操作",
      provider: "Invero",
      type: "private",
      categories: ["菜单"],
      syntax: "regenerate\nregenerate filter <filter>\nregenerate filter <filter> sort <sortby_key>",
      example: '懒得写'
    },
    {
      id: "element",
      name: "Element",
      description: "元素生成器模板图标操作",
      provider: "Invero",
      type: "private",
      categories: ["菜单"],
      syntax: "element <key>",
      example: '看 Invero 案例'
    },
    {
      id: "storage",
      name: "Storage",
      description: "交互槽位操作（需要在可交互面板中使用）",
      provider: "Invero",
      type: "private",
      categories: ["菜单"],
      syntax: "storage at <slot> exist\nstorage at <slot> empty\nstorage at <slot> delete\nstorage at <slot> get\nstorage at <slot> set to <value>\nstorage at <slot> isLocked\nstorage at <slot> free\nstorage at <slot> lock",
      example: '看 Invero 案例'
    },
    {
      id: "node",
      name: "Node",
      description: "节点",
      provider: "Invero",
      type: "private",
      categories: ["物品"],
      syntax: "node <key>\nnode <key> with <invokeArgs>",
      example: '看 Invero 文档'
    },
    {
      id: "item",
      name: "Item",
      description: "构建物品",
      provider: "Invero",
      type: "private",
      categories: ["物品"],
      syntax: "item <action>\nitem <action> by <source>\nitem <action> by <source> amount <amount>",
      example: '看 Invero 案例'
    }
  ]
};

export default invero;
