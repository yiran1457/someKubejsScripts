


/**@type {(player:$Player_, heldItem:$ItemStack_, Item:$ModularItem_, target:$LivingEntity_, damageCount:number, DamageType:string)=>void} */
const ForgeEnergyStream = (player, heldItem, Item, target, damageCount, DamageType) => {
    heldItem.getCapability($ForgeCapabilities.ENERGY).ifPresent(/**@param {$IEnergyStorage_} energy */energy => {
        if (DamageType == 'player') {
            energy_addition(player, heldItem, Item, target, damageCount, energy)
        } else if (DamageType == 'lightningBolt') {
            energy_drain(player, heldItem, Item, target, damageCount, energy)
        }
    })
}