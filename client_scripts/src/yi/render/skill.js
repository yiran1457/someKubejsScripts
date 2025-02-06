

/**@type {Record<string,{pos:{x:number,y:number},require?:List$Type<$Component$Type>,tooltip?:string[],finish:boolean}>}} */
let skillTree = {
    index1: { pos: { x: 60, y: 60 }, require: ['init'], finish: false, tooltip: [Component.of('伊始')] },
    index11: { pos: { x: 80 + 60, y: 80 }, require: ['index1'], finish: false },
    index12: { pos: { x: 80, y: 80 + 60 }, require: ['index1'], finish: false },
    index101: { pos: { x: 80 + 80, y: 80 + 80 }, require: ['index11', 'index12'], finish: false },
    index2: { pos: { x: -80, y: 80 }, require: ['init'], finish: false },
    index3: { pos: { x: 80, y: -80 }, require: ['init'], finish: false },
    index4: { pos: { x: -80, y: -80 }, require: ['init'], finish: false },
    index41: { pos: { x: -80 - 60, y: -80 }, require: ['index4'], finish: false },
    index42: { pos: { x: -80, y: -80 - 60 }, require: ['index4'], finish: false },
}
let skillTreeSetting = {
    x: 0,
    y: 0,
    scale: 1,
}
let cc = 0
let rad =0
NativeEvents.onEvent($ScreenEvent$MouseButtonPressed$Post, e => {
    if (e.screen instanceof $LecternScreen && Client.player.containerMenu.containerId == 123) {
        let mouseX = e.mouseX - Client.window.guiScaledWidth / 2 - skillTreeSetting.x
        mouseX /= skillTreeSetting.scale
        let mouseY = e.mouseY - Client.window.guiScaledHeight / 2 - skillTreeSetting.y
        mouseY /= skillTreeSetting.scale
        let simpleCheck = (pos, size) => {
            return (mouseX > pos.x - size / 2 && mouseX < pos.x + size / 2 && mouseY > pos.y - size / 2 && mouseY < pos.y + size / 2)
        }
        for(let key in skillTree){
            let {pos,require} = skillTree[key]
            let cando = true
            require.forEach(c=>{
                if(c=='init')return
                if(!skillTree[c].finish)
                    cando = false
            })
        if (cando&&simpleCheck(pos,20)) {
            skillTree[key].finish = true
            Client.player.playSound('ui.button.click', 0.3, 1)
        }
    }
    }
})
function updateScreenAABB(){
    screenAABB = [
    (-Client.window.guiScaledWidth / 2 - skillTreeSetting.x) / skillTreeSetting.scale,
    (-Client.window.guiScaledHeight / 2 - skillTreeSetting.y) / skillTreeSetting.scale,
    (Client.window.guiScaledWidth / 2 - skillTreeSetting.x) / skillTreeSetting.scale,
    (Client.window.guiScaledHeight / 2 - skillTreeSetting.y) / skillTreeSetting.scale
]

}
let screenAABB
updateScreenAABB()
let checkAABBinScreen = (x1,y1,x2,y2) => {
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
    let [x3,y3,x4,y4] = screenAABB
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
let drawLine = (guiGraphics,poseStack,x1, y1, x2, y2, w, color) => {
    if(!checkAABBinScreen(x1,y1,x2,y2))return
    let dx = x2 - x1
    let dy = y2 - y1
    let length = Math.sqrt(dx * dx + dy * dy)
    color = color || -1
    poseStack.pushPose()
    poseStack.translate((x1 + x2) / 2, (y1 + y2) / 2 , 0)
    poseStack.rotateZRadians(Math.atan2(dy, dx))
    poseStack.translate(0,-w/2,0)
    guiGraphics.fill(-length / 2, 0, length / 2, w, color)
    poseStack.popPose()
}
let simpleCheck = (mouseX,mouseY,pos, size) => {
    return (mouseX > pos.x - size / 2 && mouseX < pos.x + size / 2 && mouseY > pos.y - size / 2 && mouseY < pos.y + size / 2)
}
let drawTooltip = (guiGraphics,mouseX,mouseY, text) => {
    guiGraphics.renderComponentTooltip(Client.font, text, mouseX, mouseY)
}
NativeEvents.onEvent($ScreenEvent$Render$Post, e => {
    let { screen, guiGraphics} = e
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
        guiGraphics.renderComponentTooltip(Client.font,[
            Component.of('X:').append(Component.of(mouseX.toFixed(2)).aqua()),
            Component.of('Y:').append(Component.of(mouseY.toFixed(2)).aqua()),
        ],-20,60- Client.window.guiScaledHeight / 2)

        //实现拖拽与缩放
        poseStack.translate(skillTreeSetting.x, skillTreeSetting.y, 0)
        poseStack.scale(skillTreeSetting.scale, skillTreeSetting.scale, 1)

        for(let key in skillTree){
            let {pos:{x,y},finish,require,tooltip}= skillTree[key]
            let cando = true
            require.forEach(c => {//遍历前置并连线
                if (c == 'init')
                    drawLine(guiGraphics,poseStack,x, y, 0, 0, 1, -1)
                else {
                    let colorLine = skillTree[c].finish ? rgbaColor(255, 255, 255, 100) : rgbaColor(114, 114, 114, 80)
                    drawLine(guiGraphics,poseStack,x, y, skillTree[c].pos.x, skillTree[c].pos.y, 1, colorLine)
                    if (!skillTree[c].finish)
                        cando = false
                }
            })
            //绘制节点
            let colorFill = finish?rgbaColor(255,255,255,100):cando?rgbaColor(200,200,200,100):rgbaColor(114,114,114,100)
            simpleFill(guiq,poseStack,x,y,20,colorFill)
            //鼠标悬浮提示
            if(simpleCheck(mouseX,mouseY,{x:x,y:y},20)){
                if(cando&&!finish)
                simpleFill(guiGraphics,poseStack,x,y,20,rgbaColor(255,0,255,20))
                if(tooltip)
                    drawTooltip(guiGraphics,mouseX,mouseY,tooltip)
            }
        }

        //娱乐的彩虹环与旋转玩家头
        poseStack.pushPose()
        poseStack.rotateZ(cc++)
        for (let i = 0; i < 360; i += 1) {
            poseStack.rotateZ(1)
            guiGraphics.fill(-20, -1, -25, 1, 
                rgbaColor(
                (1+Math.sin(i/180*3.1415))*255/2,
                (1+Math.sin((i+120)/180*3.1415))*255/2, 
                (1+Math.sin((i-120)/180*3.1415))*255/2, 
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
NativeEvents.onEvent($ScreenEvent$Opening,e=>{
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
NativeEvents.onEvent($ScreenEvent$Render$Pre,e => {
    if (e.screen instanceof $LecternScreen && Client.player.containerMenu.containerId == 123) {
        e.screen.resize(Client, -200, 0)
        e.guiGraphics.fill(0, 0, Client.window.guiScaledWidth, Client.window.guiScaledHeight, rgbaColor(114,114,114, 35))
    }
})
//拆掉原有按钮
NativeEvents.onEvent($ScreenEvent$Init$Post, e => {
    if (e.screen instanceof $LecternScreen && Client.player.containerMenu.containerId == 123) {
        e.getListenersList().toArray().forEach(v => {
            e.removeListener(v)
        })
    }
})
