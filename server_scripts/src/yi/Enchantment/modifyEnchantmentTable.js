
//结构对附魔经验的影响，乘算
let structureEffect = { 'minecraft:desert_pyramid': 1.5 }

/**
 * 当玩家在附魔台界面更换物品时被调用。
 */
MoreJSEvents.enchantmentTableChanged((event) => {
    let { level, position } = event
    let slotList = [event.get(0), event.get(1), event.get(2)]
    slotList.forEach(slot => {//遍历三个槽位，对三个附魔选项进行修改
        requiredLevelFix(slot, level, position)

        //简单的检测结构与需求等级
        if (simpleCheckPosInStructure(level, position, 'minecraft:desert_pyramid') && slot.requiredLevel >= 30) {
            let arg0 = 0.2 //设定基本概率为0.2
            let arg1 = (slot.requiredLevel - 30) * 0.025 //额外等级概率增幅
            let arg2 = slot.enchantmentCount * 0.08 //附魔数量概率减益
            if (Math.random() < arg0 + arg1 - arg2)
                slot.addEnchantment('yi:evil_life_drain', 1); // 向此槽位添加附魔
        }

        slot.updateClue()
    })
});


let requiredLevelFix = (slot, level, position) => {
    for (let key in structureEffect)//计算结构对需求经验的影响
        if (simpleCheckPosInStructure(level, position, key))
            slot.requiredLevel *= structureEffect[key];
}