



//结构对附魔经验的影响
let structureEffect = { 'minecraft:desert_pyramid': 1.5, 'cataclysm:burning_arena': 2.5}

//玩家阶段对附魔经验的影响
let stageEffect = { Tier1: 1.1 }

//额外附魔的列表，name必填，其余为可选
/**@type {{name:Special.Enchantment, requiredlevel?:number, Maxlevel?:number, chance?:number, structure?:Special.WorldgenStructure, weight?:number}[]} */
let specialEnchantment = [
    { name: 'yi:evil_life_drain', requiredlevel: 80, Maxlevel: 1, chance: 0.05, structure: 'cataclysm:burning_arena' },
    { name: 'minecraft:sweeping', requiredlevel: 30, Maxlevel: 8, chance: 0.36, structure: 'cataclysm:burning_arena' },
    { name: 'minecraft:looting', requiredlevel: 45, Maxlevel: 6, chance: 0.75 },
    { name: 'minecraft:infinity', chance: 0.8, Maxlevel: 20, structure: 'cataclysm:burning_arena' }
]
