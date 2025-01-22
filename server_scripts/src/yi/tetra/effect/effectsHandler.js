//priority:1002
// ignored : true
/**
 * @typedef {(player:$Player_, heldItem:$ItemStack_, Item:$ModularItem_, target:$LivingEntity_, damageCount:number ,energy:$IEnergyStorage_)=>void} ForgeEnergyHandler
 * @typedef {(player:$Player_, heldItem:$ItemStack_, Item:$ModularItem_, target:$LivingEntity_, damageCount:number, mana:$IManaCap_, ManaChange:{mana:{count:0}})=>void} ArsManaHandler
 */






//==========================================
//  ManaChange$pre
//==========================================
/**@type {ArsManaHandler} */
const mana_addition = (player, heldItem, Item, target, damageCount, mana, ManaChange) => {
    //获取手持物品魔力附加等级
    let level = Item.getEffectLevel(heldItem, $ItemEffect.get('yi:mana_addition'))
    if (level > 0) {
        //判断魔力值是否大于20
        if (mana.getCurrentMana() > 20) {
            //扣除20点魔力
            if (checkEffectWithTick(player, 'yi:mana_addition')) mana.addMana(-20)
            simpleAttackEntity(player, target, 'magic', level)
            ManaChange.mana.count += 20
            player.getCapability()
        }
    }
}
/**@type {ArsManaHandler} */
const mana_drain = (player, heldItem, Item, target, damageCount, mana, ManaChange) => {
    //获取手持物品魔力汲取等级
    let level = Item.getEffectLevel(heldStack, $ItemEffect.get('yi:mana_drain'))
    if (level > 0) {
        mana.addMana(damageCount * level / 100)
    }

}
//==========================================
//  ManaChange$post
//==========================================



//==========================================
//  ForgeEnergy
//==========================================

/**@type {ForgeEnergyHandler} */
const energy_addition = (player, heldItem, Item, target, damageCount, energy) => {
    let level = Item.getEffectLevel(heldItem, $ItemEffect.get('yi:energy_addition'))
    if (level > 0) {
        if (energy.getEnergyStored() / energy.getMaxEnergyStored() > 0.7) {
            if (checkEffectWithTick(player, 'yi:energy_addition')) energy.receiveEnergy(-500, false)
            simpleAttackEntity(player, target, 'lightning_bolt', damageCount * level / 20)
        }
    }
}
/**@type {ForgeEnergyHandler} */
const energy_drain = (player, heldItem, Item, target, damageCount, energy) => {
    let level = Item.getEffectLevel(heldItem, $ItemEffect.get('yi:energy_drain'))
    if (level > 0) {
        player.tell(`FE回复:§e${(damageCount * level).toFixed(2)}`)
        energy.receiveEnergy(damageCount * level, false)
    }
}