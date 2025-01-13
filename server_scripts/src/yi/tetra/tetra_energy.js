

let vibration_count = [0,0]
if(false)
PlayerEvents.tick(e => {
    let ItemInHand = [e.player.getItemInHand("main_hand"), e.player.getItemInHand("off_hand")]
    ItemInHand.forEach((item,index) => {
        if (/tetra:modular_/.test(item.id)) {
            let Damage = item.nbt.Damage
            let MaxDamage = item.maxDamage - 1
            item.getCapability($ForgeCapabilities.ENERGY).ifPresent(/**@param {$IEnergyStorage_} energy */energy => {
                let Energy = energy.getEnergyStored()
                let MaxEnergy = energy.getMaxEnergyStored()
                if (Damage != MaxDamage) { item.nbt.putInt('MaxEnergy', item.item.getEffectLevel(item, $ItemEffect.get('yi:power'))) }
                if (MaxEnergy > 0) {
                    if (Energy > 0) {
                        if (Energy < MaxEnergy) {
                            if (vibration_count[index] == 20) {
                                energy.receiveEnergy(item.item.getEffectLevel(item, $ItemEffect.get('yi:vibration')), false)
                                vibration_count[index] = 0
                            } else { vibration_count[index]++ }
                        }
                        if (Damage != MaxDamage) {
                            energy.receiveEnergy(- 20 * Damage, false)
                        }
                        item.nbt.Damage = 0
                    }
                    else {
                        item.nbt.Energy = 0
                        item.nbt.Damage = MaxDamage
                    }
                }
            })
        }
    })
})
