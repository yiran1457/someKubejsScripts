//priority:100







$Rarity.create('test', "dark_red")
$Rarity.create('yi', "aqua")
$Rarity.create('evil', "dark_red")
$Rarity.create('holy', "gold")


const { $EntityAttributeModificationEvent } = require("packages/net/minecraftforge/event/entity/$EntityAttributeModificationEvent")


StartupEvents.registry('attribute', e => {
    e.createCustom('yi:holy_damage', () =>
        new $RangedAttribute(
            'attribute.name.holy_damage',
            0.0,
            0.0,
            16384.0
        )
    )
    e.createCustom('yi:evil_damage', () =>
        new $RangedAttribute(
            'attribute.name.evil_damage',
            0.0,
            0.0,
            16384.0
        )
    )
})
ForgeModEvents.onEvent($EntityAttributeModificationEvent,/**@param {$EntityAttributeModificationEvent_} e */e => {
    if (!e.has('player', 'yi:holy_damage')) e.add('player', 'yi:holy_damage')
    if (!e.has('player', 'yi:evil_damage')) e.add('player', 'yi:evil_damage')

})



CapabilityAttachEvents.entity(e => {
    e.register('test', c => {
        c.serialize(() => {
            let tag = c.newTag()
            tag.put('test', c.dataTag)
            return tag
        })

        c.deserialize((tag) => {
            c.setData(tag.getCompound('test'))
        })
    })
})
CapabilityAttachEvents.itemStack(e => {
    e.register('it', c => {
        c.serialize(() => {
            let tag = c.newTag()
            tag.put('it', c.dataTag)
            return tag
        })

        c.deserialize((tag) => {
            c.setData(tag.getCompound('it'))
        })
    })
})