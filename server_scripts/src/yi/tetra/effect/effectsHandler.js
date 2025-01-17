//priority:1002
/**
 * @typedef {(player:$Player_, heldItem:$ItemStack_, Item:$ModularItem_, target:$LivingEntity_, damageCount:number ,energy:$IEnergyStorage_)=>void} ForgeEnergyHandler
 * @typedef {(player:$Player_, heldItem:$ItemStack_, Item:$ModularItem_, target:$LivingEntity_, damageCount:number, mana:$IManaCap_, ManaChange:{mana:{count:0}})=>void} ArsManaHandler
 */






//==========================================
//  ManaChange$pre
//==========================================
/**@type {ArsManaHandler} */
const mana_addition = (player, heldItem, Item, target, damageCount, mana, ManaChange) =>{
    //获取手持物品魔力附加等级
    let level = Item.getEffectLevel(heldItem, $ItemEffect.get('yi:mana_addition'))
    if (level > 0) {
        //判断魔力值是否大于20
        if (mana.getCurrentMana() > 20) {
            //扣除20点魔力
            mana.addMana(-20)
            //获取被攻击实体的默认无敌帧
            let definvulnerableTime = target.invulnerableTime
            //将无敌帧设置为0
            target.invulnerableTime = 0
            //试图添加来着玩家的法伤
            target.attack(target.damageSources().source($DamageTypes.MAGIC,target, player), level)
            //还原无敌帧
            target.invulnerableTime = definvulnerableTime
            ManaChange.mana.count += 20
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
const energy_addition = (player, heldItem, Item, target, damageCount, energy) =>{
    let level = Item.getEffectLevel(heldItem, $ItemEffect.get('yi:energy_addition'))
    if ( level > 0 ){
        if (energy.getEnergyStored() / energy.getMaxEnergyStored() > 0.7){
            energy.receiveEnergy(-500,false)
            let definvulnerableTime = target.invulnerableTime
            target.invulnerableTime = 0
            target.attack(target.damageSources().source($DamageTypes.LIGHTNING_BOLT, player,target), damageCount * level / 20)
            target.invulnerableTime = definvulnerableTime
        }
    }
}
/**@type {ForgeEnergyHandler} */
const energy_drain = (player, heldItem, Item, target, damageCount, energy) =>{
    let level = Item.getEffectLevel(heldItem, $ItemEffect.get('yi:energy_drain'))
    if (level > 0) {
        player.tell(`FE回复:§e${(damageCount * level).toFixed(2)}`)
        energy.receiveEnergy(damageCount * level , false)
    }
}