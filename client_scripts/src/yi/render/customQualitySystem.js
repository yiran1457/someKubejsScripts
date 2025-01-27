//priority:999

const { $RenderTooltipEvent$Color } = require("packages/net/minecraftforge/client/event/$RenderTooltipEvent$Color")
let customQuality = {
    'evil': { R: 245, G: 25, B: 164, A: 80 }
}
ItemEvents.tooltip(e => {
    e.addAdvancedToAll((i, a, t) => {
        if (i.nbt == null || i.nbt.customQuality == undefined || customQuality[i.nbt.customQuality] == undefined) return
        let { R, G, B, A } = customQuality[i.nbt.customQuality]
        t.set(0, Component.translatable(`quality.${i.nbt.customQuality}.name`).color(rgbaColor(R, G, B, A)).append(Component.of('  ')).append(t.getFirst()))
    })
})

NativeEvents.onEvent($RenderTooltipEvent$Color,/**@param {$RenderTooltipEvent$Color_} e*/e => {
    let i = e.itemStack

    if (i.nbt == null || i.nbt.customQuality == undefined || customQuality[i.nbt.customQuality] == undefined) return
    let { R, G, B, A } = customQuality[i.nbt.customQuality]
    e.setBorderStart(rgbaColor(R / 1.4, G / 1.4, B / 1.4, A))
    e.setBorderEnd(rgbaColor(R / 2, G / 2, B / 2, A))
}
)

RenderJSEvents.RegisterItemDecorations(e => {
    e.registerForAllItem(c => {
        let i = c.itemStack
    
        if (i.nbt == null || i.nbt.customQuality == undefined || customQuality[i.nbt.customQuality] == undefined) return
        c.pushPose()
        c.translate(c.xOffset, c.yOffset)
        RenderJSRenderSystem.enableBlendJS()
        let { R, G, B, A } = customQuality[i.nbt.customQuality]
        RenderJSRenderSystem.setShaderColorJS(R/255,G/255,B/255,A/100)
        if(c.itemStack!==Client.player.mouseItem)
        c.drawTexture(ResourceLocation('yi:textures/gui/tip.png'),0,0,16,16,16,16,16,16)
        RenderJSRenderSystem.setShaderColorJS(1,1,1,1)
        c.popPose()
    })
})
