import { KetherActionModule } from './index';

const arim: KetherActionModule = {
    name: "Arim",
    color: "hsl(185, 69.6%, 27.1%)",
    actions: [
        {
            id: "arim-weight",
            name: "arim-weight",
            description: "权重随机",
            provider: "Arim",
            type: "private",
            categories: ["逻辑运算"],
            syntax: "arim-weight / arim-random\narim-weight {action list} [(by|with) {action list}] [def {action}]",
            example: "arim-weight [ ele1 ele2 ele3 ] by [ 1 null 3 ] def 1\narim-weight [ ele1 ele2 ele3 ] by [ 1 2 3 ]"
        },
        {
            id: "arim-inv",
            name: "arim-inv",
            description: "背包物品检测",
            provider: "Arim",
            type: "private",
            categories: ["逻辑运算"],
            syntax: "arim-inv / arim-inventory\narim-inv {token} {action} [amount {action}]",
            example: "1. 检测背包合法物品：\narim-inv check \"name:all(start(&c机械),c(靴))\"\nset name to 靴\narim-inv has inline \"name:all(start(&c机械),c({{ get name }}))\" amount 10\n2. 扣除背包合法物品：\narim-inv take \"name:all(start(&c机械),c(靴))\"\nset name to 靴\narim-inv take inline \"name:all(start(&c机械),c({{ get name }}))\" amount 10\n3. 获取背包合法物品数量：\narim-inv count \"name:all(start(&c机械),c(靴))\"\nset name to 靴\narim-inv count inline \"name:all(start(&c机械),c({{ get name }}))\""
        }
    ]
};

export default arim;
