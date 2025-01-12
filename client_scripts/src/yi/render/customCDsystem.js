

//client
let chectCDTag = (itemStack) => itemStack?.nbt?.cooldown?.common !== undefined 
RenderJSEvents.RegisterItemDecorations(e => {
    
    e.registerForAllItem('CDsystem', c => {
            c.guiGraphics.pose().pushPose()
            c.guiGraphics.pose().translate(c.xOffset , c.yOffset , 0)
            if (chectCDTag(c.itemStack)) {
                let {CDstart, CDrequire} = c.itemStack.nbt.cooldown.common
                let CDtime = (Client.level.time - CDstart )/CDrequire
                if(CDtime>1)CDtime = 1
                c.guiGraphics.fill(
                    0, CDtime*16,//条起始位
                    16, 16,//条结束位
                    1,//深度/优先级
                    rgbaColor(158,164,164, 70)//RGBA
                ) 
                c.guiGraphics.fill(
                    0, CDtime*16,//条起始位
                    16, 16,//条结束位
                    170,//深度/优先级
                    rgbaColor(255,255,255, 18)//RGBA
                ) 
            }
            c.guiGraphics.pose().popPose()
    })
})