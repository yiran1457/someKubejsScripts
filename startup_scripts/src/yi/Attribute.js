const { $ModifyAttributeEventJS } = require("packages/net/liopyu/entityjs/events/$ModifyAttributeEventJS")
const { $ItemAttributeModifierEvent } = require("packages/net/minecraftforge/event/$ItemAttributeModifierEvent")


StartupEvents.registry('attribute', e => {
    let simpleCreateCustomAttribute =
        (attrname, basic, min, max) => {
            e.createCustom('yi:' + attrname, () =>
                new $RangedAttribute('attribute.name.' + attrname, basic, min, max)
            )
        }
    simpleCreateCustomAttribute('holy_damage', 0, 0, 16384)
    simpleCreateCustomAttribute('evil_damage', 0, 0, 16384)
    simpleCreateCustomAttribute('holy_protection', 0, -10, 1)
    simpleCreateCustomAttribute('evil_protection', 0, -10, 1)
})
ForgeModEvents.onEvent($EntityAttributeModificationEvent,e => {
    /**@type {(attr:$Attribute_,entitylist:$EntityType_<T>[])} */
    let addAttribute = (attr, entitylist) => {
        entitylist.forEach(entity => {
            if (!e.has(entity, attr)) e.add(entity, attr)
        })
    }
    addAttribute('yi:evil_damage', ['player',"cataclysm:ignis"])
    addAttribute('yi:holy_damage', ['player'])
    addAttribute('yi:evil_protection', ['player',"cataclysm:ignis"])
    addAttribute('yi:holy_protection', ['player',"cataclysm:ignis"])
})