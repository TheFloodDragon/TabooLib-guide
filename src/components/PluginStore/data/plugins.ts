export interface Plugin {
  id: string;
  name: string;
  description: string;
  category: string;
  links: {
    type: 'github' | 'mcbbs' | 'minebbs' | 'spigotmc' | 'download' | 'docs';
    url: string;
    label: string;
  }[];
  letter: string;
  detail?: string;
}

// 看到下面的 category 字段了吗，你可以通过 PluginDetail.tsx 来指定新的分类或修改
// 看到下面的 links 字段了吗，你可以通过 index.tsx 来指定新的链接类型或修改新的，记得改上面的links.type！
export const plugins: Plugin[] = [
  {
    id: 'aiyatsbus',
    name: 'aiyatsbus',
    description: '附魔插件',
    category: 'enchant',
    letter: 'A',
    detail: '一个强大的附魔插件，支持自定义附魔效果、附魔属性和附魔书。通过简单的配置，可以创建各种独特的附魔效果，增强游戏体验。',
    links: [
      {
        type: 'github',
        url: 'https://github.com/TabooLib/Adyeshach',
        label: 'GitHub'
      },
      {
        type: 'docs',
        url: 'https://a.ptms.ink/category/adyeshach',
        label: '文档'
      }
    ]
  },
  {
    id: 'adyeshach',
    name: 'Adyeshach',
    description: 'NPC 插件',
    category: 'npc',
    letter: 'A',
    detail: 'Adyeshach是一个高级NPC插件，提供丰富的API和配置选项。支持多种NPC类型、动作、对话和互动功能。可以轻松创建栩栩如生的NPC角色，增强服务器的游戏体验。',
    links: [
      {
        type: 'github',
        url: 'https://github.com/TabooLib/Adyeshach',
        label: 'GitHub'
      },
      {
        type: 'docs',
        url: 'https://a.ptms.ink/category/adyeshach',
        label: '文档'
      }
    ]
  },
  {
    id: 'attributeplus',
    name: 'AttributePlus',
    description: '属性插件',
    category: 'attribute',
    letter: 'A',
    detail: 'AttributePlus是一个全面的属性系统插件，允许服务器创建自定义属性系统。支持装备属性、玩家属性、属性条件等功能。可以与其他插件无缝集成，为RPG服务器提供强大的属性支持。',
    links: [
      {
        type: 'mcbbs',
        url: 'https://www.mcbbs.co/thread-43-1-1.html',
        label: 'MCBBS'
      },
      {
        type: 'docs',
        url: 'https://ersha.gitbook.io/attributeplus-pro',
        label: '文档'
      }
    ]
  },
  {
    id: 'akarilevel',
    name: 'AkariLevel',
    description: '自定义玩家等级',
    category: 'level',
    letter: 'A',
    detail: 'AkariLevel提供了灵活的玩家等级系统，支持多种等级类型和自定义升级条件。可以设置等级奖励、等级显示和等级权限，适合各类服务器使用。通过简单的配置，可以创建复杂的等级进阶系统。',
    links: [
      {
        type: 'mcbbs',
        url: 'https://www.mcbbs.co/thread-213-1-1.html',
        label: 'MCBBS'
      },
      {
        type: 'github',
        url: 'https://github.com/CPJiNan/AkariLevel',
        label: 'Github'
      },
      {
        type: 'docs',
        url: 'https://cpjinan.github.io/Wiki/AkariLevel/',
        label: '文档'
      }
    ]
  },
  {
    id: 'bilibilivideo',
    name: 'BilibiliVideo',
    description: 'Bilibili 视频一键三连后自助发放奖励',
    category: 'utility',
    letter: 'B',
    detail: 'BilibiliVideo插件允许服务器为玩家在Bilibili平台上互动提供游戏内奖励。玩家在指定视频上点赞、投币、收藏（一键三连）后，可以在游戏内自助领取奖励，是一种很好的服务器推广工具。',
    links: [
      {
        type: 'github',
        url: 'https://github.com/BingZi-233/BilibiliVideo',
        label: 'GitHub'
      },
      {
        type: 'minebbs',
        url: 'https://www.minebbs.com/resources/.8475',
        label: 'MineBBS'
      },
      {
        type: 'docs',
        url: 'https://wiki.ooci.co/zh/BilibiliVideo/Index',
        label: '文档'
      }
    ]
  },
  {
    id: 'betterhudchemdah',
    name: 'BetterHudChemdah',
    description: '基于 BetterHud 和 Chemdah 的对话主题插件',
    category: 'ui',
    letter: 'B',
    detail: 'BetterHudChemdah是一个UI增强插件，专为Chemdah任务插件设计。它提供了美观的对话界面和任务显示，使玩家的任务体验更加沉浸和直观。支持自定义主题和样式，可以根据服务器风格进行调整。',
    links: [
      {
        type: 'docs',
        url: 'https://discord.com/channels/1166519479379963924/1341174068568784936/1341174068568784936',
        label: '文档'
      }
    ]
  },
  {
    id: 'chemdah',
    name: 'Chemdah',
    description: '任务插件',
    category: 'quest',
    letter: 'C',
    detail: 'Chemdah是一个功能全面的任务系统插件，支持复杂的任务链、条件触发、多重奖励等功能。它提供了丰富的API和事件系统，可以与其他插件无缝集成。任务编辑器使得创建和管理任务变得简单直观。',
    links: [
      {
        type: 'github',
        url: 'https://github.com/inrhor/Chemdah',
        label: 'GitHub'
      },
      {
        type: 'minebbs',
        url: 'https://www.minebbs.com/resources/.9650',
        label: 'MineBBS'
      },
      {
        type: 'docs',
        url: 'https://plugins.ptms.ink/plugin/chemdah',
        label: '文档'
      }
    ]
  },
  {
    id: 'chemdahexpansion',
    name: 'ChemdahExpansion',
    description: 'Chemdah 任务插件附属',
    category: 'expansion',
    letter: 'C',
    detail: 'ChemdahExpansion是Chemdah任务插件的扩展，添加了更多任务类型、条件和功能。通过这个扩展，可以创建更加丰富多样的任务体验，满足各种服务器的需求。',
    links: [
      {
        type: 'docs',
        url: 'https://wiki.xiao-jie.top/zh/ChemdahExpansion%E9%99%84%E5%B1%9E',
        label: '文档'
      }
    ]
  },
  {
    id: 'dungeonplus',
    name: 'DungeonPlus',
    description: '地牢插件',
    category: 'dungeon',
    letter: 'D',
    detail: 'DungeonPlus是一个功能强大的地牢系统插件，支持自定义地牢、多样化的怪物生成、丰富的奖励机制和地牢挑战机制。适合想要为服务器添加PVE内容的服主使用，可以创建引人入胜的地牢冒险体验。',
    links: [
      {
        type: 'mcbbs',
        url: 'https://www.mcbbs.co/thread-44-1-1.html',
        label: 'MCBBS'
      },
      {
        type: 'docs',
        url: 'https://ersha.gitbook.io/dungeonplus',
        label: '文档'
      }
    ]
  },
  {
    id: 'invero',
    name: 'Invero',
    description: '菜单插件',
    category: 'menu',
    letter: 'I',
    detail: 'Invero是一个现代化的菜单插件，提供高度可定制的GUI界面。支持动态菜单、交互功能、自定义图标和动画效果。通过简单的配置，可以创建各种复杂的菜单界面，改善服务器的用户体验。',
    links: [
      {
        type: 'minebbs',
        url: 'https://www.minebbs.com/resources/.10851',
        label: 'MineBBS'
      },
      {
        type: 'github',
        url: 'https://github.com/8aka-Team/Invero',
        label: 'GitHub'
      },
      {
        type: 'docs',
        url: 'https://invero.8aka.org',
        label: '文档'
      }
    ]
  },
  {
    id: 'kalpadungeon',
    name: 'KalpaDungeon',
    description: '让你的 DungeonPlus 拥有更多功能',
    category: 'expansion',
    letter: 'K',
    detail: 'KalpaDungeon是DungeonPlus插件的扩展，添加了更多地牢类型、怪物机制和奖励系统。通过这个扩展，可以创建更加丰富多样的地牢体验，增强服务器的PVE内容。',
    links: [
      {
        type: 'minebbs',
        url: 'https://www.minebbs.com/resources/dungeonplus.9541',
        label: 'MineBBS'
      },
      {
        type: 'docs',
        url: 'https://wiki.xiao-jie.top/zh/KalpaDungeon/main',
        label: '文档'
      }
    ]
  },
  {
    id: 'kalpahandpotioneffect',
    name: 'KalpaHandPotionEffect',
    description: '让身上的装备提供药水效果',
    category: 'effect',
    letter: 'K',
    detail: 'KalpaHandPotionEffect允许装备物品提供药水效果，为RPG服务器提供更多的装备选择。可以为任何物品添加药水效果属性，当玩家装备这些物品时自动获得相应的效果。支持多种条件和配置选项。',
    links: [
      {
        type: 'minebbs',
        url: 'https://www.minebbs.com/resources/kalpahandpotioneffect.10263',
        label: 'MineBBS'
      }
    ]
  },
  {
    id: 'kethermoduleslite',
    name: 'KetherModulesLite',
    description: '多功能插件',
    category: 'utility',
    letter: 'K',
    detail: 'KetherModulesLite是一个多功能实用插件，集成了多种常用功能，如传送、家园系统、经济功能、物品管理等。它设计轻量高效，适合各种类型的服务器使用，可以减少服务器需要安装的插件数量。',
    links: [
      {
        type: 'minebbs',
        url: 'https://www.minebbs.com/resources/.7415',
        label: 'MineBBS'
      },
      {
        type: 'docs',
        url: 'https://www.yuque.com/heiying-pyn5s/plugins/xlgl1fgkbwgciofq#',
        label: '文档'
      }
    ]
  },
  {
    id: 'trchat',
    name: 'TrChat',
    description: '聊天插件',
    category: 'chat',
    letter: 'T',
    detail: 'TrChat是一个功能丰富的聊天管理插件，支持聊天格式化、聊天频道、聊天过滤、表情符号、物品展示等功能。它提供了全面的聊天管理工具，使服务器的聊天系统更加生动和易于管理。',
    links: [
      {
        type: 'github',
        url: 'https://github.com/TrPlugins/TrChat',
        label: 'GitHub'
      },
      {
        type: 'minebbs',
        url: 'https://www.minebbs.com/resources/.7245',
        label: 'MineBBS'
      },
      {
        type: 'docs',
        url: 'https://trchat.trixey.cc',
        label: '文档'
      }
    ]
  },
  {
    id: 'trmenu',
    name: 'TrMenu',
    description: '菜单插件',
    category: 'menu',
    letter: 'T',
    detail: 'TrMenu是一个强大的GUI菜单插件，支持复杂的菜单设计、动态菜单内容、各种交互功能和动画效果。它提供了丰富的API和事件系统，可以与其他插件无缝集成，是创建各种服务器菜单的理想选择。提供v2和v3两个版本，目前推荐使用社区维护的v3版本。',
    links: [
      {
        type: 'spigotmc',
        url: 'https://www.spigotmc.org/resources/.83120/',
        label: 'SpigotMC (v2)'
      },
      {
        type: 'docs',
        url: 'https://temp-17.gitbook.io/trmenu/v/chinese',
        label: '文档 (v2)'
      },
      {
        type: 'minebbs',
        url: 'https://www.minebbs.com/resources/trmenu-bug.9080/',
        label: 'MineBBS'
      },
      {
        type: 'github',
        url: 'https://github.com/TrPlugins/TrMenu/tree/stable/v3',
        label: 'GitHub (已停止维护)'
      },
      {
        type: 'github',
        url: 'https://github.com/CoderKuo/TrMenu',
        label: 'GitHub (推荐，社区维护)'
      },
      {
        type: 'docs',
        url: 'https://trmenu.trixey.cc',
        label: '旧文档 (不推荐)'
      },
      {
        type: 'docs',
        url: 'https://hhhhhy.gitbook.io/trmenu-v3',
        label: '新文档 (需挂梯子)'
      },
      {
        type: 'docs',
        url: 'https://mirror.8aka.org/https://hhhhhy.gitbook.io/trmenu-v3',
        label: '新文档镜像'
      },
      {
        type: 'docs',
        url: 'https://bukkit.wiki/plugins/plugins/trmenu',
        label: '阔大帅文档'
      },
      {
        type: 'docs',
        url: 'https://wiki.ptms.ink/index.php?title=%E7%A4%BE%E5%8C%BA:TrMenu',
        label: '社区文档'
      },
      {
        type: 'docs',
        url: 'https://docs.qq.com/aio/DWWV6SFVuWmlES1po',
        label: '入门学习文档'
      }
    ]
  },
  {
    id: 'vulpecula',
    name: 'Vulpecula',
    description: '脚本插件',
    category: 'script',
    letter: 'V',
    detail: 'Vulpecula是一个灵活的脚本插件，提供了简单易用的脚本语言，允许服务器管理员创建自定义功能和内容。它支持多种脚本功能，如事件监听、命令创建、物品操作等，是服务器定制化的理想工具。',
    links: [
      {
        type: 'minebbs',
        url: 'https://www.minebbs.com/resources/.9584',
        label: 'MineBBS'
      },
      {
        type: 'github',
        url: 'https://github.com/Lanscarlos/Vulpecula',
        label: 'GitHub'
      },
      {
        type: 'docs',
        url: 'https://www.yuque.com/lanscarlos/vulpecula-doc',
        label: '文档'
      }
    ]
  },
  {
    id: 'vitasell',
    name: 'VitaSell',
    description: '物品出售插件',
    category: 'economy',
    letter: 'V',
    detail: 'VitaSell是一个物品出售插件，允许玩家方便地出售物品获取游戏币。支持自定义价格、批量出售和出售限制功能，为服务器提供了灵活的经济系统工具。',
    links: [
      {
        type: 'docs',
        url: 'https://cpjinan.github.io/Wiki/VitaSell/',
        label: '文档'
      }
    ]
  },
  {
    id: 'azureflow',
    name: 'AzureFlow',
    description: '物品库插件',
    category: 'item',
    letter: 'Z',
    detail: 'AzureFlow是一个强大的物品库系统，允许服务器创建和管理自定义物品。支持复杂的物品属性、材质和模型、自定义效果和动作等。它提供了全面的API，可以与其他插件无缝集成，是RPG服务器的理想选择。',
    links: [
      {
        type: 'minebbs',
        url: 'https://www.minebbs.com/resources/.9673',
        label: 'MineBBS'
      },
      {
        type: 'github',
        url: 'https://github.com/rokukoo/AzureFlow-issues',
        label: 'GitHub'
      },
      {
        type: 'docs',
        url: 'https://cloudstack.gitbook.io/azureflow',
        label: '文档(官方)'
      }
    ]
  },
  {
    id: 'zaphkiel',
    name: 'Zaphkiel',
    description: '物品库插件',
    category: 'item',
    letter: 'Z',
    detail: 'Zaphkiel是一个物品库插件，用于创建和管理自定义物品。它提供了简单的API和配置系统，使服务器可以轻松添加独特的物品到游戏中，适合各种类型的服务器使用。',
    links: [
      {
        type: 'github',
        url: 'https://github.com/TabooLib/zaphkiel',
        label: 'GitHub'
      }
    ]
  }
];

export function getAllPlugins(): Plugin[] {
  return plugins;
}

export function getCategories(): string[] {
  const categories = new Set<string>();
  plugins.forEach(plugin => categories.add(plugin.category));
  return Array.from(categories).sort();
}

export function getLetters(): string[] {
  const letters = new Set<string>();
  plugins.forEach(plugin => letters.add(plugin.letter));
  return Array.from(letters).sort();
}

export function getPluginById(id: string): Plugin | undefined {
  return plugins.find(plugin => plugin.id === id);
} 