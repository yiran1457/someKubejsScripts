//priority:1001

/**@type {defattack} */
let EnchantmentStream$Attack = (player, heldItem, target, damageCount, DamageType) => {
    
}


ItemEvents.firstLeftClicked(e=>{
    let test = 0
    for (let i = 0; i < 10000; i++) {
        if(Utils.getRandom().nextGaussian(0,4)>10)
            test++
    }
    test/=10000
    e.player.tell(test)
})