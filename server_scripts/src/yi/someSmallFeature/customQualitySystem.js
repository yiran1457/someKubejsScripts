
/**@type {Record<string, {attribute:Special.Attribute,value:number,operation:$AttributeModifier$Operation_,slot:'armor'|'curios'|'hand'|'mainhand'|'offhand'}[]>} */
let customQuality = {
    'evil': [
        { attribute: "forge:block_reach", value: 1, operation: "addition", slot: 'curios' },
        { attribute: 'generic.max_health', value: -0.05, operation: "multiply_total", slot: "mainhand" },
        { attribute: 'yi:evil_damage', value: 0.05, operation: "multiply_base", slot: "mainhand" }
    ],
    'holy': [
        { attribute: "generic.armor", value: 2, operation: "multiply_base", slot: 'armor' },
        { attribute: 'forge:block_reach', value: 5, operation: 'addition', slot: 'mainhand' }
    ],
    'test': [{ attribute: "generic.max_health", value: 10, operation: "addition", slot: 'hand' }]
}
NativeEvents.onEvent($ItemAttributeModifierEvent,/**@param {$ItemAttributeModifierEvent_} event */event => {
    let itemStack = event.getItemStack()
    let nbt = itemStack.nbt
    if (nbt != null && nbt.customQuality != undefined) {
        let custom = customQuality[nbt.customQuality]
        if (custom != undefined) {
            custom.forEach((quality, index) => {
                switch (quality.slot) {
                    case 'armor':
                        if (itemStack.item instanceof $ArmorItem)
                            if (itemStack.item.getEquipmentSlot() != event.getSlotType())
                                return
                    case 'mainhand':
                        if (event.getSlotType() != $EquipmentSlot.MAINHAND)
                            return
                    case "hand":
                        if (event.getSlotType() != $EquipmentSlot.MAINHAND && event.getSlotType() != $EquipmentSlot.OFFHAND)
                            return
                    case "offhand":
                        if (event.getSlotType() != $EquipmentSlot.OFFHAND)
                            return
                    case "curios":
                        return
                    default:
                }
                event.addModifier(quality.attribute,
                    new $AttributeModifier(
                        $UUID.nameUUIDFromBytes([127, 0, 0, 1, index]),
                        'customQuality',
                        quality.value,
                        quality.operation
                    ))
            })
        }
    }
})
NativeEvents.onEvent($CurioAttributeModifierEvent,/**@param {$CurioAttributeModifierEvent_} event */event => {
    let itemStack = event.getItemStack()
    let nbt = itemStack.nbt
    if (nbt != null && nbt.customQuality != undefined) {
        let custom = customQuality[nbt.customQuality]
        if (custom != undefined) {
            custom.forEach((quality, index) => {
                switch (quality.slot) {
                    case 'curios':
                        break
                    default: return
                }
                event.addModifier(quality.attribute,
                    new $AttributeModifier(
                        $UUID.nameUUIDFromBytes([127, 0, 0, 1, index]),
                        'customQuality',
                        quality.value,
                        quality.operation
                    ))
            })
        }
    }
})
if(false){
let curiosModifyList = {}
/**
 * @param {Special.Item} itemid 
 * @param {(modify:{addModifier:function(Special.Attribute,$AttributeModifier)})} modify 
 */
let addAttribute = (itemid,modify)=>{
    curiosModifyList[itemid] = modify
}
NativeEvents.onEvent($CurioAttributeModifierEvent,/**@param {$CurioAttributeModifierEvent_} event */event => {
    let itemStack = event.itemStack.id
    if(curiosModifyList[itemStack]==undefined) return
    curiosModifyList[itemStack](event)
})
addAttribute('moonstone:probability_stone',modify=>{
    modify.addModifier('ars_nouveau:ars_nouveau.perk.feather',
        new $AttributeModifier(
            $UUID.nameUUIDFromBytes([1,2,2,5]),
            'a',
            11,
            'multiply_base'
        )
    )
})}