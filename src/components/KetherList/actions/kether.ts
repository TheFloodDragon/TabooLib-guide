import { KetherActionModule } from './index';

const kether: KetherActionModule = {
  name: "Kether",
  color: "#b5254b",
  actions: [
    {
      id: "actionbar",
      name: "All",
      description: "判断动作列表的所有\{返回值\}是否均为\{是\}。",
      provider: "Kether",
      type: "public",
      categories: ["逻辑与数学"],
      syntax: "all \{action list\}",
      example: "\{all \[\} player op player sneaking \{\]\}\r\\n\{all \[\} permission userA permission userB permission userC \{\]\}"
    },
    {
      id: "any",
      name: "Any",
      description: "判断动作列表的所有\{返回值\}是否含有\{是\}。",
      provider: "Kether",
      type: "public",
      categories: ["逻辑与数学"],
      syntax: "any \{action list\}",
      example: "\{any \[\} player op player sneaking \{\]\}\r\\n\{any \[\} permission userA permission userB permission userC \{\]\}"
    },
    {
      id: "async",
      name: "Async",
      description: "在不受生命周期控制的\{异步\}计划中执行动作。\r\\n当程序运行结束后，所有未完成的 \{#Async\} 动作会被直接关闭。",
      provider: "Kether",
      type: "public",
      categories: ["脚本控制"],
      syntax: "async \{action\}",
      example: "\{async\} \{\\\{\} sleep 1s print \"Hello\" \{\\\}\} print \"World!\""
    },
    {
      id: "await",
      name: "Await",
      description: "等待动作完成。",
      provider: "Kether",
      type: "public",
      categories: ["脚本控制"],
      syntax: "await \{action\}",
      example: "\{await\} print \"Hello World!\""
    },
    {
      id: "await_all",
      name: "Await All",
      description: "等待\{动作列表\}中的\{所有动作\}完成。",
      provider: "Kether",
      type: "public",
      categories: ["脚本控制"],
      syntax: "await_all \{action list\}",
      example: "\{await_all \[\} print \"Hello\" sleep 1s \{\]\} print \"World!\""
    },
    {
      id: "await_any",
      name: "Await Any",
      description: "等待\{动作列表\}中的\{任意动作\}完成。",
      provider: "Kether",
      type: "public",
      categories: ["脚本控制"],
      syntax: "await_any \{action list\}",
      example: "\{await_any \[\} print \"Hello\" sleep 1s \{\]\} print \"World!\""
    },
    {
      id: "call",
      name: "Call",
      description: "\{在 Shell 模式下该语句无任何意义。\}\r\\n调用已声明的任何函数，包括 \{main\} 函数。",
      provider: "Kether",
      type: "public",
      categories: ["函数操作"],
      syntax: "call \{token\}",
      example: "\{call\} function_0"
    },
    {
      id: "exit",
      name: "Exit",
      description: "退出程序。",
      provider: "Kether",
      type: "public",
      categories: ["脚本控制"],
      syntax: "exit (success|pause|cooldown)",
      example: "\{exit\} success \r\\n\{exit\} pause"
    },
    {
      id: "goto",
      name: "Goto",
      description: "\{在 Shell 模式下该语句无任何意义。\}\r\\n跳转到已声明的任何函数，包括 \{main\} 函数。",
      provider: "Kether",
      type: "public",
      categories: ["函数操作"],
      syntax: "goto \{token\}",
      example: "\{goto\} function_0"
    },
    {
      id: "if_else",
      name: "If & Else",
      description: "基础逻辑语句。\r\\n当一个动作的\{返回值\}为\{是\}时，执行第二个动作，反之执行第三个动作。",
      provider: "Kether",
      type: "public",
      categories: ["逻辑与数学", "脚本控制"],
      syntax: "If \{action\} then \{action\} \[else \{action\}\]",
      example: "\{if\} permission \"admin\" \{then\} tell \"success\"\r\\n\{if\} permission \"admin\" \{then\} tell \"success\" \{else\} tell \"denied\""
    },
    {
      id: "literal",
      name: "Literal",
      description: "创建并返回一个\{字符串\}。\r\\n当字符串中存在空格时需将内容写在\{双引号\}或\{单引号\}中，若内容中不含空格则允许省略引号。\r\\n\r\\n\{注意：\}\r\\n即使是 \{literal 100\} 也并非整数类型，如有需要请使用 \{#Type\} 动作。",
      provider: "Kether",
      type: "public",
      categories: ["数据处理"],
      syntax: "literal \{token\} | \{token\}",
      example: "\{literal\} Hello\r\\n\{\}Hello\r\\n\{\}\" Hello 'World'! \"\r\\n\{\}' Hello \"Kether\"! '"
    },
    {
      id: "not",
      name: "Not",
      description: "判断动作的\{返回值\}是否为\{否\}，即否定动作的结果。",
      provider: "Kether",
      type: "public",
      categories: ["逻辑与数学"],
      syntax: "not \{action\}",
      example: "\{not\} player op\r\\n\{not\} permission userA\r\\n\{not\} \{not\} \{not\} \{not\} \{not\} \{not\} \{not\} \{not\} \{not\} \{not\} \{not\} true"
    },
    {
      id: "repeat",
      name: "Repeat",
      description: "重复一个动作数次。",
      provider: "Kether",
      type: "public",
      categories: ["脚本控制"],
      syntax: "repeat \{int\} \{action\}",
      example: "\{repeat\} 10 print \"Hello World!\""
    },
    {
      id: "sleep",
      name: "Sleep",
      description: "堵塞工作线程特定时间段。",
      provider: "Kether",
      type: "public",
      categories: ["脚本控制"],
      syntax: "(sleep|delay|wait) \{duration\}",
      example: "\{sleep\} 0.1s\r\\n\{sleep\} 1.5s"
    },
    {
      id: "variable_get",
      name: "Variable Get",
      description: "获取变量。",
      provider: "Kether",
      type: "public",
      categories: ["数据处理"],
      syntax: "get \{token\} | &\{token\}",
      example: "\{get\} test\r\\n\{&\}test"
    },
    {
      id: "variable_set",
      name: "Variable Set",
      description: "将变量设置为\{基本类型\}或一个动作的\{返回值\}。",
      provider: "Kether",
      type: "public",
      categories: ["数据处理"],
      syntax: "set \{token\} \{token\} | set \{token\} to \{action\}",
      example: "\{set\} test yes\r\\n\{set\} test \{to\} yes"
    },
    {
      id: "while",
      name: "While",
      description: "基础逻辑语句。\r\\n当一个动作的\{返回值\}为\{是\}时，重复第二个动作直到第一个动作的的\{返回值\}为\{否\}。",
      provider: "Kether",
      type: "public",
      categories: ["逻辑与数学", "脚本控制"],
      syntax: "while \{action\} then \{action\}",
      example: "\{while\} player sneaking \{then\} \{\\\{\} tell sneaking sleep 1s \{\\\}\}"
    },
  ]
};

export default kether;
