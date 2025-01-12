


ServerEvents.highPriorityData(e => {

    let { setting: { effects }, registry: { materials, modules } } = yi$tool.tetra$tool

    materials.setMustValue(
        'random',
        'wood',
        5,
        5,
        5,
        555,
        -1,
        10,
        555,
        5,
        55,
        ['minecraft:sea_lantern']
    )
        .setNeedExp(15)
        .setName('海晶')
        .setSecondaryKey('tints', 'glyph', '0000ff')
        .setSecondaryKey('tints', 'texture', 'f58ab4')
        .setEffects(effects.真实横扫, 2)
        .setAttributes('ars_nouveau:ars_nouveau.perk.wixie', 0.5)
        .setAttributes('forge:entity_reach', 0.5)
        .create(e)

    materials.setMustValue(
        'index',
        'common',
        5, 5, 5, 5, 5, 5, 5, 5, 5, ['touhou_little_maid:power_point']
    )
        .setNeedExp(15)
        .setName('幻想乡')
        .setEffects(effects.狂妄诅咒, 100)
        .create(e)

    modules.setMustValues(
        'index',
        "sword/blade",
        '',
        'tetra:basic_major_module',
        [
            "tetra:sword/rapier_blade/",
            "tetra:sword/shared_blade/",
            "tetra:sword/shared/",
            "tetra:shared/"
        ]
    ).setOptionalValues(
        undefined,
        undefined,
        100,
        ["tetra:wood/", "tetra:stone/", "tetra:metal/", "tetra:gem/", "tetra:bone/"])
        .setTag(['forge:swords'])
        .create(e)

    modules.setMustValues(
        'ttttt',
        'sword/guard',
        'common',
        'tetra:basic_major_module',
        [
            "tetra:sword/rapier_blade/",
            "tetra:sword/shared_blade/",
            "tetra:sword/shared/",
            "tetra:shared/"
        ]
    ).create(e)
})




ServerEvents.tags('block', e => {
    e.add('minecraft:planks', 'minecraft:chiseled_stone_bricks')
})
ServerEvents.tags('item', e => {
    e.add('infinity:food', 'yi:food')
})


PlayerEvents.chat(event => {
    const { message, player, player: { block, block: { x, y, z, } }, server, level } = event;
    console.log(message)
    if (message !== 'test') return;
    // 新建一个尸壳实体
    const husk = level.createEntity('minecraft:husk');
    // 设置位置
    husk.setPosition(x, y, z);
    // 设置了显示名字
    husk.setCustomName(Component.of('僵尸测试员'));
    // 设置nbt
    husk.mergeNbt({ NoAI: true });
    // 生成 不调用此函数实体不生成
    husk.spawn();
})


ServerEvents.tick(e => {
    e.server.players.forEach(player => {
        if (player.isAlive()) {
        }

    })
})

ServerEvents.recipes(e => {
    e.recipes.kubejs.shapeless('jungle_log', [Item.of('minecraft:potion', '{Potion:"minecraft:long_turtle_master"}').weakNBT(), Item.of('minecraft:potion', '{Potion:"minecraft:strong_leaping"}').weakNBT()])
})


