
let tetra_item = ['tetra:modular_sword', 'tetra:modular_double', 'tetra:modular_bow', 'tetra:modular_shield', 'tetra:modular_crossbow', 'tetra:modular_single']
let CD_item = ['yi:random_potion']
RenderJSEvents.RegisterItemDecorations(e => {

    tetra_item.forEach(id => {
        e.register(id, 'Energy', c => {
            if(!c.itemStack.nbt)return
            let MaxEnergy = c.itemStack.nbt.getInt('MaxEnergy')
            if (MaxEnergy > 0) {
                let Energy = c.itemStack.nbt.getInt('Energy')
                c.pushPose()
                c.translate(c.xOffset + 2, c.yOffset + 13, 200)
                //绘制能量条以替换耐久条
                c.fill(0, 0, 13, 2, rgbaColor(0,0,0,100))
                c.translate(0,0,1)
                c.fill(0, 0, Energy / MaxEnergy * 13, 1, rgbaColor(240, 63, 187, 100))
                c.popPose()
            }
        })
    })

    CD_item.forEach(id => {
        e.register(id, 'CD', c => {
            if (c.itemStack.nbt != null) {
                let DrinkTime = c.itemStack.nbt.getInt('DrinkTime')
                if (Client.level.time - DrinkTime < global.PotionTime(c.itemStack)) {
                    c.pushPose()
                    c.translate(c.xOffset + 2, c.yOffset,50)
                    c.fill(-2, (Client.level.time - DrinkTime) / global.PotionTime(c.itemStack) * 17, 14, 16, rgbaColor(177, 177, 177, 70))
                    c.popPose()
                }
            }
        })
    })
})
