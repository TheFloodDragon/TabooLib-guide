import { KetherActionModule } from './index';

const trMenu: KetherActionModule = {
  name: "TrMenu",
  color: "#f59e0b", // 橙色
  actions: [
    {
      id: "trm_money",
      name: "Money",
      description: "将动作的返回值作为 Vault 货币判断玩家是否持有",
      provider: "TrMenu",
      type: "private",
      category: "经济相关",
      syntax: "money <amount>",
      example: "print money 100"
    }
  ]
};

export default trMenu; 