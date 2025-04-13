const { $BasicItemJS$Builder } = require("packages/dev/latvian/mods/kubejs/item/custom/$BasicItemJS$Builder")
const { $Item } = require("packages/net/minecraft/world/item/$Item")

StartupEvents.registry('enchantment', e => {
    e.create('test')
})
ItemEvents.modification(e=>{
    e.modify('minecraft:stick', /**@param {$Item} i*/i=>{
        i.setFoodProperties(c=>{
            c.hunger(1).saturation(0.1).alwaysEdible()
        })
    })
})
