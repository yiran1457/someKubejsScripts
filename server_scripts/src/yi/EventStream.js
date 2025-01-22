//priority:1000


/**@type {{}} */
let AngelEnchantment = {'yi:fallen_angel_blessing':2}
/**@type {{}} */
let DevilEnchantment = {'yi:evil_life_drain':1,'yi:fallen_angel_blessing':2}
PlayerEvents.tick(e => {
    let { player } = e
    if(player.age%20!==0)return//每秒进行一次计算
    let {inventory} = player
    let checkItemList = [
        inventory.getArmor(0),inventory.getArmor(1),
        inventory.getArmor(2),inventory.getArmor(3),
        player.mainHandItem,player.offHandItem
    ]
    let Angel=0,Devil=0
    checkItemList.forEach(item => {
        item.enchantments.forEach((enchantmentid,level) => {
            if(AngelEnchantment[enchantmentid]!=undefined)
                Angel+=level*AngelEnchantment[enchantmentid]
            if(DevilEnchantment[enchantmentid]!=undefined)
                Devil+=level*DevilEnchantment[enchantmentid]
        })
    })
    player.persistentData.putDouble('Angel',Angel)
    player.persistentData.putDouble('Devil',Devil)
    player.sendData('attr',{
        'yi:holy_damage':e.player.getAttributeValue('yi:holy_damage'),
        'yi:evil_damage':e.player.getAttributeValue('yi:evil_damage')
    })
    player.sendData('hud', {
        Angel: player.persistentData.getDouble('Angel'),
        Devil: player.persistentData.getDouble('Devil')
    })
})


NativeEvents.onEvent($TickEvent$PlayerTickEvent,/**@param {$TickEvent$PlayerTickEvent_} e */e => {
    switch (e.phase) {
        case 'START':
            CuriosToInventoryEnergy(e)
            TetraEnergyCap(e)
            break;
        case 'END':
            break;
    }
})
