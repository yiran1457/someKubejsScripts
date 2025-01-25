// ignored : true
ForgeEvents.onEvent($ItemAttributeModifierEvent,/**@param {$ItemAttributeModifierEvent_} event */event => {

    let itemStack = event.getItemStack();
    let slotType = event.getSlotType();
    let attributeTag = itemStack.hasTag('mryh:random_attribute')
    let nbt = itemStack.nbt;
    if (itemStack.id == 'minecraft:diamond_hoe') {
        console.log('物品带有自定义标签');
        if (nbt.contains('mryh_attribute')) {
            console.log('物品有 NBT 数据');
            let customAttribute = nbt.get('mryh_attribute');
            console.log(`获取到的 NBT 属性 ${customAttribute}`);
            switch (customAttribute) {
                case 'strength':
                    event.addModifier(
                        'minecraft:generic.attack_damage',
                        new $AttributeModifier(
                            $UUID.randomUUID(),
                            'strength_modifier',
                            5,
                            'addition'
                        )
                    );
                    console.log('物品具有 "strength" 属性');
                    break;
                case 'speed':
                    event.addModifier(
                        'minecraft:generic.attack_speed',
                        new $AttributeModifier(
                            $UUID.randomUUID(),
                            'speed_modifier',
                            2,
                            'addition'
                        )
                    );
                    console.log('物品具有 "speed" 属性');
                    break;

                case 'durability':
                    event.addModifier(
                        'minecraft:generic.max_health',
                        new $AttributeModifier(
                            $UUID.randomUUID(),
                            'durability_modifier',
                            10,
                            'addition'
                        )
                    );
                    console.log('物品具有 "durability" 属性');
                    break;
                default:
                    console.log('未识别的 NBT 属性');
                    break;
            }
        } else {
            console.log('物品没有 NBT 数据');
        }
    }
})
