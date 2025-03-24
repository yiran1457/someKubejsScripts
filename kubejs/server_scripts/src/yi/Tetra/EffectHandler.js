//priority:-20

let $Player = Java.loadClass("net.minecraft.world.entity.player.Player")
let $LivingDamageEvent = Java.loadClass("net.minecraftforge.event.entity.living.LivingDamageEvent")
let $LivingHurtEvent = Java.loadClass("net.minecraftforge.event.entity.living.LivingHurtEvent")
let $PlayerEvent$BreakSpeed = Java.loadClass("net.minecraftforge.event.entity.player.PlayerEvent$BreakSpeed")
let $ModularItem = Java.loadClass("se.mickelus.tetra.items.modular.ModularItem")

{
    let TetraEventDamageEvent = (event, stage) => {
        let { source: { actual, immediate } } = event
        /**@type {$Player_} */
        let player
        let isActual = false
        let isImmediate = false
        if (actual instanceof $Player) {
            player = actual
            isActual = true
        }
        if (immediate instanceof $Player) {
            player = immediate
            isImmediate = true
        }
        if (!player) return
        if (player.mainHandItem.item instanceof $ModularItem) {
            let itemStack = player.mainHandItem
            itemStack.item.getEffects(itemStack).forEach(/**@param {$ItemEffect_} effect */effect => {
                if (TetraEffectStream[effect.key + stage] !== undefined)
                    TetraEffectStream[effect.key + stage](
                        Object.assign({//在event上添加一些自定义属性
                            effectLevel: itemStack.item.getEffectLevel(itemStack, effect),
                            effectEfficiency: itemStack.item.getEffectEfficiency(itemStack, effect),
                            player: player,
                            isActual: isActual,
                            isImmediate: isImmediate
                        }, event)
                    )
            })
        }
    }
    NativeEvents.onEvent($LivingDamageEvent, event => {
        TetraEventDamageEvent(event, 'Damage')
    })
    NativeEvents.onEvent($LivingHurtEvent, event => {
        TetraEventDamageEvent(event, 'Hurt')
    })
}
//注册
ServerEvents.highPriorityData(e => {
    for (let path in TetraRegistryStream) {
        e.addJson(path, TetraRegistryStream[path])
    }
})
