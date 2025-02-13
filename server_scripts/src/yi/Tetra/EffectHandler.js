//priority:-20

/**
 * @typedef {{player:$Player_,effectLevel:number,effectEfficiency:number,isActual:Boolean,isImmediate:Boolean}&$LivingDamageEvent_} TetraEventDamageEvent
 */
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