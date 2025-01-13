// priority: 0



/**@type {$DeferredRegister<(B)>}*/
let my$DeferredRegister$item = $DeferredRegister["create(net.minecraftforge.registries.IForgeRegistry,java.lang.String)"]($ForgeRegistries.ITEMS,"yi")
my$DeferredRegister$item.register($EventBuses.getModEventBus('kubejs').get())
my$DeferredRegister$item.register('test',()=>new $PickaxeItem(5,5,5,new $Item$Properties()))

