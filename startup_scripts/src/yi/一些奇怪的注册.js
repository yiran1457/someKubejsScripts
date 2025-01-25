//priority:100

const { $UUID } = require("packages/java/util/$UUID")
const { $AttributeModifier } = require("packages/net/minecraft/world/entity/ai/attributes/$AttributeModifier")
const { $ItemAttributeModifierEvent } = require("packages/net/minecraftforge/event/$ItemAttributeModifierEvent")







$Rarity.create('test', "dark_red")
$Rarity.create('yi', "aqua")
$Rarity.create('evil', "dark_red")
$Rarity.create('holy', "gold")


ForgeEvents.onEvent($ItemAttributeModifierEvent,/**@param {$ItemAttributeModifierEvent_} event */event => {/*
    let itemStack = event.getItemStack()
    if (!itemStack.isEnchanted()) return
    if (itemStack.getItem() instanceof $ArmorItem ) {
        if (!(event.getSlotType() == itemStack.getItem().getEquipmentSlot())) {
            return;
        }
    } else if (event.getSlotType() != $EquipmentSlot.MAINHAND && event.getSlotType() != $EquipmentSlot.OFFHAND) {
        return;
    } else if (itemStack.getItem() instanceof $ShieldItem && !(event.getSlotType() == $EquipmentSlot.OFFHAND))
        return;

    if (itemStack.getEnchantmentLevel('minecraft:protection') > 0)
        event.addModifier("generic.attack_speed",
            new $AttributeModifier(
                $UUID.randomUUID(),
                'test',
                0.4 * itemStack.getEnchantmentLevel('minecraft:protection'),
                'addition'
            ))*/

})
