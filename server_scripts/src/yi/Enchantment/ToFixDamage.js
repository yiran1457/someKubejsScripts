//priority:1001

/**@typedef {(heldItem:$ItemStack__,DamageType:string,Fix:{Amount:number})=>number} EnchantmentFix */


/**@type {EnchantmentFix} */
let EnchantmentFix$multiply_base = (heldItem,DamageType, Fix) =>{
    heldItem.getEnchantments().forEach((name,level)=>{
        switch(name){
            case 'yi:evil_life_drain':
                Fix.Amount += level * 0.1
        }
    })
}
