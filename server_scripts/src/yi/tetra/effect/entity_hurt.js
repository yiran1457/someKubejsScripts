

NativeEvents.onEvent($LivingDamageEvent,/**@param {$LivingHurtEvent_} e */e => {
    let player = e.source.player
    if (player) {
        let heldItem = player.mainHandItem
        let Item = heldItem.item
        let DamageType = e.source.getType()
        if (Item instanceof $ModularItem) {
            let target = e.entity
            let damageCount = e.amount
            player.tell(`伤害：§e${e.getAmount()}`)
            //ArsManaStream(player, heldItem, Item, target, damageCount, DamageType)
            //ForgeEnergyStream(player, heldItem, Item, target, damageCount, DamageType)
        }
    }
})