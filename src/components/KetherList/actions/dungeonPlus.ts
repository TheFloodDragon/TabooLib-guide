import { KetherActionModule } from './index';

const dungeonPlus: KetherActionModule = {
  name: "DungeonPlus",
  color: "#ffa500",
  actions: [
    {
      id: "dungeon",
      name: "Dungeon",
      description: "运行 DungeonPlus 脚本\\n详情访问: https://ersha.gitbook.io/dungeonplus/di-lao/untitled/kether",
      provider: "DungeonPlus",
      type: "private",
      categories: ["地牢系统", "脚本操作"],
      syntax: "dungeon \{action\} \{action\} params \{token\} \[area \{token\}\]",
      example: "\{dungeon\} message self \{params\} \"type=text;text=Example:<self:player-name>\""
    },
    {
      id: "dungeon-data-area",
      name: "Dungeon Area",
      description: "获取地牢区域内的玩家玩家数量",
      provider: "DungeonPlus",
      type: "private",
      categories: ["地牢系统", "实体操作"],
      syntax: "dungeon-data area \[players|size\] \{token\}",
      example: "\{dungeon-data area\} players dungeon_1"
    },
    {
      id: "dungeon-data-players",
      name: "Dungeon Players",
      description: "获取地牢内的所有玩家",
      provider: "DungeonPlus",
      type: "private",
      categories: ["地牢系统", "实体操作"],
      syntax: "dungeon-data players",
      example: "\{dungeon-data players\}"
    },
    {
      id: "dungeon-data-data",
      name: "Dungeon Data",
      description: "获取某个地牢数据值",
      provider: "DungeonPlus",
      type: "private",
      categories: ["地牢系统", "变量操作"],
      syntax: "dungeon-data data \{token\}",
      example: "\{dungeon-data data\} data_name"
    },
    {
      id: "dungeon-data-mob",
      name: "Dungeon Mob",
      description: "获取某个怪物的击杀数量或判断是否击杀该怪物",
      provider: "DungeonPlus",
      type: "private",
      categories: ["地牢系统", "实体操作"],
      syntax: "dungeon-data mob \[amount|contain\] \{token\}",
      example: "\{dungeon-data mob\} amount mob_1\n\{dungeon-data mob\} contain mob_2"
    },
    {
      id: "dungeon-data-world",
      name: "Dungeon World",
      description: "获取地牢的世界名称",
      provider: "DungeonPlus",
      type: "private",
      categories: ["地牢系统", "世界操作"],
      syntax: "dungeon-data world",
      example: "\{dungeon-data world\}"
    },
    {
      id: "dungeon-data-name",
      name: "Dungeon Name",
      description: "获取地牢名称",
      provider: "DungeonPlus",
      type: "private",
      categories: ["地牢系统"],
      syntax: "dungeon-data dongeon name",
      example: "\{dungeon-data dongeon name\}"
    },
    {
      id: "dungeon-data-options",
      name: "Dungeon Options",
      description: "获取地牢启动参数",
      provider: "DungeonPlus",
      type: "private",
      categories: ["地牢系统", "变量操作"],
      syntax: "dungeon-data options \{token\}",
      example: "\{dungeon-data dongeon options\} 1"
    },
  ]
};

export default dungeonPlus;
