// priority: 0

const { $EventBuses } = require("packages/dev/architectury/platform/forge/$EventBuses")
const { $Item$Properties } = require("packages/net/minecraft/world/item/$Item$Properties")
const { $PickaxeItem } = require("packages/net/minecraft/world/item/$PickaxeItem")
const { $PlayerEvent$BreakSpeed } = require("packages/net/minecraftforge/event/entity/player/$PlayerEvent$BreakSpeed")
const { $DeferredRegister } = require("packages/net/minecraftforge/registries/$DeferredRegister")
const { $ForgeRegistries } = require("packages/net/minecraftforge/registries/$ForgeRegistries")


/**@type {$DeferredRegister<(B)>}*/
let my$DeferredRegister$item = $DeferredRegister["create(net.minecraftforge.registries.IForgeRegistry,java.lang.String)"]($ForgeRegistries.ITEMS,"yi")
my$DeferredRegister$item.register($EventBuses.getModEventBus('kubejs').get())
my$DeferredRegister$item.register('test',()=>new $PickaxeItem(5,5,5,new $Item$Properties()))


/*
StartupEvents.init(e => {
    let register = $DeferredRegister.create($ForgeRegistries.ITEMS, 'kubejs')
    register.register($EventBuses.getModEventBus('kubejs').get())
    register.register("m5468m", () => new $PickaxeItem('IRON', 5, 5, new $Item$Properties()))
})*/








/*ForgeEvents.onEvent($ItemAttributeModifierEvent, event => {
    global.eventTest(event);
})*/
/*global.eventTest = event => {
    try {
        for (let index = 0; index < createtool$type.length; index++) {
            if (event.itemStack.id == `yi:tool_${createtool$type[index]}` && event.itemStack.nbt != null) {

            } else if (event.itemStack.id == `yi:tool_${createtool$type[index]}`) { event.itemStack.nbt = {}; event.itemStack.nbt.putInt('energy', 0) }
        }
    } catch (err) {
        console.error(err);
    }
}*/

ForgeEvents.onEvent($PlayerEvent$BreakSpeed, e => {
    global.PlayerBreak(e)
})
/**@param {$PlayerEvent$BreakSpeed} e */
global.PlayerBreak = e => {
}






StartupEvents.registry('fluid', e => {
    e.create('yi:testfluid').thinTexture('AQUA').translucent()
})






