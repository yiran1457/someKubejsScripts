//===========================================
//对附魔台进行修改
//增加附魔点数的设定以获取额外附魔
//暂时无法限制附魔台获取的最高等级低于附魔台原能获取的最高等级(如果彻底代理了附魔台应该就可以)
//===========================================

/**
 * 当玩家在附魔台界面更换物品时被调用，用于修改附魔选项
 */
MoreJSEvents.enchantmentTableChanged((event) => {
    let { level, position, item, player } = event
    let slotList = [event.get(0), event.get(1), event.get(2)]
    slotList.forEach(slot => {//遍历三个槽位，对三个附魔选项进行修改
        requiredLevelFix(slot, level, position, player)
        //使用附魔点数计算额外附魔数量与等级
        let enchantmentPoints = 100 + slot.requiredLevel * 1 - slot.enchantmentCount * 30
        addEnchantment(item, slot, level, position, enchantmentPoints)
        //slot.updateClue()
    })
})

/**@type {(slot:any,level:$ServerLevel_,position:$BlockPos_,player:$Player_)} */
let requiredLevelFix = (slot, level, position, player) => {
    for (let key in stageEffect)
        if (player.stages.has(key))
            slot.requiredLevel *= stageEffect[key]
    for (let key in structureEffect)//计算结构对需求经验的影响
        if (simpleCheckPosInStructure(level, position, key))
            slot.requiredLevel *= structureEffect[key];
}
let addEnchantment = (item, slot, level, position, enchantmentPoints) => {
    //初始化允许附魔的列表
    let allowEnchantmentList = []
    let allowEnchantmentCount = 0
    specialEnchantment.forEach(value => {
        switch (false) {
            //判断物品是否能附魔
            case checkItemCanEnchant(item, value.name):break
            //对等级需求进行判断，如不需要则跳过
            case value.requiredlevel == undefined || slot.requiredLevel >= value.requiredlevel:break
            //对结构需求进行判断，如不需要则跳过
            case value.structure == undefined || simpleCheckPosInStructure(level, position, value.structure):break
            default:
                allowEnchantmentCount++
                for (let i = 0; i < (value.weight || 1); i++)//简单完成权重计算
                    allowEnchantmentList.push(value)
        }/*
        //判断物品是否能附魔
        if (checkItemCanEnchant(item, value.name))
            //对等级需求进行判断，如不需要则跳过
            if (value.requiredlevel == undefined || slot.requiredLevel >= value.requiredlevel)
                //对结构需求进行判断，如不需要则跳过
                if (value.structure == undefined || simpleCheckPosInStructure(level, position, value.structure)) {
                    allowEnchantmentCount++
                    for (let i = 0; i < (value.weight || 1); i++)//简单完成权重计算
                        allowEnchantmentList.push(value)
                }*/
    })
    //附魔列表对附魔点数修正
    enchantmentPoints *= (1 + allowEnchantmentCount * 0.5)
    if (allowEnchantmentCount != 0)//若允许附魔列表不为空则不进行额外附魔
        //每次消耗20附魔点数试图附魔
        for (; enchantmentPoints > 0; enchantmentPoints -= 20) {
            //获取本次试图的附魔
            let thisEnchantment = allowEnchantmentList[getRandomInt(0, allowEnchantmentList.length - 1)]
            //获取附魔成功概率并判断，如不需要则跳过
            if (thisEnchantment.chance == undefined || Math.random() < thisEnchantment.chance)
                //检测是否有最大等级的该附魔,如果达到最大等级则跳过添加附魔
                if (!slot.hasEnchantment(thisEnchantment.name, thisEnchantment.Maxlevel)) {
                    let thislevel = 1
                    slot.removeEnchantments((Enchant, Enchantlevel) => {
                        if (Enchant.id == thisEnchantment.name) {
                            thislevel += Enchantlevel//获取当前附魔等级并+1
                            return true
                        } else return false
                    })
                    slot.addEnchantment(thisEnchantment.name, thislevel)//添加附魔
                }
        }
}
