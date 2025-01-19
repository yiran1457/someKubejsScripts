
let tetra_item = ['tetra:modular_sword', 'tetra:modular_double', 'tetra:modular_bow', 'tetra:modular_shield', 'tetra:modular_crossbow', 'tetra:modular_single']
let CD_item = ['yi:random_potion']
RenderJSEvents.RegisterItemDecorations(e => {

    e.registerForAllItem('render_0', c => {
        if (Client.player.containerMenu.containerId == 651234 && (c.itemStack == Client.player.containerMenu.getSlot(0).getItem())) {
            c.guiGraphics.pose().pushPose()
            c.guiGraphics.pose().translate(0, 0, 0)
            if (0 < c.xOffset && c.xOffset < 180 && 0 < c.yOffset && c.yOffset < 160) {
                //if (0 < c.xOffset && c.xOffset < 160 && 0 < c.yOffset && c.yOffset < 60) {
                //RenderJSRenderSystem.setShaderTextureJS(new $ResourceLocation('yi:textures/gui/chest_render.png'))
                //c.guiGraphics.blit(new $ResourceLocation('yi:textures/gui/chest_render.png'), 0, 0, 0, 0, 175, 167, 256, 256)
            }
            c.guiGraphics.pose().popPose()
        }
    })

    tetra_item.forEach(id => {
        e.register(id, 'Energy', c => {
            let MaxEnergy = c.itemStack.nbt.getInt('MaxEnergy')
            if (MaxEnergy > 0) {
                let Energy = c.itemStack.nbt.getInt('Energy')
                c.guiGraphics.pose().pushPose()
                c.guiGraphics.pose().translate(c.xOffset + 2, c.yOffset + 13, 0)
                //绘制能量条以替换耐久条
                c.guiGraphics.fill(0, 0, 13, 2, 200, Color.rgba(0, 0, 0, 1).getArgbJS())
                c.guiGraphics.fill(0, 0, Energy / MaxEnergy * 13, 1, 300, Color.rgba(240, 63, 187, 1).getArgbJS())
                c.guiGraphics.pose().popPose()
            }
        })
    })

    CD_item.forEach(id => {
        e.register(id, 'CD', c => {
            if (c.itemStack.nbt != null) {
                let DrinkTime = c.itemStack.nbt.getInt('DrinkTime')
                if (Client.level.time - DrinkTime < global.PotionTime(c.itemStack)) {
                    c.guiGraphics.pose().pushPose()
                    c.guiGraphics.pose().translate(c.xOffset + 2, c.yOffset, 0)
                    c.guiGraphics.fill(-2, (Client.level.time - DrinkTime) / global.PotionTime(c.itemStack) * 17, 14, 16, 50, Color.rgba(177, 177, 177, 0.7).getArgbJS())
                    c.guiGraphics.pose().popPose()
                }
            }
        })
    })
})
