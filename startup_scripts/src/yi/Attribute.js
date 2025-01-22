

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
ForgeModEvents.onEvent($EntityAttributeModificationEvent,/**@param {$EntityAttributeModificationEvent_} e */e => {
    let simpleCheckPlayerHasAttribute = (attr) => {
        if (!e.has('player', attr)) e.add('player', attr)
    }
    simpleCheckPlayerHasAttribute('yi:holy_damage')
    simpleCheckPlayerHasAttribute('yi:evil_damage')
    simpleCheckPlayerHasAttribute('yi:holy_protection')
    simpleCheckPlayerHasAttribute('yi:evil_protection')
})
