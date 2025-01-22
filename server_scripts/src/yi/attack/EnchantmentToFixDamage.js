//priority:1001

/**@typedef {(player:$ServerPlayer_,heldItem:$ItemStack_,DamageType:string,Fix:{Amount:number})=>number} EnchantmentFix */


/**@type {EnchantmentFix} */
let EnchantmentFix$multiply_base = (player,heldItem,DamageType, Fix) =>{
    heldItem.getEnchantments().forEach((name,level)=>{
        switch(name){
            case 'yi:evil_life_drain':
                Fix.Amount += level * 0.1
                if(checkEffectWithTick(player,'yi:evil_life_drain'))
                    player.attack(player.damageSources().source(damageTypeKey('yi:evil')),1)
        }
    })
}
