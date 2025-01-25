//priority:100

const { $UUID } = require("packages/java/util/$UUID")
const { $EquipmentSlot } = require("packages/net/minecraft/world/entity/$EquipmentSlot")
const { $AttributeModifier } = require("packages/net/minecraft/world/entity/ai/attributes/$AttributeModifier")
const { $ArmorItem } = require("packages/net/minecraft/world/item/$ArmorItem")
const { $ShieldItem } = require("packages/net/minecraft/world/item/$ShieldItem")
const { $ItemAttributeModifierEvent } = require("packages/net/minecraftforge/event/$ItemAttributeModifierEvent")







$Rarity.create('test', "dark_red")
$Rarity.create('yi', "aqua")
$Rarity.create('evil', "dark_red")
$Rarity.create('holy', "gold")

/**@type {Record<string, {attribute:Special.Attribute,value:number,operation:$AttributeModifier$Operation_}[]>} */
let customAttribute = {
    'evil': [{ attribute: "forge:block_reach", value: 1, operation: "addition" }],
    'holy': [
        { attribute: "generic.armor", value: 2, operation: "multiply_base" },
        { attribute: 'forge:block_reach', value: 5, operation: 'addition' }
    ],
    'test': [{ attribute: "generic.max_health", value: 10, operation: "addition" }]
}
ForgeEvents.onEvent('net.minecraftforge.event.ItemAttributeModifierEvent',/**@param {$ItemAttributeModifierEvent_} event */event => {

    let itemStack = event.getItemStack()
    let slotType = event.getSlotType()
    
    if (itemStack.getItem() instanceof $ArmorItem ) {
        if (!(event.getSlotType() == itemStack.getItem().getEquipmentSlot())) {
            return;
        }
    } else if (event.getSlotType() != $EquipmentSlot.MAINHAND && event.getSlotType() != $EquipmentSlot.OFFHAND) {
        return;
    } else if (event.getSlotType() == $EquipmentSlot.OFFHAND)
        return;

    let nbt = itemStack.nbt
    if (nbt != null && nbt.customAttribute != undefined) {
        let custom = customAttribute[nbt.customAttribute]
        if (custom != undefined) {
            custom.forEach(attr => {
                event.addModifier(attr.attribute,
                    new $AttributeModifier(
                        $UUID.randomUUID(),
                        'customAttribute',
                        attr.value,
                        attr.operation
                    ))
            })
        }
    }
})
