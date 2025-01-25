const { $UUID } = require("packages/java/util/$UUID")
const { $EquipmentSlot } = require("packages/net/minecraft/world/entity/$EquipmentSlot")
const { $AttributeModifier } = require("packages/net/minecraft/world/entity/ai/attributes/$AttributeModifier")
const { $ArmorItem } = require("packages/net/minecraft/world/item/$ArmorItem")
const { $ShieldItem } = require("packages/net/minecraft/world/item/$ShieldItem")
const { $ItemAttributeModifierEvent } = require("packages/net/minecraftforge/event/$ItemAttributeModifierEvent")




let { ItemStack2Json, FluidStack2Json } = Recipes.function
let sequenced_assembly$序列 = function (ingredient, transitionalItem) {
    this.json = {
        ingredient: ItemStack2Json(ingredient),
        transitionalItem: ItemStack2Json(transitionalItem || ingredient),
        sequence: [],
        type: "create:sequenced_assembly",
        loops: 3,
        results: []
    }
}
sequenced_assembly$序列.prototype = {
    energising$充能(energy) {
        this.json.sequence.push({
            "type": "create_new_age:energising",
            "energy_needed": energy,
            "ingredients": [this.json.transitionalItem],
            "results": [this.json.transitionalItem]
        })
        return this
    },
    deploying$安装(item, keep) {
        this.json.sequence.push({
            "type": "create:deploying",
            "ingredients": [
                this.json.transitionalItem,
                ItemStack2Json(item)
            ],
            "results": [this.json.transitionalItem],
            "keepHeldItem": keep || false
        })
        return this
    },
    cutting$切割() {
        this.json.sequence.push({
            "type": "create:cutting",
            "ingredients": [this.json.transitionalItem],
            "results": [this.json.transitionalItem]
        })
        return this
    },
    pressing$辊压() {
        this.json.sequence.push({
            "type": "create:pressing",
            "ingredients": [this.json.transitionalItem],
            "results": [this.json.transitionalItem]
        })
        return this
    },
    filling$注液(fluid) {
        this.json.sequence.push(
            {
                "type": "create:filling",
                "ingredients": [this.json.transitionalItem,
                FluidStack2Json(fluid)
                ],
                "results": [this.json.transitionalItem]
            })
        return this
    },
    getjson() { return this.json },
    setLoops(time) {
        this.json.loops = time
        return this
    },
    addResults(Result, weight) {
        let item = ItemStack2Json(Result)
        item.chance = weight || 1
        this.json.results.push(item)
        return this
    },
    overBuilder(event) {
        event.custom(this.json)
    }
}




ServerEvents.recipes(e => {
    let x = new sequenced_assembly$序列(Item.of("touhou_little_maid:power_point", 2, { display: { Lore: ['{"color":"white","text":"what can i say ?"}'] } }).weakNBT())
        .addResults(Item.of("yi:technological_core", 11, { display: { Lore: ['{"color":"white","text":"what can i say ?"}'] } }))
        //.energising$充能(5000)
        .deploying$安装(Item.of('minecraft:diamond_chestplate', '{Damage:0}').weakNBT(), true)
        .filling$注液('64x minecraft:lava')
    x.overBuilder(e)

    
})






let tellSomeThings = (info) => {
    console.log(info)
    Client.player.tell(info)
}



BlockEvents.broken('create:lectern_controller',e => {
    if (e.block.entityData.getCompound('Controller').getString('id') != 'create:linked_controller')
        e.block.entityData = {}
})
BlockEvents.rightClicked('create:lectern_controller',e => {
    if (e.block.entityData.getCompound('Controller').getString('id') != 'create:linked_controller')
        e.block.entityData = {}
})
BlockEvents.leftClicked('create:lectern_controller',e => {
    if (e.block.entityData.getCompound('Controller').getString('id') != 'create:linked_controller')
        e.block.entityData = {}
})
ItemEvents.firstLeftClicked(e=>{
    Client.tell(e.player.username)
    e.player.tell(`圣洁倍率${simpleGetHolyEffect(e.player)}`)
    e.player.tell(`邪恶倍率${simpleGetEvilEffect(e.player)}`)
    e.player.tell(e.player.getAttributeValue('yi:evil_protection'))
})


NativeEvents.onEvent($ItemAttributeModifierEvent,/**@param {$ItemAttributeModifierEvent_} event */event => {/*
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
