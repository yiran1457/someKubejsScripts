//priority:1000



NativeEvents.onEvent($TickEvent$PlayerTickEvent,/**@param {$TickEvent$PlayerTickEvent_} e */e => {
    switch (e.phase) {
        case 'START':
            CuriosToInventoryEnergy(e)
            TetraEnergyCap(e)
            break;
        case 'END':
            break;
    }
})

//========================================
// 伤害相关
//========================================



//于护甲等减伤前执行
NativeEvents.onEvent($LivingHurtEvent,/**@param {$LivingHurtEvent_} e */e => {
    let player = e.source.player
    if (player) {
        let heldItem = player.mainHandItem
        let DamageType = e.source.getType()
        //加法乘区
        let addition = basicDamageFix$addition(player, heldItem, DamageType)
        //乘法乘区
        let multiply_base = basicDamageFix$multiply_base(player, heldItem, DamageType)
        //独立乘法乘区
        let multiply_total = basicDamageFix$multiply_total(player, heldItem, DamageType)
        e.amount = (e.amount + addition) * multiply_base * multiply_total
    }
})


//于护甲减伤后执行
NativeEvents.onEvent($LivingDamageEvent,/**@param {$LivingHurtEvent_} e */e => {
    let player = e.source.player
    if (player) {
        let heldItem = player.mainHandItem
        let Item = heldItem.item
        let DamageType = e.source.getType()
        if (Item instanceof $ModularItem) {
            let target = e.entity
            let damageCount = e.amount
            e.amount*=10086
            ArsManaStream(player, heldItem, Item, target, damageCount, DamageType)
            ForgeEnergyStream(player, heldItem, Item, target, damageCount, DamageType)
        }
    }
})




/**@typedef {(player:$Player_,heldItem:$ItemStack_,DamageType:string)=>number} basicDamageFix */
/**@type {basicDamageFix} */
let basicDamageFix$addition = (player, heldItem, DamageType) => {
    let Fix = {Amount:0}
    return Fix.Amount
}
/**@type {basicDamageFix} */
let basicDamageFix$multiply_base = (player, heldItem, DamageType) => {
    let Fix = {Amount:1}
    EnchantmentFix$multiply_base(heldItem, DamageType, Fix)
    return Fix.Amount
}
/**@type {basicDamageFix} */
let basicDamageFix$multiply_total = (player, heldItem, DamageType) => {
    let Fix = {Amount:1}
    return Fix.Amount
}