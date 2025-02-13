


ItemEvents.crafted(e=>{
    let item = e.item
    if(item.hasTag('minecraft:swords')&&!item.nbt?.owner)
        item.getOrCreateTag().owner = e.player.username
})

ItemEvents.canPickUp(e=>{
    switch(e.item.nbt?.owner){
        case e.player.username:
            break
        case undefined:
            break
        default:
            e.cancel()
            break
    
    }
})
NativeEvents.onEvent($LivingEquipmentChangeEvent,/**@param {$LivingEquipmentChangeEvent_} e */e=>{
    if(e.entity instanceof $Player){
        let item = e.entity.getItemBySlot(e.slot)
        switch(item.nbt?.owner){
            case e.entity.username:
                break
            case undefined:
                break
            default:
                e.entity.drop(item,false)
                e.entity.setItemSlot(e.slot,'air')
                break
        }
    }
})