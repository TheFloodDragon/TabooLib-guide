import { KetherActionModule } from './index';

const vulpecula: KetherActionModule = {
  name: "Vulpecula",
  color: "#ff69b4",
  actions: [
    {
      id: "event_cancel",
      name: "Event Cancel",
      description: "取消当前事件或设置事件是否取消",
      provider: "Vulpecula",
      type: "public",
      categories: ["事件处理"],
      syntax: "event cancel\r\\nevent cancel to \{action\}",
      example: "\{event cancel\}\r\\n\{event cancel\} to false"
    },
    {
      id: "event_wait",
      name: "Event Wait",
      description: "等待指定事件的发生并做自定义处理\r\\n\{具体写法详见：\}\r\\nhttps://www.yuque.com/lanscarlos/vulpecula-doc/action-event#x7y9W",
      provider: "Vulpecula",
      type: "public",
      categories: ["事件处理", "脚本控制"],
      syntax: "event (wait|require) \{token\} \{action\}",
      example: "\{event wait\} entity-shoot\r\\n\{event wait\} entity-shoot -filter check &event\[entity.type\] == PLAYER"
    },
    {
      id: "entity_damage",
      name: "Entity Damage",
      description: "对实体造成伤害",
      provider: "Vulpecula",
      type: "public",
      categories: ["实体控制"],
      syntax: "entity damage \{entity\} \[by \{damager\}\]",
      example: "\{entity damage\} &entity 10\r\\n\{entity damage\} &entity 10 by &player"
    },
    {
      id: "entity_potion",
      name: "Entity Potion",
      description: "给予/移除实体药水效果\r\\n\{具体写法详见：\}\r\\nhttps://www.yuque.com/lanscarlos/vulpecula-doc/action-entity#ZzVee",
      provider: "Vulpecula",
      type: "public",
      categories: ["实体控制", "药水效果"],
      syntax: "entity potion \{entity\} add|set \{type\} \[ args... \]\r\\nentity potion \{entity\} remove|rm \{type\}",
      example: "\{entity potion\} &entity add SLOW -level 2 -time 600\r\\n\{entity potion\} &entity remove SLOW"
    },
    {
      id: "entity_teleport",
      name: "Entity Teleport",
      description: "传送实体至指定位置",
      provider: "Vulpecula",
      type: "public",
      categories: ["实体控制", "世界与坐标"],
      syntax: "entity tp \{entity\} to \{location\}",
      example: "entity tp &entity to loc world 11 45 14"
    },
    {
      id: "regex",
      name: "Regex",
      description: "借助正则表达式查找或替换指定文本\r\\n\{具体写法详见：\}\r\\nhttps://www.yuque.com/lanscarlos/vulpecula-doc/action-regex",
      provider: "Vulpecula",
      type: "public",
      categories: ["文本处理", "正则表达式"],
      syntax: "regex find \{text\} (by|with|using) \{pattern\}\r\\nregex replace \{text\} (by|with|using) \{pattern\} then \{action\}\r\\nregex group \{action\}",
      example: "regex replace &text by \"(攻击力\\\+)(\\d\+)\" then \{\r\\n    join \[ regex group 1 math 1 \+ regex group 2 \]\r\\n\}"
    },
    {
      id: "function_call",
      name: "Function Call",
      description: "\{在 Shell 模式下该语句无任何意义。\}\r\\n调用已声明的任何函数，包括 main 函数。支持传递参数",
      provider: "Vulpecula",
      type: "private",
      categories: ["函数操作"],
      syntax: "func \{token\}\r\\nfunc \{token\} with \{action list\}",
      example: "\{func\} function_0\r\\n\{func\} function_1 with \[ 'Hello Vulpecula!' \]"
    },
  ]
};

export default vulpecula;
