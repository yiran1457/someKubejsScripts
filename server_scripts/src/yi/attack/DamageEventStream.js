//priority:1000



/**@typedef {(player:$Player_, heldItem:$ItemStack_, target:$LivingEntity_, damageCount:number, DamageType:string)} defattack */
//========================================
// 伤害相关
//========================================

//攻击事件，与受伤前执行
NativeEvents.onEvent($LivingAttackEvent,/**@param {$LivingAttackEvent_} e */e => {
    /**@type {$LivingEntity_} */
    let attacker = e.source.actual
    /**@type {$LivingEntity_} */
    let target = e.entity
    if (attacker && target) {
        let evil_damage = 0,holy_damage = 0
        if (attacker.attributes.hasAttribute('yi:evil_damage'))
            evil_damage = attacker.getAttributeValue('yi:evil_damage')
        if (attacker.attributes.hasAttribute('yi:holy_damage'))
            holy_damage = attacker.getAttributeValue('yi:holy_damage')
        if (target.attributes.hasAttribute('yi:evil_protection'))
            evil_damage *= (1 - target.getAttributeValue('yi:evil_protection'))
        if (target.attributes.hasAttribute('yi:holy_protection'))
            holy_damage *= (1 - target.getAttributeValue('yi:holy_protection'))
        if (attacker.isPlayer()) {
            evil_damage *= simpleGetEvilEffect(attacker)
            holy_damage *= simpleGetHolyEffect(attacker)
        }
        target.getArmorSlots().forEach(armor => {
            
        })
        if (evil_damage > 0)
            simpleAttackEntity(attacker, target, 'yi:evil', evil_damage)
        if (holy_damage > 0)
            simpleAttackEntity(attacker, target, 'yi:holy', holy_damage)
    }
})

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
    let { source, entity: target, amount: damageCount } = e
    let { player, immediate } = source
    let DamageType = e.source.getType()
    if (player) {//附加伤害均为无实际来源，直接来源为玩家
        let heldItem = player.mainHandItem
        EnchantmentStream$Attack(player, heldItem, target, damageCount, DamageType)
        if (heldItem.item instanceof $ModularItem) {
            TetraStream$Attack(player, heldItem, target, damageCount, DamageType)
        }
    } else if (immediate instanceof $Player) {//一般用于附加伤害的类型判断
        let heldItem = immediate.mainHandItem
        let DamageType = source.getType()
        if (heldItem.item instanceof $ModularItem) {
            TetraStream$Addition(immediate, heldItem, target, damageCount, DamageType)
        }
    }
})



//=============================
// 伤害修正计算
//=============================
/**@typedef {(player:$Player_,heldItem:$ItemStack_,DamageType:string)=>number} basicDamageFix */
/**@type {basicDamageFix} */
let basicDamageFix$addition = (player, heldItem, DamageType) => {
    let Fix = { Amount: 0 }
    return Fix.Amount
}
/**@type {basicDamageFix} */
let basicDamageFix$multiply_base = (player, heldItem, DamageType) => {
    let Fix = { Amount: 1 }
    EnchantmentFix$multiply_base(player, heldItem, DamageType, Fix)
    return Fix.Amount
}
/**@type {basicDamageFix} */
let basicDamageFix$multiply_total = (player, heldItem, DamageType) => {
    let Fix = { Amount: 1 }
    return Fix.Amount
}
