import { KetherActionModule } from './index';

const adyeshach: KetherActionModule = {
  name: "Adyeshach",
  color: "#c645c8",
  actions: [
    {
      id: "animation",
      name: "Animation",
      description: "让当前已选择的所有单位播放动作。\r\\n\r\\n\{已知的:\}\r\\nSWING_MAIN_HAND, TAKE_DAMAGE, LEAVE_BED, SWING_OFFHAND\r\\nCRITICAL_EFFECT, MAGIC_CRITICAL_EFFECT",
      provider: "Adyeshach",
      type: "both",
      category: "未分类",
      syntax: "animation \{token\}",
      example: "\{animation\} swing_main_hand"
    },
    {
      id: "controller",
      name: "Controller",
      description: "对当前已选择的所有单位赋予控制器。或移除、清空。\r\\n\r\\n\{已知的:\}\r\\nMove, Gravity, SmoothLook, LookAtPlayer, LookAtPlayerAlways\r\\nRandomLookGround, RandomStrollLand",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "controller (add|remove|reset) \{token\}",
      example: "\{controller add\} move\r\\n\{controller clear\}\r\\n\{controller remove\} gravity"
    },
    {
      id: "create",
      name: "Create",
      description: "在特定坐标创建单位。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "create \{token\} \{token\} at \{action\}",
      example: "\{create\} test villager \{at\} location world 0 0 0"
    },
    {
      id: "delete",
      name: "Delete",
      description: "删除并销毁已选择的所有单位。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "delete",
      example: "\{delete\}"
    },
    {
      id: "destroy",
      name: "Destroy",
      description: "销毁当前已选择的所有单位。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "destroy",
      example: "\{destroy\}"
    },
    {
      id: "look",
      name: "Look",
      description: "让当前已选择的所有单位看向某个坐标，并可选是否平滑视角移动。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "look \[smooth\] \[x to \{action\}\] \[y to \{action\}\] \[z to \{action\}\]",
      example: "\{look\} x \{to\} 0\r\\n\{look\} x \{to\} 0 y \{to\} 0 z \{to\} 0\r\\n\{look smooth\} x \{to\} 0"
    },
    {
      id: "meta",
      name: "Meta",
      description: "对当前已选择的所有单位修改元数据。或重置。\r\\n\r\\n\{详见:\}\r\\nhttps://wiki.ptms.ink/index.php?title=AdyeshachPremium:开始:附录:第二节",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "meta set \{token\} \[to \{token\}\] | meta reset \{token\}",
      example: "\{meta set\} entityPose \{to\} sleeping\r\\n\{meta reset\} entityPose"
    },
    {
      id: "move",
      name: "Move",
      description: "让当前已选择的所有单位走向某个坐标，并可选是否为相对坐标。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "move \[relative\] \[x to \{action\}\] \[y to \{action\}\] \[z to \{action\}\]",
      example: "\{move\} x \{to\} 0\r\\n\{move\} x \{to\} 0 y \{to\} 0 z \{to\} 0\r\\n\{move relative\} x \{to\} 10"
    },
    {
      id: "passenger",
      name: "Passenger",
      description: "对当前已选择的所有单位添加骑乘单位。或移除、清空。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "passenger (add|remove|reset) \{token\}",
      example: "\{passenger add\} test\r\\n\{passenger clear\}\r\\n\{passenger remove\} test"
    },
    {
      id: "remove",
      name: "Remove",
      description: "删除当前已选择的所有单位。从管理器中移除，不再接受托管，但不会销毁实体。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "remove",
      example: "\{remove\}"
    },
    {
      id: "respawn",
      name: "Respawn",
      description: "重新生成当前已选择的所有单位。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "respawn",
      example: "\{respawn\}"
    },
    {
      id: "select",
      name: "Select",
      description: "将动作\{返回值\}作为单位 \{ID\} 或 \{UUID\} 进行选择。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "select \{action\} \[by (id|uuid)\]",
      example: "\{select\} test\r\\n\{select\} test \{by\} id"
    },
    {
      id: "sleeping",
      name: "Sleeping",
      description: "让当前已选择的所有单位播放睡眠动画。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "sleeping",
      example: "\{sleeping\}"
    },
    {
      id: "still",
      name: "Still",
      description: "让当前已选择的所有单位停止移动，与 \{#Move\} 对立。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "still",
      example: "\{still\}"
    },
    {
      id: "freeze",
      name: "Freeze",
      description: "冻结或恢复当前已选择的所有单位的任何行为。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "freeze \{boolean\}",
      example: "\{freeze\} true\\n\{freeze\} false"
    },
    {
      id: "tag",
      name: "Tag",
      description: "对当前已选择的所有单位修改标签。或移除、清空、判断是否持有。\\n使用 \{persistent\} 关键字以操作持久化标签。\\n但需要注意持久化标签需要 Adyeshach 至少在 1.4.21 版本以上。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "tag \[persistent\] (set|remove|reset|has) \{token\} \[to \{token\}\]",
      example: "\{tag set\} test \{to\} 1\r\\n\{tag remove\} test\r\\n\r\\n\{tag persistent set\} p-test \{to\} 1\r\\n\{tag persistent remove\} p-test"
    },
    {
      id: "teleport",
      name: "Teleport",
      description: "将当前已选择的所有单位传送至指定坐标，与 \{#Create\} 动作中的坐标写法相同。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "teleport \{location\}",
      example: "\{teleport\} location world 0 80 0"
    },
    {
      id: "use",
      name: "Use",
      description: "使用特定的单位管理器。或临时的。\r\\n\r\\n\{已知的:\}\r\\npublic, private",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "use \{token\} \[temp\[orary\]\]",
      example: "\{use\} public\r\\n\{use\} public \{temp\}\r\\n\{use\} private \{temporary\}"
    },
    {
      id: "viewer",
      name: "Viewer",
      description: "将动作\{返回值\}作为在线玩家添加到当前已选择的所有单位的观察者列表。或移除、清空。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "viewer (add|remove|reset) \{action\}",
      example: "\{viewer add\} bukkitObj\r\\n\{viewer clear\}\r\\n\{viewer remove\} Arasple"
    },
    {
      id: "modelengine_animation_add",
      name: "ModelEngine Animation Add",
      description: "播放 ModelEngine 动画，单位必须绑定模型。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "modelengine animation add \{token\} \[speed \{double\} \[lerpin \{int\} \[lerpout \{int\}\]\]\]",
      example: "\{modelengine animation add\} test \{speed\} 1\\n\{modelengine animation add\} test \{speed\} 1 \{lerpin\} 0 \{lerpout\} 1"
    },
    {
      id: "modelengine_animation_remove",
      name: "ModelEngine Animation Remove",
      description: "移除 ModelEngine 动画，单位必须绑定模型。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "modelengine animation remove \{token\} \[ingorelerp \{int\}\]",
      example: "\{modelengine animation remove\} test\\n\{modelengine animation remove\} test \{ingorelerp\} true"
    },
    {
      id: "germengine_animation_add",
      name: "GermEngine Animation Add",
      description: "播放 GermEngine 动画，单位必须绑定模型。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "germengine animation send \{token\}",
      example: "\{germengine animation send\} test"
    },
    {
      id: "germengine_animation_remove",
      name: "GermEngine Animation Remove",
      description: "移除 GermEngine 动画，单位必须绑定模型。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "germengine animation remove \{token\}",
      example: "\{germengine animation stop\} test"
    },
    {
      id: "position",
      name: "Position",
      description: "获取当前已选择的单位的坐标，如果选择了多个单位则返回一个列表。",
      provider: "Adyeshach",
      type: "private",
      category: "未分类",
      syntax: "npc position",
      example: "\{npc position\}\\nelement 0 in \{npc position\}"
    },
  ]
};

export default adyeshach;
