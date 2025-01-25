//priority:1001


/**@type {defattack} */
const TetraStream$Attack = (player, heldItem, target, damageCount, DamageType) => {
    mana_addition(player, heldItem, target, damageCount, DamageType)
    energy_addition(player, heldItem, target, damageCount, DamageType)
    mana_drain(player, heldItem, target, damageCount, DamageType)
    energy_drain(player, heldItem, target, damageCount, DamageType)
}
/**@type {defattack} */
const TetraStream$Addition = (player, heldItem, target, damageCount, DamageType) => {
    energy_drain(player, heldItem, target, damageCount, DamageType)
}

/**@type {defattack} */
let mana_addition = (player, heldItem, target, damageCount, DamageType) => {
    let level = simpleGetTetraEffectLevel(heldItem, 'yi:mana_addition')
    if (level > 0 && simple_AM_Cap$CM(player) > 20) {
        if (checkEffectWithTick(player, 'mana_addition'))simple_AM_Cap(player, mana => mana.removeMana(20))
        simpleAttackEntity(player, target, 'magic', level)
    }
}
/**@type {defattack} */
let energy_addition = (player, heldItem, target, damageCount, DamageType) => {
    let level = simpleGetTetraEffectLevel(heldItem, 'yi:energy_addition')
    if (level > 0 && simple_FE_Cap$ES(heldItem) / simple_FE_Cap$MES(heldItem) > 0.7) {
        if (checkEffectWithTick(player, 'energy_addition'))simple_FE_Cap(heldItem, energy => energy.receiveEnergy(-500, false))
        simpleAttackEntity(player, target, 'lightning_bolt', damageCount * level / 20)
    }
}
/**@type {defattack} */
let mana_drain = (player, heldItem, target, damageCount, DamageType) => {
    let level = simpleGetTetraEffectLevel(heldItem, 'yi:mana_drain')
    if (level > 0)
        simple_AM_Cap(player, mana => mana.addMana(damageCount * level / 100))
}
/**@type {defattack} */
let energy_drain = (player, heldItem, target, damageCount, DamageType) => {
    let level = simpleGetTetraEffectLevel(heldItem, 'yi:energy_drain')
    if (level > 0 && DamageType=='lightningBolt')
        simple_FE_Cap(heldItem, energy => energy.receiveEnergy(damageCount * level, false))
}
