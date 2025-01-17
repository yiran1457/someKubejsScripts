
//方块
StartupEvents.registry("block", event => {
    event.create("sussy_dynamo")
        .blockEntity(info => {
            info.inventory(9, 1)
            info.rightClickOpensInventory()
            info.attachCapability(CapabilityBuilder.ENERGY.customBlockEntity()
                .canExtract(() => true)
                .canReceive(() => true)
                .extractEnergy((be, amount, simulate) => {
                    let energy = be.persistentData.getInt("energy")
                    let extracted = Math.min(energy, amount)
                    if (!simulate) {
                        be.persistentData.putInt("energy", energy - extracted)
                    }
                    return extracted
                })
                .receiveEnergy((be, amount, simulate) => {
                    let energy = be.persistentData.getInt("energy")
                    let received = Math.min(1919810 - energy, amount)
                    if (!simulate) {
                        be.persistentData.putInt("energy", energy + received)
                    }
                    return received

                })
                .getEnergyStored(be => {
                    return be.persistentData.getInt("energy")
                })
                .getMaxEnergyStored(() => 1919810)
            )
        })

    //一些来自恐怖生物的装饰方块
    event.create("lycanitesmobs:demonstonepillar", "basic")
        .property(BlockProperties.AXIS)
        .placementState(callblock => callblock.set(
            BlockProperties.AXIS, callblock.nearestLookingVerticalDirection.axis
        ))
    event.create("lycanitesmobs:demonstonechiseled", "basic")
    event.create("lycanitesmobs:demoncrystal", "basic")
    event.create("lycanitesmobs:demonstone", "basic")
    event.create("lycanitesmobs:demonstonebrick", "basic")
    event.create("lycanitesmobs:demonstonetile", "basic")
    
})

StartupEvents.registry("block", (event) => {
    event.create("kubejs:barrel").blockEntity((info) => {
        info.inventory(9, 3);
        info.rightClickOpensInventory();
        info.attachCapability(
            CapabilityBuilder.ITEM.blockEntity()
            /**@param {$JukeboxBlockEntity} blockEntity */
                .extractItem((blockEntity, slot, amount, simulate) => {
                    /**@type {$JukeboxBlockEntity_} */
                    let inv = blockEntity.inventory
                    return inv.extractItem(slot, amount, simulate)}
                )
                .insertItem((blockEntity, slot, stack, simulate) => {
                    /**@type {$JukeboxBlockEntity_} */
                    let inv = blockEntity.inventory
                    return inv.insertItem(slot, stack, simulate)
                })
                .getSlotLimit((blockEntity, slot) => {
                    /**@type {$JukeboxBlockEntity_} */
                    let inv = blockEntity.inventory
                    return inv.getSlotLimit(slot)
                })
                .getSlots((blockEntity) => {
                    /**@type {$JukeboxBlockEntity_} */
                    let inv = blockEntity.inventory
                    return inv.slots
                })
                .getStackInSlot((blockEntity, slot) => {
                    /**@type {$JukeboxBlockEntity_} */
                    let inv = blockEntity.inventory
                    return inv.getStackInSlot(slot)
                })
                .isItemValid((blockEntity, slot, stack) => {
                    /**@type {$JukeboxBlockEntity_} */
                    let inv = blockEntity.inventory
                    return inv.isItemValid(slot, stack)
                })
                .availableOn((blockEntity, direction) => direction != Direction.UP)
        );
    });
});