//===========================================
//对附魔台进行修改
//增加附魔点数的设定以获取额外附魔
//===========================================


//结构对附魔经验的影响，乘算
let structureEffect = { 'minecraft:desert_pyramid': 1.5, 'cataclysm:burning_arena': 2.5 }
//额外附魔的列表，name必填，其余为可选
let specialEnchantment = [
    { structure: 'cataclysm:burning_arena', requiredlevel: 50, name: 'yi:evil_life_drain', Maxlevel: 10, chance: 0.05 }
]

/**
 * 当玩家在附魔台界面更换物品时被调用，用于修改附魔选项
 */
MoreJSEvents.enchantmentTableChanged((event) => {
    let { level, position, item } = event
    let slotList = [event.get(0), event.get(1), event.get(2)]
    slotList.forEach(slot => {//遍历三个槽位，对三个附魔选项进行修改
        requiredLevelFix(slot, level, position)
        //使用附魔点数计算额外附魔数量与等级
        let enchantmentPoints = 100 + slot.requiredLevel * 1 - slot.enchantmentCount * 10
        addEnchantment(item, slot, level, position, enchantmentPoints)
        slot.updateClue()
    })
})

let requiredLevelFix = (slot, level, position) => {
    for (let key in structureEffect)//计算结构对需求经验的影响
        if (simpleCheckPosInStructure(level, position, key))
            slot.requiredLevel *= structureEffect[key];
}
let addEnchantment = (item, slot, level, position, enchantmentPoints) => {
    //初始化允许附魔的列表
    let allowEnchantmentList = []
    specialEnchantment.forEach(value => {
        //判断物品是否能附魔
        if (checkItemCanEnchant(item, value.name))
            //对等级需求进行判断，如不需要则跳过
            if (value.requiredlevel == undefined || slot.requiredLevel >= value.requiredlevel)
                //对结构需求进行判断，如不需要则跳过
                if (value.structure == undefined || simpleCheckPosInStructure(level, position, value.structure))
                    //通过判断加入允许附魔的列表
                    allowEnchantmentList.push(value)
    })
    if (allowEnchantmentList.length !== 0)//若允许附魔列表不为空则不进行额外附魔
        //每次消耗20附魔点数试图附魔
        for (; enchantmentPoints > 0; enchantmentPoints -= 20) {
            //获取本次试图的附魔
            let thisEnchantment = allowEnchantmentList[getRandomInt(0, allowEnchantmentList.length - 1)]
            if (thisEnchantment.chance == undefined || Math.random() < thisEnchantment.chance)//获取每次的附魔成功概率并判断
                if (!slot.hasEnchantment(thisEnchantment.name, thisEnchantment.Maxlevel)) {//检测是否有最大等级的该附魔
                    let thislevel = 0
                    slot.removeEnchantments((Enchant, Enchantlevel) => {
                        if (Enchant.id == thisEnchantment.name) {
                            thislevel = Enchantlevel//获取当前附魔等级
                            return true
                        } else return false
                    })
                    slot.addEnchantment(thisEnchantment.name, thislevel + 1)//添加附魔
                }
        }
}