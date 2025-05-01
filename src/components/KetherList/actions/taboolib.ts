import { KetherActionModule } from './index';

const taboolib: KetherActionModule = {
  name: "TabooLib",
  color: "#3b82f6", // 亮蓝色
  actions: [
    {
      id: "absorption_amount",
      name: "Absorption Amount",
      description: "获取或设置玩家的额外生命",
      provider: "TabooLib",
      type: "public",
      category: "玩家属性",
      syntax: "player absorption amount [to <value>|add <value>]",
      example: "player absorption amount\nplayer absorption amount to 100\nplayer absorption amount add 100"
    },
    {
      id: "action_bar",
      name: "Action Bar",
      description: "将动作的返回值作为动作栏信息发送给执行者",
      provider: "TabooLib",
      type: "public",
      category: "消息显示",
      syntax: "actionbar <text>",
      example: "actionbar \"Hello World!\""
    },
    {
      id: "math",
      name: "Math",
      description: "使用数学运算符处理动作列表的所有返回值\n\n支持的运算符:\n加：+, add, plus\n减：-, sub, minus\n乘：*, mul, times\n除：/, div, divided",
      provider: "TabooLib",
      type: "public",
      category: "数学运算",
      syntax: "math <operation> [<args>...] | math <expression>",
      example: "math add [ 1 2 3 ]\nmath mul [ 1 2 3 ]\nmath 1 + 3 * 5 / 6 - 2"
    }
  ]
};

export default taboolib; 