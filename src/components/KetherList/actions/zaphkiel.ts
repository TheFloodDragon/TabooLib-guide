import { KetherActionModule } from './index';

const zaphkiel: KetherActionModule = {
  name: "Zaphkiel",
  color: "#838383",
  actions: [
    {
      id: "get_cooldown",
      name: "Get Cooldown",
      description: "在 \{Zaphkiel\} 物品行为中：\r\\n获取\{当前物品\}或\{当前玩家\}的冷却时间（单位：游戏刻）",
      provider: "Zaphkiel",
      type: "private",
      categories: ["冷却系统", "物品操作"],
      syntax: "cooldown time \[for (item|player)\]",
      example: "\{cooldown time\}\r\\n\{cooldown time for player\}"
    },
    {
      id: "update_cooldown",
      name: "Update Cooldown",
      description: "在 \{Zaphkiel\} 物品行为中：\r\\n将动作\{返回值\}作为冷却时间（单位：游戏刻）写入\{当前物品\}或\{当前玩家\}",
      provider: "Zaphkiel",
      type: "private",
      categories: ["冷却系统", "物品操作"],
      syntax: "cooldown set \{action\} \[for (item|player)\]",
      example: "\{cooldown set\} 100\r\\n\{cooldown set\} 100 \{for player\}"
    },
    {
      id: "check_cooldown",
      name: "Check Cooldown",
      description: "在 \{Zaphkiel\} 物品行为中：\r\\n判断\{当前物品\}或\{当前玩家\}是否处于冷却时间",
      provider: "Zaphkiel",
      type: "private",
      categories: ["冷却系统", "物品操作"],
      syntax: "cooldown check \[for (item|player)\]",
      example: "\{cooldown check\}\r\\n\{cooldown check for item\}\r\\n\{cooldown check for player\}"
    },
    {
      id: "effect",
      name: "Effect",
      description: "在 \{Zaphkiel\} 物品行为中：\r\\n将动作\{返回值\}作为 Bukkit 药水效果赋予玩家。或移除、清空。",
      provider: "Zaphkiel",
      type: "private",
      categories: ["药水效果", "实体操作"],
      syntax: "effect (give|remove|clear) \[\{action\} \{action\} \{action\}\]",
      example: "\{effect give\} POISON 100 0\r\\n\{effect clear\}\r\\n\{effect remove\} POISON"
    },
    {
      id: "item_durability",
      name: "Item Durability",
      description: "在 \{Zaphkiel\} 物品行为中：\r\\n获取物品的当前耐久度，该语句可以被 \{item data durability_current\} 代替。",
      provider: "Zaphkiel",
      type: "private",
      categories: ["物品属性", "物品操作"],
      syntax: "item durability",
      example: "\{item durability\}"
    },
    {
      id: "item_durability_operate",
      name: "Item Damage & Repair",
      description: "在 \{Zaphkiel\} 物品行为中：\r\\n将动作\{返回值\}作为耐久度扣除或修复。",
      provider: "Zaphkiel",
      type: "private",
      categories: ["物品属性", "物品操作"],
      syntax: "item (damage|repair) \{action\}",
      example: "\{item damage\} 1\r\\n\{item repair\} 1"
    },
    {
      id: "item_consume",
      name: "Item Consume",
      description: "在 \{Zaphkiel\} 物品行为中：\r\\n扣除 1 个行为中的物品。",
      provider: "Zaphkiel",
      type: "private",
      categories: ["物品操作"],
      syntax: "item consume",
      example: "\{item consume\}"
    },
    {
      id: "item_data",
      name: "Item Data",
      description: "在 \{Zaphkiel\} 物品行为中：\r\\n获取或设置物品的活跃数据。",
      provider: "Zaphkiel",
      type: "private",
      categories: ["物品属性", "物品操作", "数据存储"],
      syntax: "item data \{action\} \[to \{action\}\]",
      example: "\{item data\} durability \{to\} 10\r\\n\{item data\} damage \{to\} 200"
    },
    {
      id: "save",
      name: "Save",
      description: "在 \{Zaphkiel\} 物品行为中：\r\\n将缓存写入物品流。",
      provider: "Zaphkiel",
      type: "private",
      categories: ["数据存储", "物品操作"],
      syntax: "save",
      example: "\{save\}"
    },
    {
      id: "build_1",
      name: "Build Name & Lore",
      description: "在 \{Zaphkiel\} 物品构建过程中：\r\\n修改名称或描述中的变量",
      provider: "Zaphkiel",
      type: "private",
      categories: ["物品构建", "物品操作"],
      syntax: "build \[name|lore\] \{action\} to \{action\}",
      example: "\{build name\} quality to item data quality"
    },
    {
      id: "build_2",
      name: "Build Icon & Data",
      description: "在 \{Zaphkiel\} 物品构建过程中：\r\\n修改材质或附加值，这里的 \{data\} 代表物品附加值而非活跃数据。",
      provider: "Zaphkiel",
      type: "private",
      categories: ["物品构建", "物品操作"],
      syntax: "build \[icon|data\] \{action\}",
      example: "\{build icon\} stone\\n\{build data\} 1"
    },
  ]
};

export default zaphkiel;
