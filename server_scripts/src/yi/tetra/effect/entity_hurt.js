const { $LivingHurtEvent } = require("packages/net/minecraftforge/event/entity/living/$LivingHurtEvent")
const { $ModularItem } = require("packages/se/mickelus/tetra/items/modular/$ModularItem")

NativeEvents.onEvent($LivingHurtEvent,/**@param {$LivingHurtEvent} e */e => {
    let player = e.source.player
    if (player) {
        let heldItem = player.mainHandItem
        let Item = heldItem.item
        let DamageType = e.source.getType()
        if (Item instanceof $ModularItem) {
            let target = e.entity
            let damageCount = e.amount
            player.tell(e.source.getType())
            ArsManaStream(player, heldItem, Item, target, damageCount, DamageType)
            ForgeEnergyStream(player, heldItem, Item, target, damageCount, DamageType)
        }
    }
})