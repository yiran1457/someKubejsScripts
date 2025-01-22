
ServerEvents.tags('item', e => {
    e.add('infinity:food', ['moonstone:apple', 'apple'])
})




ServerEvents.tags('damage_type',e=>{
    e.add('minecraft:bypasses_enchantments',['yi:holy','yi:evil'])
    e.add('minecraft:bypasses_shield',['yi:holy','yi:evil'])
    e.add('minecraft:bypasses_resistance',['yi:holy','yi:evil'])
    e.add('minecraft:bypasses_cooldown',['yi:holy','yi:evil'])
    e.add('minecraft:bypasses_armor',['yi:holy','yi:evil'])
})
