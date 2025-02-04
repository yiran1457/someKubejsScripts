//priority:100

const { $RendererCurios } = require("packages/com/prunoideae/powerfuljs/capabilities/forge/mods/curios/$RendererCurios")
const { $OverlayTexture } = require("packages/net/minecraft/client/renderer/texture/$OverlayTexture")
const { $ModelResourceLocation } = require("packages/net/minecraft/client/resources/model/$ModelResourceLocation")
const { $Quaternionf } = require("packages/org/joml/$Quaternionf")
const { $CuriosRendererRegistry } = require("packages/top/theillusivec4/curios/api/client/$CuriosRendererRegistry")


$Rarity.create('test', "dark_red")
$Rarity.create('yi', "aqua")
$Rarity.create('evil', "dark_red")
$Rarity.create('holy', "gold")


ClientEvents.init(e => {
    $CuriosRendererRegistry.register(
        'yi:sacred_and_demonic_mirror',
        ()=>new $RendererCurios(curiosrender)
    )
})

let curiosrender = /**@param {$RendererCurios$RenderContext_} c*/c => {
    let { matrixStack, renderTypeBuffer, slotContext, light, partialTicks } = c
    
    matrixStack.pushPose()
    CuriosRenderer.translateIfSneaking(matrixStack,slotContext.entity())
    matrixStack.translate(0,-2,0)


    matrixStack.mulPose(new $Quaternionf().rotateZ(0.2*JavaMath.PI))

    matrixStack.pushPose()
    Client.itemRenderer.render(
        Item.of('minecraft:written_book'),
        'none',
        false,
        matrixStack,
        renderTypeBuffer,
        light,
        $OverlayTexture.NO_OVERLAY,
        Client.modelManager.getModel(new $ModelResourceLocation('minecraft:written_book','inventory'))
    )
    matrixStack.popPose()
    
    matrixStack.popPose()
}
let index = 0
///Client.tell(Client.modelManager.getModel(ResourceLocation('mna:block/bind_wounds')).usesBlockLight())



//console.log(engine.get('myObject'))
/*
StartupEvents.registry('item',e=>{
    let $NashornScriptEngineFactory = Java.loadClass('org.openjdk.nashorn.api.scripting.NashornScriptEngineFactory')
    let engine = new $NashornScriptEngineFactory().getScriptEngine()
    engine.eval('var test = Java.type("se.mickelus.tetra.items.modular.impl.shield.ModularShieldItem")');
    engine.eval(`
    // 另一个示例：继承 Java 类并重写方法
    var MyObject = Java.extend(test
    , {
    //identifier : "modular_test";
    }
    );
    
    `)
    engine.eval(`// 创建 MyObject 实例并调用 toString 方法
    var myObj = new MyObject();`);
    e.createCustom('yi:ttttttest',()=>engine.get('MyObj'))
})
*/