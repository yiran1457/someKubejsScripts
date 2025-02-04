//priority:1001
//将饰品栏背饰第一个物品当作电池(给背包物品供电)


//设置最大能量交换速率
let Max_change_energy = 1000
/**@type {(e:$TickEvent$PlayerTickEvent_)} */
const CuriosToInventoryEnergy = (e)=> {
    //调用CuriosApi获取饰品
    $CuriosApi.getCuriosInventory(e.player).ifPresent(/**@param {$ICuriosItemHandler_} curios */curios => {
        //获取背饰第一个物品
        curios.findCurio('back', 0).ifPresent(/**@param {$SlotResult_} stack */stack => {
            //测试物品名称
            if (/sophisticatedbackpacks:/.test(stack.stack().id)) {
                //获取背饰物品energyCap
                stack.stack().getCapability(ForgeCapabilities.ENERGY).ifPresent(/**@param {$IEnergyStorage_} Back_energy */Back_energy => {
                    //检测背饰是否能放电
                    if (Back_energy.canExtract()) {
                        //遍历背包物品
                        e.player.inventory.allItems.forEach(/**@param {$ItemStack} inv_item */inv_item => {
                            //获取物品energyCap
                            inv_item.getCapability(ForgeCapabilities.ENERGY).ifPresent(/**@param {$IEnergyStorage_} inv_energy */inv_energy => {
                                if (inv_energy.canReceive()) {
                                    //获取交换能量值
                                    let change_energy = Math.min(inv_energy.receiveEnergy(Max_change_energy, true), 
                                    Back_energy.extractEnergy(Max_change_energy, true))
                                    inv_energy.receiveEnergy(change_energy, false)
                                    Back_energy.extractEnergy(change_energy, false)
                                }
                            })
                        })
                    }
                })
            }
        })
        curios.findCurio('mirror',0).ifPresent(/**@param {$SlotResult_} stack */stack => {
            let mirror = stack.stack()
            mirror.getOrCreateTag().Angel = e.player.persistentData.getDouble('Angel')
            mirror.nbt.Devil = e.player.persistentData.getDouble('Devil')
        })
    })
}

const TetraEnergyCap = (e) => {
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
                                energy.receiveEnergy(item.item.getEffectLevel(item, $ItemEffect.get('yi:vibration')), false)
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
}


if(false)
PlayerEvents.tick(e => {
    //调用CuriosApi获取饰品
    $CuriosApi.getCuriosInventory(e.player).ifPresent(/**@param {$ICuriosItemHandler_} curios */curios => {
        //获取背饰第一个物品
        curios.findCurio('back', 0).ifPresent(/**@param {$SlotResult_} stack */stack => {
            //测试物品名称
            if (/sophisticatedbackpacks:/.test(stack.stack().id)) {
                //获取背饰物品energyCap
                stack.stack().getCapability($ForgeCapabilities.ENERGY).ifPresent(/**@param {$IEnergyStorage_} Back_energy */Back_energy => {
                    //检测背饰是否能放电
                    if (Back_energy.canExtract()) {
                        //遍历背包物品
                        e.player.inventory.allItems.forEach(/**@param {$ItemStack} inv_item */inv_item => {
                            //获取物品energyCap
                            inv_item.getCapability($ForgeCapabilities.ENERGY).ifPresent(/**@param {$IEnergyStorage_} inv_energy */inv_energy => {
                                if (inv_energy.canReceive()) {
                                    //获取交换能量值
                                    let change_energy = Math.min(inv_energy.receiveEnergy(Max_change_energy, true), 
                                    Back_energy.extractEnergy(Max_change_energy, true))
                                    inv_energy.receiveEnergy(change_energy, false)
                                    Back_energy.extractEnergy(change_energy, false)
                                }
                            })
                        })
                    }
                })
            }
        })
    })
})