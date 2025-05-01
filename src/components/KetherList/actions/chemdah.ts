import { KetherActionModule } from './index';

const chemdah: KetherActionModule = {
  name: "Chemdah",
  color: "#10b981", // 绿色
  actions: [
    {
      id: "max",
      name: "Max",
      description: "取两值之最大",
      provider: "Chemdah",
      type: "private",
      category: "数学运算",
      syntax: "max <value1> <value2>",
      example: "max 1 10"
    },
    {
      id: "min",
      name: "Min",
      description: "取两值之最小",
      provider: "Chemdah",
      type: "private",
      category: "数学运算",
      syntax: "min <value1> <value2>",
      example: "min 1 10"
    }
  ]
};

export default chemdah; 