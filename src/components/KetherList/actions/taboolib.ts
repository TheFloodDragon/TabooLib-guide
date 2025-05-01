import { KetherActionModule } from './index';

const tabooLib: KetherActionModule = {
  name: "TabooLib",
  color: "#d84848",
  actions: [
    {
      id: "absorption_amount",
      name: "Absorption Amount",
      description: "获取或设置玩家的额外生命",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player absorption amount \[(add|to) \{action\}\]",
      example: "\{player\} absorption amount\r\\n\{player\} absorption amount \{to\} 100\r\\n\{player\} absorption amount \{add\} 100"
    },
    {
      id: "action_bar",
      name: "Action Bar",
      description: "将动作的\{返回值\}作为\{动作栏\}信息发送给\{执行者\}。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "actionbar \{action\}",
      example: "\{actionbar\} \"Hello World!\""
    },
    {
      id: "address",
      name: "Address",
      description: "获取玩家的 IP 地址。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player address",
      example: "\{player\} address"
    },
    {
      id: "allow_flight",
      name: "Allow Flight",
      description: "判断或修改玩家是否允许飞行",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player allow flight \[to \{action\}\]",
      example: "\{player\} allow flight\r\\n\{player\} allow flight \{to\} true"
    },
    {
      id: "array",
      name: "Array",
      description: "将动作列表的所有\{返回值\}作为\{集合\}返回。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "array \{action list\}",
      example: "\{array\} \{\[\} 1 1 2 3 4 \{\]\}"
    },
    {
      id: "attack_cooldown",
      name: "Attack Cooldown",
      description: "获取玩家的攻击冷却。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player attack cooldown",
      example: "\{player\} dead"
    },
    {
      id: "bed_spawn",
      name: "Bed Spawn",
      description: "获取或修改玩家的出生点（床），需要对应方块材质为床。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player bed spawn \[to \{action\}\]",
      example: "\{player\} bed spawn\r\\n\{player\} bed spawn \{to\} location world 0 0 0"
    },
    {
      id: "bed_spawn_x,y,z",
      name: "Bed Spawn X,Y,Z",
      description: "获取玩家出生点（床）的坐标轴。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player bed spawn (x|y|z)",
      example: "\{player\} bed spawn x\r\\n\{player\} bed spawn y\r\\n\{player\} bed spawn z"
    },
    {
      id: "blocking",
      name: "Blocking",
      description: "判断玩家是否在格挡状态。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player blocking",
      example: "\{player\} blocking"
    },
    {
      id: "break",
      name: "Break",
      description: "该方法用于在特定循环语句 (\{ForEach, Join, Map, While\}) 中使用，结束循环体。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "break",
      example: "while true then \\\{ print 1 \{break\} \\\}"
    },
    {
      id: "case & when",
      name: "Case & When",
      description: "一种复杂的选择语句, 相比于 #IF 有更丰富的特性。\\n完整的选择语句需要包含至少一项选择分支, 也就是 \{when block\}。\\n\\n每个标准的选择分支由 \{when\} \{\\\{条件\\\}\} -> \{\\\{表达式\\\}\} 组成。\\n也可使用 \{else\} \{\\\{表达\\\}\} 作为默认分支。\\n\\n\{先看一段示例:\}\\nset number to 3\\nset numberProvided to case &number \[\\n&nbsp;&nbsp;&nbsp;&nbsp;when 1 -> \"One\"\\n&nbsp;&nbsp;&nbsp;&nbsp;when 2 -> \"Two\"\\n&nbsp;&nbsp;&nbsp;&nbsp;when 3 -> \"Three\"\\n&nbsp;&nbsp;&nbsp;&nbsp;else \"One\"\\n\]\\nlog inline \"You provide \\\{\\\{ &numberProvided \\\}\\\}\"\\n\\n\{运行后得到结果:\}\\nYou provide Three\\n\\n\{也可以像其他语句一样正常使用:\}\\nset number to 3\\ncase &number \[\\n&nbsp;&nbsp;&nbsp;&nbsp;when 1 -> log \"One\"\\n&nbsp;&nbsp;&nbsp;&nbsp;when 2 -> log \"Two\"\\n&nbsp;&nbsp;&nbsp;&nbsp;when 3 -> log \"Three\"\\n&nbsp;&nbsp;&nbsp;&nbsp;else log \"One\"\\n\]\\n\\n\{或是包含多条语句:\}\\nset number to 1\\ncase &number \[\\n&nbsp;&nbsp;&nbsp;&nbsp;when 1 -> \\\{\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;log \"Monday\"\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;log \"First day of the week\"\\n&nbsp;&nbsp;&nbsp;&nbsp;\\\}\\n&nbsp;&nbsp;&nbsp;&nbsp;when \[ 2 3 4 5 6 7 \] -> \\\{\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;log \"Sunday\"\\n&nbsp;&nbsp;&nbsp;&nbsp;\\\}\\n&nbsp;&nbsp;&nbsp;&nbsp;else log \"Other days\"\\n\]\\n\\n\{或是进行逻辑判断:\}\\nset number to 1\\ncase &number \[\\n&nbsp;&nbsp;&nbsp;&nbsp;when < 10 -> \\\{\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;log \"Small\"\\n&nbsp;&nbsp;&nbsp;&nbsp;\\\}\\n&nbsp;&nbsp;&nbsp;&nbsp;when > 10 -> \\\{\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;log \"Big\"\\n&nbsp;&nbsp;&nbsp;&nbsp;\\\}\\n&nbsp;&nbsp;&nbsp;&nbsp;else log \"Other\"\\n\]",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "case \{aciton\} \[ \{when block\} ... \]",
      example: "\{case\} &mat \[\\n&nbsp;&nbsp;&nbsp;&nbsp;\{when\} \"diamond\" -> 1\\n&nbsp;&nbsp;&nbsp;&nbsp;\{when\} \[ \"iron\", \"gold\" \] -> 2\\n&nbsp;&nbsp;&nbsp;&nbsp;\{else\} false\\n\]"
    },
    {
      id: "check",
      name: "Check",
      description: "将两个动作的\{返回值\}进行对比，支持多种判定方式。\r\\n\r\\n1. 等于（\{==\}、\{is\}）：指两个值\{字面意思\}上相同。\r\\n2. 不等于（\{!=\}、\{not\}）：指两个值\{字面意思\}上不同。\r\\n3. 相似等于（\{=?\}、\{is?\}）：指两个值\{字面意思\}上\{忽略大小写\}的条件下相同。\r\\n4. 绝对等于（\{=!\}、\{is!\}）：指两个值\{内存路径\}上相同。\r\\n5. 大于（\{>\}、\{gt\}）：指第一个值\{大于\}第二个值。\r\\n6. 大于等于（\{>=\}）：指第一个值\{大于\}或\{等于\}第二个值。\r\\n7. 小于（\{<\}、\{lt\}）：指第一个值\{小于\}第二个值。\r\\n8. 小于等于（\{<=\}）：指第一个值\{小于\}或\{等于\}第二个值。\r\\n\r\\n\{注意：\}\r\\n在使用\{等于\}条件进行判断时，左右两个参数会自动附加 \{#Type\} 类型推断动作。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "check \{action\} \{symbol\} \{action\}",
      example: "if \{check\} 1 \{is\} 1 then print yes else print no\r\\nif \{check\} 2 \{gt\} 1 then print yes else print no\r\\nif \{check\} 2 \{lt\} 1 then print yes else print no"
    },
    {
      id: "color",
      name: "Color Text",
      description: "替换动作的\{返回值\}中所有\{颜色代码\}。\r\\n支持由 \{TabooLib\} 提供的高级颜色代码。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "color\[ed\] \{action\}",
      example: "\{color\} \"\{&a\} a test message\"\r\\n\{color\} \"\{&\\\{GREEN\\\}\} a test message\"\r\\n\{color\} \"\{&\\\{#7FB80E\\\}\} a test message\"\r\\n\{color\} \"\{&\\\{000,255,000\\\}\} a test message\""
    },
    {
      id: "command",
      name: "Command",
      description: "将动作的\{返回值\}作为命令执行，默认以\{玩家\}为执行者。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "command \{action\} \[as (console|player|op)\]",
      example: "\{command\} \"gamemode survival\"\r\\n\{command\} \"gamemode creative\" \{as\} op"
    },
    {
      id: "compass_target",
      name: "Compass Target",
      description: "获取或修改玩家的指南针目标。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player compass target \[to \{action\}\]",
      example: "\{player\} compass target\r\\n\{player\} compass target \{to\} location world 0 0 0"
    },
    {
      id: "compass_x,y,z",
      name: "Compass X,Y,Z",
      description: "获取玩家指南针目标的坐标轴。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player compass (x|y|z)",
      example: "\{player\} compass x\r\\n\{player\} compass y\r\\n\{player\} compass z"
    },
    {
      id: "conversing",
      name: "Conversing",
      description: "Tests to see of a Conversable object is actively engaged in a conversation.\r\\n\r\\n\{Returns:\}\r\\nTrue if a conversation is in progress",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player conversing",
      example: "\{player\} conversing"
    },
    {
      id: "date_day",
      name: "Date Day",
      description: "本年、本月、本周中的天数。\r\\n年：（\{1\} ~ \{365\}）\r\\n月：（\{1\} ~ \{31\}）\r\\n周：（\{1\} ~ \{7\}）",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "day of (year|month|week)",
      example: "\{day in\} year\r\\n\{day in\} week"
    },
    {
      id: "date_hour",
      name: "Date Hour",
      description: "当前小时（\{0\} ~ \{23\}）。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "hour\[s\]",
      example: "\{hour\}"
    },
    {
      id: "date_minute",
      name: "Date Minute",
      description: "当前分钟（\{0\} ~ \{59\}）。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "minute\[s\]",
      example: "\{minute\}"
    },
    {
      id: "date_month",
      name: "Date Month",
      description: "当前月份（\{1\} ~ \{12\}）。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "month\[s\]",
      example: "print \{month\}"
    },
    {
      id: "date_second",
      name: "Date Second",
      description: "当前秒（\{0\} ~ \{59\}）。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "second\[s\]",
      example: "\{second\}"
    },
    {
      id: "date_year",
      name: "Date Year",
      description: "当前年份（\{MIN_YEAR\} ~ \{MAX_YEAR\}）。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "year\[s\]",
      example: "\{year\}"
    },
    {
      id: "dead",
      name: "Dead",
      description: "判断玩家是否死亡。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player dead",
      example: "\{player\} dead"
    },
    {
      id: "element",
      name: "Element",
      description: "将动作的\{返回值\}作为\{列表\}获取指定元素。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "element \{action\} of \{action\}",
      example: "\{element\} 0 \{in\} range 1 to 10"
    },
    {
      id: "exhaustion",
      name: "Exhaustion",
      description: "获取或修改玩家的疲劳度。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player exhaustion \[(add|to) \{action\}\]",
      example: "\{player\} exhaustion\r\\n\{player\} exhaustion \{to\} 100\r\\n\{player\} exhaustion \{add\} 100"
    },
    {
      id: "exp",
      name: "Exp",
      description: "获取或修改玩家的经验相关数据，只有 \{player exp\} 允许修改。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player exp \[until next level|at level|to level\] \[(add|to) \{action\}\]",
      example: "\{player\} exp\r\\n\{player\} exp \{add\} 10\r\\n\{player\} exp until next level"
    },
    {
      id: "first_played",
      name: "First Played",
      description: "返回玩家的首次游戏时间。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player first played",
      example: "\{player\} first played"
    },
    {
      id: "fly___walk_speed",
      name: "Fly & Walk Speed",
      description: "获取或修改玩家的飞行或移动速度。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player (fly|walk) speed \[(add|to) \{action\}\]",
      example: "\{player\} fly speed\r\\n\{player\} fly speed \{to\} 100\r\\n\{player\} walk speed \{add\} 100"
    },
    {
      id: "flying",
      name: "Flying",
      description: "判断或修改玩家是否在飞行状态。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player flying \[to \{action\}\]",
      example: "\{player\} flying\r\\n\{player\} flying \{to\} true"
    },
    {
      id: "food_level",
      name: "Food Level",
      description: "获取或修改玩家的饥饿值。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player food level \[(add|to) \{action\}\]",
      example: "\{player\} food level\r\\n\{player\} food level \{to\} 100\r\\n\{player\} food level \{add\} 100"
    },
    {
      id: "foreach",
      name: "ForEach",
      description: "遍历第一个动作的\{返回值\}中所有\{成员\}，并作为\{临时变量\}传入第二个动作。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "for \{token\} in \{action\} then \{action\}",
      example: "\{for\} i \{in\} range 1 to 10 \{then\} print &i\r\\n\{for\} i \{in\} players \{then\} print &i"
    },
    {
      id: "format_time",
      name: "Format Time",
      description: "使用特定的方式\{格式化\}特定的时间。\r\\n\r\\n",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "format \{action\} (by|with) \{token\}",
      example: "\{format\} date \{with\} \"yyyy-MM-dd HH:mm\"\r\\n\{format\} 1628773023000 \{with\} \"yyyy-MM-dd HH:mm\""
    },
    {
      id: "gamemode",
      name: "GameMode",
      description: "获取或修改玩家的游戏模式。\r\\n\r\\n可用模式：\r\\n\{生存\}：SURVIVAL, 0\r\\n\{创造\}：CREATIVE, 1\r\\n\{冒险\}：ADVENTURE, 2\r\\n\{观察\}：SPECTATOR, 3",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player gamemode \[to \{action\}\]",
      example: "\{player\} gamemode\r\\n\{player\} gamemode \{to\} survival"
    },
    {
      id: "gliding",
      name: "Gliding",
      description: "判断或修改玩家是否在滑翔状态。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player gliding \[to \{action\}\]",
      example: "\{player\} gliding\r\\n\{player\} gliding \{to\} true"
    },
    {
      id: "glowing",
      name: "Glowing",
      description: "判断或修改玩家是否在发光状态。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player glowing \[to \{action\}\]",
      example: "\{player\} glowing\r\\n\{player\} glowing \{to\} true"
    },
    {
      id: "gravity",
      name: "Gravity",
      description: "判断或修改玩家是否拥有重力。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player gravity \[(add|to) \{action\}\]",
      example: "\{player\} gravity\r\\n\{player\} gravity \{to\} true"
    },
    {
      id: "health",
      name: "Health",
      description: "获取或修改玩家的生命或最大生命。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player \[max \]health \[(add|to) \{action\}\]",
      example: "\{player\} health\r\\n\{player\} health \{to\} 100\r\\n\{player\} max health \{add\} 100"
    },
    {
      id: "inline",
      name: "Inline",
      description: "替换动作的\{返回值\}中所有\{内联脚本\}。 \r\\n内联脚本指在字符串中使用 \{\\\{\\\{\} ... \{\\\}\\\}\} 插入脚本代码。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "inline \{action\} | function \{action\}",
      example: "\{inline\} \"my name is \{\\\{\\\{\} sender \{\\\}\\\}\}\"\r\\n\{inline\} \"permission \{\\\{\\\{\} permission admin \{\\\}\\\}\}\""
    },
    {
      id: "inside_vehicle",
      name: "Inside Vehicle",
      description: "判断玩家是否在载具中。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player inside vehicle",
      example: "\{player\} inside vehicle"
    },
    {
      id: "javascript",
      name: "JavaScript",
      description: "运行 \{JavaScript\} 代码，并\{返回\}结果。\r\\n并传入当前程序的所有变量，以及事件 (\{event\})、执行者 (\{sender\})、服务器 (\{server\})。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "(javascript|js|$) \{token\}",
      example: "if \{$\} sender.isOp() then print \"success\"\r\\nif \{$\} 'sender.getName() == \"CONSOLE\"' then print \"is console\"\r\\n\r\\n\{javascript\} 'sender.sendMessage(\"Hello World!\")'"
    },
    {
      id: "join",
      name: "Join",
      description: "将动作列表的所有\{返回值\}合并为\{字符串\}返回，默认使用\{空格\}作为分隔。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "join \{action list\} \[by \{token\}\]",
      example: "\{join\} \{\[\} 1 1 2 3 4 \{\]\}\r\\n\{join\} \{\[\} 1 1 2 3 4 \{\]\} \{by\} \"-\""
    },
    {
      id: "jumping",
      name: "Jumping",
      description: "判断或修改玩家是否在跳跃状态。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player jumping \[to \{action\}\]",
      example: "\{player\} jumping\r\\n\{player\} jumping \{to\} true"
    },
    {
      id: "last_played",
      name: "Last Played",
      description: "返回玩家的最后游戏、登陆时间。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player last (played|login)",
      example: "\{player\} last played\r\\n\{player\} last login"
    },
    {
      id: "leashed",
      name: "Leashed",
      description: "Returns whether the entity is currently leashed.",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player leashed",
      example: "\{player\} leashed"
    },
    {
      id: "level",
      name: "Level",
      description: "获取或修改玩家的等级。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player level \[(add|to) \{action\}\]",
      example: "\{player\} level\r\\n\{player\} level \{to\} 10\r\\n\{player\} level \{add\} 10"
    },
    {
      id: "locale",
      name: "Locale",
      description: "获取玩家的客户端语言。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player locale",
      example: "\{player\} locale"
    },
    {
      id: "location",
      name: "Location",
      description: "构建一个坐标。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "location \{action\} \{action\} \{action\} \{action\} \[and \{action\} \{action\}\]",
      example: "\{location\} world 0 0 0\r\\n\{location\} world 0 0 0 \{and\} 0 0"
    },
    {
      id: "location1",
      name: "Location",
      description: "获取或修改玩家的坐标。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player location \[to \{location\}\]",
      example: "\{player location\}\r\\n\{player location\} to location world 0 0 0"
    },
    {
      id: "location_angle",
      name: "Location Angle",
      description: "获取或修改玩家的角度。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player (yaw|pitch) \[(add|to) \{action\}\]",
      example: "\{player\} yaw\r\\n\{player\} yaw \{to\} 0\r\\n\{player\} pitch \{add\} 10"
    },
    {
      id: "location_x,y,z",
      name: "Location X,Y,Z",
      description: "获取玩家的坐标轴。使用 \{block\} 则返回整数（方块）坐标。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player \[block \](x|y|z)",
      example: "\{player\} x\r\\n\{player\} y\r\\n\{player\} block z"
    },
    {
      id: "map",
      name: "Map",
      description: "遍历第一个动作的\{返回值\}中所有\{成员\}，并作为\{临时变量\}传入第二个动作。\r\\n最终将所有第二个动作的\{返回值\}作为\{集合\}返回。\r\\n\r\\n与 \{#ForEach\} 动作不同的是，\{#Map\} 则会整理每一次\{非空\}的处理结果。\r\\n\r\\nReturns a list containing the results of applying the given transform function to each element in the original collection.",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "map \{token\} in \{action\} with \{action\}",
      example: "\{map\} i \{in\} range 1 to 10 \{with\} $ \"i  10\"\r\\n\{map\} i \{in\} range 1 to 10 \{with\} math  \[ &i 10 \]"
    },
    {
      id: "math",
      name: "Math",
      description: "使用\{数学运算符\}处理动作列表的所有\{返回值\}。\r\\n\r\\n支持的运算符:\r\\n\{加\}：\+, add, plus\r\\n\{减\}：-, sub, minus\r\\n\{乘\}：, mul, times\r\\n\{除\}：/, div, divided\r\\n",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "math \{symbol\} \{action list\}",
      example: "\{math add \[\} 1 2 3 \{\]\}\r\\n\{math mul \[\} 1 2 3 \{\]\}"
    },
    {
      id: "name",
      name: "Name",
      description: "获取玩家的游戏名称、展示名称或列表名称。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player \[(display|list) \] name",
      example: "\{player\} name\r\\n\{player\} list name\r\\n\{player\} display name"
    },
    {
      id: "no_damage_tick",
      name: "No Damage Ticks",
      description: "获取或修改玩家的无敌时间。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player no damage ticks \[(add|to) \{action\}\]",
      example: "\{player\} no damage ticks\r\\n\{player\} no damage ticks \{to\} 100\r\\n\{player\} no damage ticks \{add\} 100"
    },
    {
      id: "null",
      name: "Null",
      description: "返回一个\{空\}值。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "null",
      example: "check &test is \{null\}\r\\ncheck &test not \{null\}"
    },
    {
      id: "on_guard",
      name: "On Ground",
      description: "判断玩家是否在地面上，该数据由客户端返回，可能会被篡改。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player on ground",
      example: "\{player\} on ground"
    },
    {
      id: "op",
      name: "Op",
      description: "判断或修改玩家是否为 OP 权限。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player op \[to \{action\}\]",
      example: "\{player\} op\r\\n\{player\} op \{to\} true"
    },
    {
      id: "optional",
      name: "Optional",
      description: "对动作的\{返回值\}进行非空判断。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "optional \{action\} else \{action\}",
      example: "\{optional\} null \{else\} yes"
    },
    {
      id: "pass",
      name: "Pass",
      description: "返回一个\{空字符串\}。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "pass",
      example: "title \"Hello World!\" subtitle \{pass\}"
    },
    {
      id: "pause",
      name: "Pause",
      description: "使程序的\{生命周期\}强制暂停，该操作不可被撤销，直到程序关闭。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "pause",
      example: "\{pause\}"
    },
    {
      id: "permission",
      name: "Permission",
      description: "将动作的\{返回值\}作为权限判断\{执行者\}是否持有该权限。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "perm\[ission\] \{action\}",
      example: "\{perm\} admin \\n\{permission\} admin"
    },
    {
      id: "placeholderapi",
      name: "PlaceholderAPI",
      description: "替换动作的\{返回值\}中所有 \{PlaceholderAPI\} 变量。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "papi \{action\} | placeholder \{action\}",
      example: "\{papi\} \"%player_name%\"\r\\n\{placeholder\} \"%player_name%\""
    },
    {
      id: "print",
      name: "Print",
      description: "将动作的\{返回值\}作为信息发送给\{控制台\}。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "print \{action\} | log \{action\}",
      example: "\{print\} \"Hello World!\""
    },
    {
      id: "random",
      name: "Random",
      description: "在一定的范围内\{随机\}返回一个\{浮点数\}，或从动作的\{返回值\}中\{随机\}返回一个\{成员\}。\r\\n在定义范围时可以省略第二个参数来选定 0 ~ 范围。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "random \{double\} \[to \{double\}\] | random \{action\}",
      example: "\{random\} 10\r\\n\{random\} 1 \{to\} 10\r\\n\{random\} range 1 to 10\r\\n\{random\} array \[ 1 2 3 4 5 \]\r\\n\r\\n\{random\} players"
    },
    {
      id: "random2",
      name: "Random2",
      description: "在一定的范围内\{随机\}返回一个\{浮点数\}或\{整数\}，相比于 #\{random\}，这个范围由\{动作\}的返回值表示。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "random2 \{action\} to \{action\}",
      example: "\{random2\} 1 \{to\} 10\r\\n\{random2\} 1 \{to\} \{random2\} 10 \{to\} 20\r"
    },
    {
      id: "range",
      name: "Range",
      description: "创建一组数字\{集合\}，当你\{省略\}步长或使用\{整型\}作为步长时，则创建的是整型集合，反之创建浮点数集合。\r\\n集合的类型取决于步长的类型，而不是范围数字类型。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "range \{number\} to \{number\} \[step \{number\}\]",
      example: "\{range\} 1 \{to\} 10\r\\n\{range\} 1 \{to\} 10 \{step\} 2\r\\n\{range\} 1 \{to\} 10 \{step\} 2.5"
    },
    {
      id: "remaining_air",
      name: "Remaining Air",
      description: "获取或修改玩家的氧气。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player remaining air \[(add|to) \{action\}\]",
      example: "\{player\} remaining air\r\\n\{player\} remaining air \{to\} 100\r\\n\{player\} remaining air \{add\} 100"
    },
    {
      id: "riptiding",
      name: "Riptiding",
      description: "判断玩家是否在激流（三叉戟）状态。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player riptiding",
      example: "\{player\} riptiding"
    },
    {
      id: "round",
      name: "Round",
      description: "将动作的\{返回值\}作为\{浮点数\}并四舍五入为最接近的\{整数\}。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "round \{action\}",
      example: "\{round\} 100.5"
    },
    {
      id: "saturation",
      name: "Saturation",
      description: "获取或修改玩家的饱食度。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player saturation \[(add|to) \{action\}\]",
      example: "\{player\} saturation\r\\n\{player\} saturation \{to\} 100\r\\n\{player\} saturation \{add\} 100"
    },
    {
      id: "scale",
      name: "Scaled",
      description: "将动作的\{返回值\}作为\{浮点数\}并保留小数点后两位。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "scale\[d\] \{action\}",
      example: "\{scale\} 100.5"
    },
    {
      id: "size",
      name: "Size",
      description: "将动作的\{返回值\}作为\{列表\}获取其长度。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "size \{action\}",
      example: "\{size\} range 1 to 10"
    },
    {
      id: "sleep_ignored",
      name: "Sleep Ignored",
      description: "Returns whether the player is sleeping ignored.\r\\n\r\\nSets whether the player is ignored as not sleeping. If everyone is either sleeping or has this flag set, then time will advance to the next day. If everyone has this flag set but no one is actually in bed, then nothing will happen.",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player sleep ignored \[to \{action\}\]",
      example: "\{player\} sleep ignored\r\\n\{player\} sleep ignored \{to\} true"
    },
    {
      id: "sleep_ticks",
      name: "Sleep Ticks",
      description: "返回玩家的睡眠时间。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player sleep ticks",
      example: "\{player\} sleep ticks"
    },
    {
      id: "sleeping",
      name: "Sleeping",
      description: "判断玩家是否在睡眠状态。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player sleeping",
      example: "\{player\} sleeping"
    },
    {
      id: "sneaking",
      name: "Sneaking",
      description: "判断玩家是否在潜行状态。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player sneaking",
      example: "\{player\} sneaking"
    },
    {
      id: "sound",
      name: "Sound",
      description: "将文本作为音效播放，默认音量与音调均为 \{1.0\}。\r\\n使用 \"\{resource:\}\" 作为前缀则播放\{资源包\}中的音效。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "sound \{token\} \[by \{double\} \{double\}\]",
      example: "\{sound\} AMBIENT_CAVE\r\\n\{sound\} AMBIENT_CAVE \{by\} 1 1\r\\n\{sound\} resource:custom.sound \{by\} 1 1"
    },
    {
      id: "split",
      name: "Split",
      description: "对动作的\{返回值\}作为字符串\{切片\}并返回。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "split \{action\} \[with \{token\}\]",
      example: "\{split\} \"yes\"\r\\n\{split\} \"yes\" with \"e\""
    },
    {
      id: "sprinting",
      name: "Sprinting",
      description: "判断玩家是否在疾跑状态。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player sprinting",
      example: "\{player\} sprinting"
    },
    {
      id: "subtitle",
      name: "Subtitle",
      description: "将动作的\{返回值\}作为\{副标题\}信息发送给\{执行者\}，默认的淡入淡出、停留、时间为\{0\}、\{20\}、\{0\}。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "subtitle \{action\} \[by \{int\} \{int\} \{int\}\]",
      example: "\{subtitle\} \"Hello Kether!\"\r\\n\{subtitle\} \"Hello Kether!\" \{by\} 10 20 10"
    },
    {
      id: "swimming",
      name: "Swimming",
      description: "判断或修改玩家是否在游泳状态。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player swimming \[(add|to) \{action\}\]",
      example: "\{player\} swimming\r\\n\{player\} swimming \{to\} true"
    },
    {
      id: "switch",
      name: "Switch",
      description: "切换当前\{观察者\}到特定玩家。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "switch \{action\}",
      example: "\{switch\} bukkitObj"
    },
    {
      id: "tell",
      name: "Tell",
      description: "将动作的\{返回值\}作为信息发送给\{执行者\}。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "tell \{action\} | send \{action\} | message \{action\}",
      example: "\{tell\} \"Hello World!\"\r\\n\{send\} \"Hello World!\""
    },
    {
      id: "time",
      name: "Time",
      description: "当前系统时间。\r\\n\r\\nReturns the current time in milliseconds. Note that while the unit of time of the return value is a millisecond, the granularity of the value depends on the underlying operating system and may be larger. For example, many operating systems measure time in units of tens of milliseconds.\r\\nSee the description of the class Date for a discussion of slight discrepancies that may arise between \"computer time\" and coordinated universal time (UTC).\r\\n\r\\n\{Returns: \}the difference, measured in milliseconds, between the current time and midnight, January 1, 1970 UTC.",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "time | date",
      example: "\{time\}\r\\n\{date\}"
    },
    {
      id: "time_format",
      name: "Time Format",
      description: "使用特定的方式\{格式化\}当前系统时间。\r\\n\r\\n",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "time as \{token\} | date as \{token\}",
      example: "\{time as\} \"yyyy-MM-dd\"\r\\n\{date as\} \"yyyy-MM-dd HH:mm:ss\""
    },
    {
      id: "title",
      name: "Title",
      description: "将动作的\{返回值\}作为\{标题\}信息发送给\{执行者\}，默认的淡入淡出、停留、时间为\{0\}、\{20\}、\{0\}。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "title \{action\} \[subtitle \{action\}\] \[by \{int\} \{int\} \{int\}\]",
      example: "\{title\} \"Hello World!\"\r\\n\{title\} \"Hello World!\" \{subtitle\} \"Hello Kether!\"\r\\n\{title\} \"Hello World!\" \{subtitle\} \"Hello Kether!\" \{by\} 10 20 10"
    },
    {
      id: "toast",
      name: "Toast",
      description: "将动作的\{返回值\}作为\{成就信息\}发送给\{执行者\}。\r\\n支持\{列表\}作为动作的返回值。\r\\n\r\\n需要服务端版本高于 1.13",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "toast \{material\} \{action\} \[(by|with) (task|goal|challenge)\]",
      example: "\{toast\} diamond array \[ \"Hi\" \"Kether\" \]\r\\n\{toast\} diamond array \[ \"Hi\" \"Kether\" \] \{by\} goal\r\\n\{toast\} diamond \"Hi Kether\" \{by\} challenge"
    },
    {
      id: "type",
      name: "Type",
      description: "创建并返回一个最接近的\{字符串\}、\{整型\}、\{长整型\}、\{浮点数\} 或 \{布尔值\}。\r\\n当字符串中存在空格时需将内容写在\{双引号\}或\{单引号\}中，若内容中不含空格则允许省略引号。 \r\\n\r\\n或使用\{指定类型\}进行格式化（以动作作为参数）：\r\\nint, long, float, double, boolean",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "type \{token\} | type \{type\} \{action\}",
      example: "\{type\} 100\r\\n\{type\} 100.5\r\\n\{type\} Hello\r\\n\{type\} \" Hello 'World'! \"\r\\n\{type\} ' Hello \"Kether\"! '\r\\n\r\\n\{type int\} 1.0\r\\n\{type double\} 10.9 "
    },
    {
      id: "variables",
      name: "Variables",
      description: "将所有变量的\{节点\}合并字符串\{列表\}返回。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "vars | variables",
      example: "\{vars\}"
    },
    {
      id: "warning",
      name: "Warning",
      description: "将动作的\{返回值\}作为警告发送给\{控制台\}。",
      provider: "TabooLib",
      type: "public",
      category: "未分类",
      syntax: "warn\[ing\] \{action\}",
      example: "\{warning\} \"Hello World!\""
    },
    {
      id: "whitelist",
      name: "Whitelist",
      description: "判断或修改玩家是否在白名单中。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player whitelist \[to \{action\}\]",
      example: "\{player\} whitelist\r\\n\{player\} whitelist \{to\} true"
    },
    {
      id: "world",
      name: "World",
      description: "获取玩家的当前所在世界名称。",
      provider: "TabooLib",
      type: "both",
      category: "未分类",
      syntax: "player world",
      example: "\{player\} world"
    },
  ]
};

export default tabooLib;
