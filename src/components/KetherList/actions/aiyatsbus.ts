import { KetherActionModule } from './index';

const aiyatsbus: KetherActionModule = {
  name: "Aiyatsbus",
  color: "#FF6B6B",
  actions: [
    {
      id: "arr-clear",
      name: "Array Clear",
      description: "清空列表中的所有元素",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["数据处理", "变量操作"],
      syntax: "arr-clear &array",
      example: "{arr-clear} &my_list"
    },
    {
      id: "map-size",
      name: "Map Size",
      description: "获取 Map 的元素数量，如果不是 Map，则返回字符串长度。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["数据处理", "变量操作"],
      syntax: "map-size &map | map-length &map",
      example: "{map-size} &my_map\n{map-length} &my_map"
    },
    {
      id: "map-mutable",
      name: "Map Mutable",
      description: "转换为可变映射",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["数据处理", "变量操作"],
      syntax: "map-mutable &map",
      example: "{map-mutable} &my_map"
    },
    {
      id: "map-shuffle",
      name: "Map Shuffle",
      description: "打乱映射",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["数据处理", "变量操作"],
      syntax: "map-shuffle &map",
      example: "{map-shuffle} &my_map"
    },
    {
      id: "map-reverse",
      name: "Map Reverse",
      description: "反转映射",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["数据处理", "变量操作"],
      syntax: "map-reverse &map",
      example: "{map-reverse} &my_map"
    },
    {
      id: "map",
      name: "Map",
      description: "构建映射",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["数据处理", "变量操作"],
      syntax: "map &array",
      example: "{map} &[key1, value1, key2, value2]"
    },
    {
      id: "map-get",
      name: "Map Get",
      description: "获取映射中的元素",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["数据处理", "变量操作"],
      syntax: "map-get &key in &map",
      example: "{map-get} \"key1\" in &my_map"
    },
    {
      id: "map-put",
      name: "Map Put",
      description: "添加键值对到映射末尾",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["数据处理", "变量操作"],
      syntax: "map-put &key with &value to &map",
      example: "{map-put} \"new_key\" with \"new_value\" to &my_map"
    },
    {
      id: "map-remove",
      name: "Map Remove",
      description: "移除映射中的键值对",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["数据处理", "变量操作"],
      syntax: "map-remove &key in &map",
      example: "{map-remove} \"key1\" in &my_map"
    },
    {
      id: "map-keys",
      name: "Map Keys",
      description: "获取映射中的键列表",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["数据处理", "变量操作"],
      syntax: "map-keys &map",
      example: "{map-keys} &my_map"
    },
    {
      id: "max",
      name: "Max",
      description: "取两值之最大",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["逻辑与数学", "数学运算"],
      syntax: "max &value1 &value2",
      example: "{max} 10 20"
    },
    {
      id: "min",
      name: "Min",
      description: "取两值之最小",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["逻辑与数学", "数学运算"],
      syntax: "min &value1 &value2",
      example: "{min} 10 20"
    },
    {
      id: "ceil",
      name: "Ceil",
      description: "向上取整",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["逻辑与数学", "数学运算"],
      syntax: "ceil &value",
      example: "{ceil} 3.7"
    },
    {
      id: "floor",
      name: "Floor",
      description: "向下取整",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["逻辑与数学", "数学运算"],
      syntax: "floor &value",
      example: "{floor} 3.7"
    },
    {
      id: "a-wait",
      name: "Wait",
      description: "在脚本中等待指定的时间（秒）。如果玩家在等待过程中离线则终止脚本。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["脚本控制", "游戏系统"],
      syntax: "a-wait &seconds | a-delay &seconds | a-sleep &seconds",
      example: "{a-wait} 5\n{a-delay} 2.5\n{a-sleep} 1"
    },
    {
      id: "instance-of",
      name: "Instance Of",
      description: "检查对象是否为指定类型的实例。如果类型不存在则返回 false。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["逻辑与数学", "数据处理"],
      syntax: "instance-of &object is &class_name",
      example: "{instance-of} &entity is org.bukkit.entity.Player"
    },
    {
      id: "cast",
      name: "Cast",
      description: "将对象转换为指定类型。如果转换失败则返回原对象。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["逻辑与数学", "数据处理"],
      syntax: "cast &object to &class_name",
      example: "{cast} &entity to org.bukkit.entity.Player"
    },
    {
      id: "get-block-drops",
      name: "Get Block Drops",
      description: "获取指定方块的掉落物列表。可选择指定挖掘工具和挖掘实体。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["物品管理", "世界与坐标"],
      syntax: "get-block-drops &block [item &tool] [entity &miner]",
      example: "{get-block-drops} &block\n{get-block-drops} &block item &diamond_pickaxe\n{get-block-drops} &block item &diamond_pickaxe entity &player"
    },
    {
      id: "a-cd",
      name: "Cool Down",
      description: "检查或添加附魔冷却时间。\ncheck: 检查冷却时间，可选择是否通报给玩家和是否以动作栏形式发送\nadd: 添加冷却时间",
      provider: "Aiyatsbus",
      type: "private",
      categories: ["游戏系统", "实体控制"],
      syntax: "a-cd check &enchant &player &seconds &notify [action-bar &action_bar]\na-cd add &enchant &player",
      example: "{a-cd check} &enchant &player 5 true\n{a-cd check} &enchant &player 5 true action-bar true\n{a-cd add} &enchant &player"
    },
    {
      id: "spawn-entity",
      name: "Spawn Entity",
      description: "在指定位置生成实体",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["实体控制", "世界与坐标"],
      syntax: "spawn-entity &entity_type at &location",
      example: "{spawn-entity} zombie at &location"
    },
    {
      id: "real-damage",
      name: "Real Damage",
      description: "对实体造成真实伤害",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["实体控制"],
      syntax: "real-damage &entity with &damage [by &attacker]",
      example: "{real-damage} &player with 10\n{real-damage} &player with 10 by &zombie"
    },
    {
      id: "entity-name",
      name: "Entity Name",
      description: "获取实体的名称。如果是玩家则返回玩家名，否则返回自定义名称或本地化名称。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["实体控制", "文本处理"],
      syntax: "entity-name &entity",
      example: "{entity-name} &player"
    },
    {
      id: "remove-entity",
      name: "Remove Entity",
      description: "移除指定实体",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["实体控制"],
      syntax: "remove-entity &entity",
      example: "{remove-entity} &zombie"
    },
    {
      id: "add-potion-effect",
      name: "Add Potion Effect",
      description: "为实体添加药水效果",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["实体控制", "药水效果"],
      syntax: "add-potion-effect &effect_type on &entity duration &duration amplifier &amplifier [ambient &ambient] [particles &particles] [icon &icon]",
      example: "{add-potion-effect} speed on &player duration 60 amplifier 1"
    },
    {
      id: "near-by-entities",
      name: "Near By Entities",
      description: "获取实体附近的实体列表",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["实体控制", "世界与坐标"],
      syntax: "near-by-entities &entity in &radius_x &radius_y &radius_z",
      example: "{near-by-entities} &player in 10 5 10"
    },
    {
      id: "a-vec-add",
      name: "Vector Add",
      description: "为实体添加向量。可选择安全模式和击退检查。",
      provider: "Aiyatsbus",
      type: "private",
      categories: ["实体控制"],
      syntax: "a-vec-add &vector on &entity [safety &safety] [checkKnockback &check]",
      example: "{a-vec-add} &vector on &player safety true"
    },
    {
      id: "entity-is-behind",
      name: "Entity Is Behind",
      description: "检查一个实体是否在另一个实体后方",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["实体控制", "逻辑与数学"],
      syntax: "entity-is-behind &entity1 &entity2",
      example: "{entity-is-behind} &player &zombie"
    },
    {
      id: "launch-arrow",
      name: "Launch Arrow",
      description: "发射箭矢",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["实体控制"],
      syntax: "launch-arrow &source [with &vector]",
      example: "{launch-arrow} &player\n{launch-arrow} &player with &vector"
    },
    {
      id: "equip-set-item",
      name: "Equip Set Item",
      description: "设置实体的装备物品",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["物品管理", "实体控制"],
      syntax: "equip-set-item &item in &slot to &entity",
      example: "{equip-set-item} &diamond_sword in hand to &player"
    },
    {
      id: "equip-get-item",
      name: "Equip Get Item",
      description: "获取实体的装备物品",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["物品管理", "实体控制"],
      syntax: "equip-get-item &slot from &entity",
      example: "{equip-get-item} hand from &player"
    },
    {
      id: "build-firework",
      name: "Build Firework",
      description: "在指定位置生成烟花。可指定类型（BALL, BALL_LARGE, BURST, CREEPER, STAR）、威力、闪烁、尾迹、主颜色和淡出颜色。颜色支持中英文常见名，可为单色或列表。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["视觉特效", "世界与坐标"],
      syntax: "build-firework &location type &type [power &power] [flicker &flicker] [trail &trail] [main-colors &colors] [fade-colors &colors]",
      example: "{build-firework} world 0 80 0 type BALL_LARGE power 2 flicker true trail true main-colors &[red, blue] fade-colors &[yellow, white]"
    },
    {
      id: "detonate-firework",
      name: "Detonate Firework",
      description: "立即引爆指定烟花实体。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["视觉特效"],
      syntax: "detonate-firework &firework",
      example: "{detonate-firework} &firework"
    },
    {
      id: "send-lang",
      name: "Send Lang",
      description: "向实体发送多语言消息，可附带参数数组。",
      provider: "Aiyatsbus",
      type: "private",
      categories: ["消息显示", "实体控制"],
      syntax: "send-lang &lang_key to &entity [with &args]",
      example: "{send-lang} enchant-impact-damaged to &event[entity]\n{send-lang} enchant-impact-damaged to &event[entity] with &[entity-name &event[attacker]]"
    },
    {
      id: "mark",
      name: "Mark",
      description: "为对象添加元数据标记。",
      provider: "Aiyatsbus",
      type: "private",
      categories: ["数据处理"],
      syntax: "mark &key on &object",
      example: "{mark} my_tag on &entity"
    },
    {
      id: "unmark",
      name: "Unmark",
      description: "移除对象的元数据标记。",
      provider: "Aiyatsbus",
      type: "private",
      categories: ["数据处理"],
      syntax: "unmark &key on &object",
      example: "{unmark} my_tag on &entity"
    },
    {
      id: "has-mark",
      name: "Has Mark",
      description: "检查对象是否有指定元数据标记。",
      provider: "Aiyatsbus",
      type: "private",
      categories: ["数据处理"],
      syntax: "has-mark &key on &object | hasMark &key on &object",
      example: "{has-mark} my_tag on &entity\n{hasMark} my_tag on &entity"
    },
    {
      id: "set-metadata",
      name: "Set Metadata",
      description: "为对象设置元数据。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["数据处理"],
      syntax: "set-metadata &key to &value on &object | setMetadata &key to &value on &object | set-meta &key to &value on &object",
      example: "{set-metadata} my_key to my_value on &entity"
    },
    {
      id: "remove-metadata",
      name: "Remove Metadata",
      description: "移除对象的元数据。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["数据处理"],
      syntax: "remove-metadata &key on &object | removeMetadata &key on &object | remove-meta &key on &object",
      example: "{remove-metadata} my_key on &entity"
    },
    {
      id: "has-metadata",
      name: "Has Metadata",
      description: "检查对象是否有指定元数据。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["数据处理"],
      syntax: "has-metadata &key on &object | hasMetadata &key on &object | has-meta &key on &object",
      example: "{has-metadata} my_key on &entity"
    },
    {
      id: "get-metadata",
      name: "Get Metadata",
      description: "获取对象的元数据，指定索引位置。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["数据处理"],
      syntax: "get-metadata &key on &object by &index | getMetadata &key on &object by &index | get-meta &key on &object by &index",
      example: "{get-metadata} my_key on &entity by 0"
    },
    {
      id: "give-exp",
      name: "Give Exp",
      description: "给玩家经验值。可选择是否应用经验修补。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["实体控制"],
      syntax: "give-exp &amount to &player [mending &mending]",
      example: "{give-exp} 100 to &player\n{give-exp} 100 to &player mending true"
    },
    {
      id: "money",
      name: "Money",
      description: "获取玩家的经济余额。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["经济", "实体控制"],
      syntax: "money &player",
      example: "{money} &player"
    },
    {
      id: "take-money",
      name: "Take Money",
      description: "扣除玩家的金钱。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["经济", "实体控制"],
      syntax: "take-money &player &amount",
      example: "{take-money} &player 100.0"
    },
    {
      id: "give-money",
      name: "Give Money",
      description: "给予玩家金钱。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["经济", "实体控制"],
      syntax: "give-money &player &amount",
      example: "{give-money} &player 100.0"
    },
    {
      id: "has-money",
      name: "Has Money",
      description: "检查玩家是否有足够的金钱。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["经济", "实体控制"],
      syntax: "has-money &player &amount",
      example: "{has-money} &player 100.0"
    },
    {
      id: "get-vein",
      name: "Get Vein",
      description: "获取指定方块周围的矿脉。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["世界与坐标"],
      syntax: "get-vein &block [max &amount]",
      example: "{get-vein} &block\n{get-vein} &block max 100"
    },
    {
      id: "strike-lightning",
      name: "Strike Lightning",
      description: "在指定位置劈闪电。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["视觉特效", "世界与坐标"],
      syntax: "strike-lightning &location | lightning &location",
      example: "{strike-lightning} &location\n{lightning} &location"
    },
    {
      id: "create-explosion",
      name: "Create Explosion",
      description: "在指定位置创建爆炸。可选择爆炸源实体、是否着火、是否破坏方块。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["视觉特效", "世界与坐标"],
      syntax: "create-explosion &location &power [by &entity] [fire &fire] [break &break]",
      example: "{create-explosion} &location 2.0\n{create-explosion} &location 2.0 by &player fire true break false"
    },
    {
      id: "drop-item",
      name: "Drop Item",
      description: "在指定位置掉落物品。可选择是否自然掉落。",
      provider: "Aiyatsbus",
      type: "public",
      categories: ["物品管理", "世界与坐标"],
      syntax: "drop-item &item at &location [naturally &naturally]",
      example: "{drop-item} &diamond at &location\n{drop-item} &diamond at &location naturally true"
    },
    {
      id: "operation",
      name: "Operation",
      description: "执行注册的操作。",
      provider: "Aiyatsbus",
      type: "private",
      categories: ["脚本控制"],
      syntax: "operation &operation_name [args &args]",
      example: "{operation} my_operation\n{operation} my_operation args &[param1, param2]"
    }
  ]
};

export default aiyatsbus;
 
