import { KetherActionModule } from './index';

const invero: KetherActionModule = {
  name: "Invero",
  color: "#8b5cf6",  // 紫色
  actions: [
    {
      id: "message",
      name: "Message",
      description: "向玩家发送一个支持 Invero 相关格式化的消息",
      provider: "Invero",
      type: "private",
      category: "消息显示",
      syntax: "msg <消息文本>",
      example: "msg \"<red>Hello {{player name}}\""
    }
  ]
};

export default invero;