//priority:1001
//ignored : true


/**@type {(player:$Player_, heldItem:$ItemStack_, Item:$ModularItem_, target:$LivingEntity_, damageCount:number, DamageType:string)=>void} */
const ArsManaStream = (player, heldItem, Item, target, damageCount, DamageType) => {
    $CapabilityRegistry.getMana(player).ifPresent(/**@param {$IManaCap_}  mana*/mana => {
        let ManaChange = { mana: { count: 0 } }
        if (DamageType == 'player') {
            ManaChange$pre(player, heldItem, Item, target, damageCount, mana, ManaChange)
            ManaChange$post(player, heldItem, Item, target, damageCount, mana, ManaChange)
        }
    })
}

/**@typedef {(player:$Player_, heldItem:$ItemStack_, Item:$ModularItem_, target:$LivingEntity_, damageCount:number, mana:$IManaCap_, ManaChange:{mana:{count:0}})=>void} ManaChange */

/**@type {ManaChange} */
const ManaChange$pre = (player, heldItem, Item, target, damageCount, mana, ManaChange) =>{
    mana_addition(player, heldItem, Item, target, damageCount, mana, ManaChange)
}


/**@type {ManaChange} */
const ManaChange$post = (player, heldItem, Item, target, damageCount, mana, ManaChange) =>{
    
}