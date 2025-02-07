const { $ScreenEvent$CharacterTyped$Post } = require("packages/net/minecraftforge/client/event/$ScreenEvent$CharacterTyped$Post")
const { $ScreenEvent$KeyPressed$Post } = require("packages/net/minecraftforge/client/event/$ScreenEvent$KeyPressed$Post")

let json = JsonIO.read('./kubejs/yi/newSkillTree.json')

/**@type {Record<string,{pos:{x:number,y:number},require:List$Type<$Component$Type>,tooltip?:string[],finish:boolean}>}} */
json.forEach(v => {
    if (json[v].tooltip)
        json[v].tooltip = json[v].tooltip.map(t => Component.of(t))
})
let skillTree = json
let createMode = false
let originSkill = null
let charaLink = ''
let infoLink = ''
let inputLink = 0
let skillTreeSetting = {
    x: 0,
    y: 0,
    scale: 1,
}
let cc = 0
let rad = 0
function updateScreenAABB() {
    screenAABB = [
        (-Client.window.guiScaledWidth / 2 - skillTreeSetting.x) / skillTreeSetting.scale,
        (-Client.window.guiScaledHeight / 2 - skillTreeSetting.y) / skillTreeSetting.scale,
        (Client.window.guiScaledWidth / 2 - skillTreeSetting.x) / skillTreeSetting.scale,
        (Client.window.guiScaledHeight / 2 - skillTreeSetting.y) / skillTreeSetting.scale
    ]
}
let screenAABB
updateScreenAABB()
let checkAABBinScreen = (x1, y1, x2, y2) => {
    let num = 0
    if (x2 < x1) {
        num = x2
        x2 = x1
        x1 = num
    }
    if (y2 < y1) {
        num = y2
        y2 = y1
        y1 = num
    }
    let [x3, y3, x4, y4] = screenAABB
    if (x2 < x3 || x4 < x1)
        return false
    if (y2 < y3 || y4 < y1)
        return false
    return true
}
let checkAABBinScreenWithSize = (x, y, size) => checkAABBinScreen(x - size / 2, y - size / 2, x + size / 2, y + size / 2)
//在屏幕内绘制一个矩形
let simpleFill = (guiGraphics, poseStack, x, y, size, color) => {
    if (!checkAABBinScreenWithSize(x, y, size)) return
    poseStack.translate(0, 0, 1)
    guiGraphics.fill(x - size / 2, y - size / 2, x + size / 2, y + size / 2, color)
    poseStack.translate(0, 0, -1)
}
//在屏幕内绘制两点连线
let drawLine = (guiGraphics, poseStack, x1, y1, x2, y2, w, color) => {
    if (!checkAABBinScreen(x1, y1, x2, y2)) return
    let dx = x2 - x1
    let dy = y2 - y1
    let length = Math.sqrt(dx * dx + dy * dy)
    color = color || -1
    poseStack.pushPose()
    poseStack.translate((x1 + x2) / 2, (y1 + y2) / 2, 0)
    poseStack.rotateZRadians(Math.atan2(dy, dx))
    poseStack.translate(0, -w / 2, 0)
    guiGraphics.fill(-length / 2, 0, length / 2, w, color)
    poseStack.popPose()
}
let simpleCheck = (mouseX, mouseY, pos, size) => {
    return (mouseX > pos.x - size / 2 && mouseX < pos.x + size / 2 && mouseY > pos.y - size / 2 && mouseY < pos.y + size / 2)
}
let simpleCheckWithAABB = (mouseX, mouseY, x1,y1,x2,y2) => {
    let num = 0
    if (x2 < x1) {
        num = x2
        x2 = x1
        x1 = num
    }
    if (y2 < y1) {
        num = y2
        y2 = y1
        y1 = num
    }
    return (mouseX > x1 && mouseX < x2 && mouseY < y2 && mouseY > y1)
}
let drawTooltip = (guiGraphics, mouseX, mouseY, text) => {
    guiGraphics.renderComponentTooltip(Client.font, text, mouseX, mouseY)
}
let getClickSkillName = (mouseX, mouseY) => {
    for (let key in skillTree) {
        let { pos } = skillTree[key]
        if (simpleCheck(mouseX, mouseY, pos, 20)) {
            return key
        }
    }
    return false
}
let drawString = (guiGraphics,Text,x,y, Shadow, Color) => {
    guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
        Client.font, Text,//字体与渲染字符
        x, y,//渲染位置
        Color || -1,//RGBA
        Shadow || false//是否绘制文字阴影
    )
}
//=====================================
// events main
//=====================================
NativeEvents.onEvent($ScreenEvent$CharacterTyped$Post, e => {
    if(inputLink)
    charaLink += String.fromCodePoint(e.codePoint)
})
NativeEvents.onEvent($ScreenEvent$KeyPressed$Post, e => {
    if (e.keyCode == $GLFW.GLFW_KEY_BACKSPACE) {
        charaLink = charaLink.slice(0, -1)
    }else if(e.keyCode == $GLFW.GLFW_KEY_ENTER){
        if(!inputLink)return
        switch(inputLink){
            case 1:
                skillTree[charaLink]=skillTree[infoLink]
                for (let key in skillTree){
                    skillTree[key].require = skillTree[key].require.map(v=>{
                        if(v==infoLink)
                            return charaLink
                        return v
                    })
                }
                delete skillTree[infoLink]
                infoLink = charaLink
                break
            case 2:
                if(Number(charaLink))
                    skillTree[infoLink].pos.x = Number(charaLink)
                break
            case 3:
                if (Number(charaLink))
                    skillTree[infoLink].pos.y = Number(charaLink)
                break
            case 4:
                let l4 = skillTree[infoLink].tooltip.length
                if (l4 > 0)
                    skillTree[infoLink].tooltip[0] = Component.of(charaLink)
                else
                    skillTree[infoLink].tooltip.push(Component.of(charaLink))
                break
            case 5:
                let l5 = skillTree[infoLink].tooltip.length
                if (l5 > 0)
                    skillTree[infoLink].tooltip[1] = Component.of(charaLink)
                else
                    skillTree[infoLink].tooltip.push(Component.of(charaLink))
                break
        }
        inputLink = 0
        charaLink=''
    }
})
NativeEvents.onEvent($ScreenEvent$MouseButtonPressed$Post, e => {
    if (e.screen instanceof $LecternScreen && Client.player.containerMenu.containerId == 123) {
        let mouseX = e.mouseX - Client.window.guiScaledWidth / 2 - skillTreeSetting.x
        mouseX /= skillTreeSetting.scale
        let mouseY = e.mouseY - Client.window.guiScaledHeight / 2 - skillTreeSetting.y
        mouseY /= skillTreeSetting.scale
        if (!createMode)//检测是否处于创建模式
            for (let key in skillTree) {
                let { pos, require } = skillTree[key]
                let cando = true
                require.forEach(c => {//检测前置是否均完成
                    if (!skillTree[c].finish)
                        cando = false
                })
                if (cando && simpleCheck(mouseX, mouseY, pos, 20)) {
                    skillTree[key].finish = true
                    Client.player.playSound('ui.button.click', 0.3, 1)
                    Client.player.sendData('skill', key)
                    //存储数据
                    //JsonIO.write('./kubejs/yi/SkillTree.json', skillTree)
                }
            }
        else {
            if (simpleCheckWithAABB(e.mouseX, e.mouseY, Client.window.guiScaledWidth / 2 + 30, 30, Client.window.guiScaledWidth / 2 - 30, 10)) return
            Client.player.playSound('ui.button.click', 0.3, 1)

            if (e.button == $GLFW.GLFW_MOUSE_BUTTON_LEFT && !originSkill && !infoLink) {
                if (!getClickSkillName(mouseX, mouseY))
                    skillTree[`${mouseX}+${mouseY}`] = { pos: { x: mouseX, y: mouseY }, require: [], finish: false, tooltip: [Component.of('测试按钮')] }
            } else if (e.button == $GLFW.GLFW_MOUSE_BUTTON_RIGHT && !Client.shiftDown && !infoLink) {
                if (originSkill) {
                    let skill = getClickSkillName(mouseX, mouseY)
                    if (skill)
                        skillTree[originSkill].require.push(skill)
                    originSkill = null
                } else {
                    let skill = getClickSkillName(mouseX, mouseY)
                    if (skill)
                        originSkill = skill
                }
            } else if (e.button == $GLFW.GLFW_MOUSE_BUTTON_RIGHT && Client.shiftDown) {
                let skill = getClickSkillName(mouseX, mouseY)
                if (skill)
                    if (skill == infoLink)
                        infoLink = ''
                    else
                        infoLink = skill
            }else if (e.button == $GLFW.GLFW_MOUSE_BUTTON_LEFT && infoLink) {
                let { pos: { x, y }, tooltip } = skillTree[infoLink]
                let l = tooltip.length>0?2:1
                for (let i = 0; i < 3 + l; i++)
                    if (simpleCheck(mouseX, mouseY, { x: x + 35 - 12 + 4, y: y - 45 + 4 + i * 16 }, 8))
                        inputLink = i + 1
                if (simpleCheckWithAABB(mouseX, mouseY, x - 12, y + 20, x - 12 + Client.font.width('Delete'), y + 20 + 8)) {
                    for (let key in skillTree) {
                        let newRequire = []
                        skillTree[key].require.forEach(v=>{
                            if(v!=infoLink)
                                newRequire.push(v)
                        })
                        skillTree[key].require = newRequire
                    }
                    delete skillTree[infoLink]
                    infoLink = ''
                    inputLink = 0
                    charaLink = ''
                }
            }
        }
    }
})
let x = [1,2,3,4]
Client.tell(x.splice(0,1))
Client.tell(x)
NativeEvents.onEvent($ScreenEvent$Render$Post, e => {
    let { screen, guiGraphics } = e
    if (screen instanceof $LecternScreen && Client.player.containerMenu.containerId == 123) {
        /**@type {$PoseStack_} */
        let poseStack = guiGraphics.pose()
        poseStack.pushPose()
        //移动中心到屏幕中央

        poseStack.translate(Client.window.guiScaledWidth / 2, Client.window.guiScaledHeight / 2, 0)

        //计算操作后鼠标位置
        let mouseX = e.mouseX - Client.window.guiScaledWidth / 2 - skillTreeSetting.x
        mouseX /= skillTreeSetting.scale
        let mouseY = e.mouseY - Client.window.guiScaledHeight / 2 - skillTreeSetting.y
        mouseY /= skillTreeSetting.scale

        //进行坐标提示
        guiGraphics.renderComponentTooltip(Client.font, [
            Component.of('X:').append(Component.of(mouseX.toFixed(2)).aqua()),
            Component.of('Y:').append(Component.of(mouseY.toFixed(2)).aqua()),
        ], -20, 60 - Client.window.guiScaledHeight / 2)

        //实现拖拽与缩放
        poseStack.translate(skillTreeSetting.x, skillTreeSetting.y, 0)
        poseStack.scale(skillTreeSetting.scale, skillTreeSetting.scale, 1)

        if (createMode) {
            if (infoLink) {
                poseStack.translate(0, 0, 2)
                let { pos: { x, y }, tooltip } = skillTree[infoLink]
                let l = tooltip.length
                guiGraphics.fill(x + 20, y - 45 - 16, x + 120, y + 45, rgbaColor(114, 114, 114, 80))
                drawString(guiGraphics, `M`, x + 35 - 12, y - 45)
                drawString(guiGraphics, `M`, x + 35 - 12, y - 45 + 16)
                drawString(guiGraphics, `M`, x + 35 - 12, y - 45 + 16 * 2)
                drawString(guiGraphics, `M`, x + 35 - 12, y - 45 + 16 * 3)
                if (l >= 1)
                    drawString(guiGraphics, `M`, x + 35 - 12, y - 45 + 16 * 4)
                drawString(guiGraphics, `§4Delete`, x - 12, y+20)
                drawString(guiGraphics, `Name:${infoLink}`, x + 35, y - 45)
                drawString(guiGraphics, `posX:${x}`, x + 35, y - 45 + 16)
                drawString(guiGraphics, `posY:${y}`, x + 35, y - 45 + 16 * 2)
                if (l == 0)
                    drawString(guiGraphics, `tooltip1:null`, x + 35, y - 45 + 16 * 3)
                else
                    drawString(guiGraphics, `tooltip1:${tooltip[0].string}`, x + 35, y - 45 + 16 * 3)
                if (l == 1)
                    drawString(guiGraphics, `tooltip2:null`, x + 35, y - 45 + 16 * 4)
                else
                    drawString(guiGraphics, `tooltip2:${tooltip[1].string}`, x + 35, y - 45 + 16 * 4)
                if(inputLink)
                drawTooltip(guiGraphics,mouseX,mouseY,[Component.of(charaLink)])
                poseStack.translate(0, 0, -2)
            }
            if (originSkill && !infoLink)
                drawLine(guiGraphics, poseStack, skillTree[originSkill].pos.x, skillTree[originSkill].pos.y, mouseX, mouseY, 1, -1)
            else if (!infoLink)
                guiGraphics.fill(mouseX - 10, mouseY - 10, mouseX + 10, mouseY + 10, -1)
        }
        for (let key in skillTree) {
            let { pos: { x, y }, finish, require, tooltip } = skillTree[key]
            let cando = true
            require.forEach(c => {//遍历前置并连线
                //if (c == 'init')
                //    drawLine(guiGraphics,poseStack,x, y, 0, 0, 1, -1)
                //else {
                let colorLine = skillTree[c].finish ? rgbaColor(255, 255, 255, 100) : rgbaColor(114, 114, 114, 80)
                drawLine(guiGraphics, poseStack, x, y, skillTree[c].pos.x, skillTree[c].pos.y, 1, colorLine)
                if (!skillTree[c].finish)
                    cando = false
                //}
            })
            //绘制节点
            let colorFill = finish ? rgbaColor(255, 255, 255, 100) : cando ? rgbaColor(200, 200, 200, 100) : rgbaColor(114, 114, 114, 100)
            simpleFill(guiGraphics, poseStack, x, y, 20, colorFill)
            //鼠标悬浮提示
            if (simpleCheck(mouseX, mouseY, { x: x, y: y }, 20)) {
                if (cando && !finish)
                    simpleFill(guiGraphics, poseStack, x, y, 20, rgbaColor(255, 0, 255, 20))
                if (tooltip)
                    drawTooltip(guiGraphics, mouseX, mouseY, tooltip)
            }
        }

        //娱乐的彩虹环与旋转玩家头
        poseStack.pushPose()
        poseStack.rotateZ(cc++)
        for (let i = 0; i < 360; i += 1) {
            poseStack.rotateZ(1)
            guiGraphics.fill(-20, -1, -25, 1,
                rgbaColor(
                    (1 + Math.sin(i / 180 * 3.1415)) * 255 / 2,
                    (1 + Math.sin((i + 120) / 180 * 3.1415)) * 255 / 2,
                    (1 + Math.sin((i - 120) / 180 * 3.1415)) * 255 / 2,
                    100)
            )
        }
        poseStack.rotateZ(rad += 5)
        $PlayerFaceRenderer.draw(
            guiGraphics,
            Client.skinManager.getInsecureSkinLocation(new $GameProfile(UUID.fromString('1'), 'ycnj'))
            , -10, -10, 20, true, false
        )
        poseStack.popPose()
        poseStack.popPose()
    }
})
NativeEvents.onEvent($ScreenEvent$Opening, e => {
    if (e.screen instanceof $LecternScreen && Client.player.containerMenu.containerId == 123) {
        skillTreeSetting = {
            x: 0,
            y: 0,
            scale: 1,
        }
    }
})
NativeEvents.onEvent($ScreenEvent$MouseScrolled$Post, e => {
    if (e.screen instanceof $LecternScreen && Client.player.containerMenu.containerId == 123) {
        skillTreeSetting.scale = Math.max(0.5, Math.min(skillTreeSetting.scale + e.scrollDelta * 0.01, 5))
        updateScreenAABB()
    }
})
NativeEvents.onEvent($ScreenEvent$MouseDragged$Post, e => {
    if (e.screen instanceof $LecternScreen && Client.player.containerMenu.containerId == 123) {
        skillTreeSetting.x += e.getDragX()
        skillTreeSetting.y += e.getDragY()
        updateScreenAABB()
    }
})
//拆掉书本渲染，并设置叠加层渲染
NativeEvents.onEvent($ScreenEvent$Render$Pre, e => {
    if (e.screen instanceof $LecternScreen && Client.player.containerMenu.containerId == 123) {
        e.screen.resize(Client, -200, 0)
        e.guiGraphics.fill(0, 0, Client.window.guiScaledWidth, Client.window.guiScaledHeight, rgbaColor(114, 114, 114, 35))
    }
})
//拆掉原有按钮
NativeEvents.onEvent($ScreenEvent$Init$Post, e => {
    if (e.screen instanceof $LecternScreen && Client.player.containerMenu.containerId == 123) {
        e.getListenersList().toArray().forEach(v => {
            e.removeListener(v)
        })
        e.screen.addRenderableWidget(
            $Button.builder('创建模式', () => createMode = !createMode)
                .bounds(Client.window.guiScaledWidth / 2 - 30, 10, 60, 20)
                .build())
    }
})