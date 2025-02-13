const { $RenderSystem } = require("packages/com/mojang/blaze3d/systems/$RenderSystem")
const { $DefaultVertexFormat } = require("packages/com/mojang/blaze3d/vertex/$DefaultVertexFormat")
const { $Tesselator } = require("packages/com/mojang/blaze3d/vertex/$Tesselator")
const { $VertexFormat$Mode } = require("packages/com/mojang/blaze3d/vertex/$VertexFormat$Mode")
const { $Minecraft } = require("packages/net/minecraft/client/$Minecraft")
const { $GameRenderer } = require("packages/net/minecraft/client/renderer/$GameRenderer")
const { $RenderGuiOverlayEvent } = require("packages/net/minecraftforge/client/event/$RenderGuiOverlayEvent")
const { $RenderGuiOverlayEvent$Post } = require("packages/net/minecraftforge/client/event/$RenderGuiOverlayEvent$Post")
const { $RenderGuiOverlayEvent$Pre } = require("packages/net/minecraftforge/client/event/$RenderGuiOverlayEvent$Pre")
const { $Quaternionf } = require("packages/org/joml/$Quaternionf")
const { $GL11 } = require("packages/org/lwjgl/opengl/$GL11")


let face = 0
let facemax = 60


function generateGradientColor(startColor, endColor, steps) {
    let colorList = []
    for (let i = 0; i < steps; i++) {
        let ratio = i / (steps - 1)
        colorList.push([
            startColor[0] + ratio * (endColor[0] - startColor[0]),
            startColor[1] + ratio * (endColor[1] - startColor[1]),
            startColor[2] + ratio * (endColor[2] - startColor[2])
        ])
    }
    return colorList;
}

function HsvToRgb(h, s, v) {
    let c = v * s
    let x = c * (1 - Math.abs((h / 60) % 2 - 1))
    let m = v - c
    let r; let g; let b
    if (h < 60) { r = c; g = x; b = 0 }
    else if (h < 120) { r = x; g = c; b = 0 }
    else if (h < 180) { r = 0; g = c; b = x }
    else if (h < 240) { r = 0; g = x; b = c }
    else if (h < 300) { r = x; g = 0; b = c }
    else { r = c; g = 0; b = x }
    r = (r + m) * 255
    g = (g + m) * 255
    b = (b + m) * 255
    let outrgb = [r, g, b]
    return outrgb
}

function ToDrawSixstar(x, y, z, r, step) {
    let hsvcolor = generateGradientColor([0, 0, 0.75], [180, 1, 1], step)
    let rgbcolor = []
    for (let i0 = 0; i0 < hsvcolor.length; i0++) {
        rgbcolor.push(HsvToRgb(hsvcolor[i0][0], hsvcolor[i0][1], hsvcolor[i0][2]))
    }
    //console.info(hsvcolor)
    let Π = 3.14159
    let spark = 2 * Π / step / 8
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < step; j++) {

            let outz1 = z + Math.sin(spark * j + i * step * spark + face / facemax * 2 * Π) * r
            let outx1 = x + Math.cos(spark * j + i * step * spark + face / facemax * 2 * Π) * r
            let lizi1 = Client.particleEngine.createParticle('minecraft:electric_spark', outx1, y, outz1, 0, 0, 0)
            lizi1.setColor(54, 0, 150)
            lizi1.setColor(rgbcolor[step - j - 1][0] / 255, rgbcolor[step - j - 1][1] / 255, rgbcolor[step - j - 1][2] / 255)
            lizi1.setLifetime(-1)

            let outz2 = z + (Math.sin(i * step * spark + face / facemax * 2 * Π) - Math.sin((i + 3) * step * spark + face / facemax * 2 * Π)) * j * r / step - Math.sin(i * step * spark + face / facemax * 2 * Π) * r
            let outx2 = x + (Math.cos(i * step * spark + face / facemax * 2 * Π) - Math.cos((i + 3) * step * spark + face / facemax * 2 * Π)) * j * r / step - Math.cos(i * step * spark + face / facemax * 2 * Π) * r
            let lizi2 = Client.particleEngine.createParticle('minecraft:electric_spark', outx2, y, outz2, 0, 0, 0)
            lizi2.setColor(rgbcolor[j][0] / 255, rgbcolor[j][1] / 255, rgbcolor[j][2] / 255)
            lizi2.setLifetime(-1)

            /*let outz3 = z+(Math.sin(i*step*spark+face/facemax*2*Π)-Math.sin((i+2)*step*spark+face/facemax*2*Π))*j*r/step-Math.sin(i*step*spark+face/facemax*2*Π)*r
            let outx3 = x+(Math.cos(i*step*spark+face/facemax*2*Π)-Math.cos((i+2)*step*spark+face/facemax*2*Π))*j*r/step-Math.cos(i*step*spark+face/facemax*2*Π)*r
            let lizi3 = Client.particleEngine.createParticle('minecraft:electric_spark', outx3, y, outz3, 0, 0, 0)
            lizi3.setColor(rgbcolor[j][0]/255,rgbcolor[j][1]/255,rgbcolor[j][2]/255)
            lizi3.setLifetime(-1)*/

        }
    }
}
function ToChangeInt(int) {
    if (int < 1000) {
    } else if (int < 1000000) {
        int = Math.floor(int / 10) / 100 + 'K'
    } else if (int < 1000000000) {
        int = Math.floor(int / 10000) / 100 + 'M'
    } else if (int < 1000000000000) {
        int = Math.floor(int / 10000000) / 100 + 'B'
    }
    return int
}


ClientEvents.tick(event => {
    if (face < facemax) face++
    else face = 0
    let { player, level } = event
    let { x, y, z, facing } = player
    //let currentParticle = 'minecraft:electric_spark'
    //let p = Client.particleEngine.createParticle(currentParticle, x, y, z, 0, 0, 0)
    //p.lifetime = 60
    //ToDrawSixstar(x,y+0.1,z,Math.abs(facemax/2-face)/facemax+3-0.25,16)
})
NativeEvents.onEvent($ContainerScreenEvent$Render$Foreground,/**@param {$ContainerScreenEvent$Render$Foreground_} e */e => {
    let { guiGraphics } = e
    if (Client.screen instanceof $InventoryScreen) {
        RenderJSRenderSystem.enableBlendJS()
        RenderJSRenderSystem.setShaderColorJS(1, 0, 1, 1)
        guiGraphics.blit(
            'yi:textures/gui/tip.png', //资源路径
            - 20, 80, //渲染左上角的坐标
            0,//深度/优先级
            0, 0, //材质裁剪开始位置
            16, 16, //显示大小
            16, 16//设置材质大小
        )
        e.guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
            Client.font, Client.player.abilities.mayfly ? '开' : '关',
            -20 + 4, 80 + 4,//渲染位置
            rgbaColor(0, 20, 255, 90),//RGBA
            false//是否绘制文字阴影
        )
        RenderJSRenderSystem.setShaderColorJS(1, 1, 1, 1)
    }
})



NativeEvents.onEvent($ScreenEvent$Init$Post, e => {
    let { screen } = e
    if (screen instanceof $InventoryScreen) {
        let image = new $ImageButton(
            screen.guiLeft - 20, screen.guiTop + 80,
            20, 20,
            33, 33,
            0,
            ResourceLocation('yi:textures/gui/tip.png'),
            255, 255,
            () => {
                Client.player.abilities.mayfly = !Client.player.abilities.mayfly
                if (!Client.player.abilities.mayfly)
                    Client.player.abilities.flying = false
                Client.player.onUpdateAbilities()
            }
        )
        image.setTooltip($Tooltip.create(Component.of(`§e切换飞行模式${Client.player.abilities.mayfly}`)))
        screen.addRenderableWidget(image)
    }
    if (screen instanceof Java.loadClass('se.mickelus.tetra.blocks.workbench.gui.WorkbenchScreen'))
        screen.addRenderableWidget(
            $Button.builder(Component.of('测试按钮'), () => console.log(screen.getMenu().getClass()))
                .bounds(0, 0, 100, 20)
                .build()
        )
})

//在世界中绘制文字的测试
RenderJSEvents.onLevelRender(e => {
    if (e.stage != RenderJSLevelRenderStage.AFTER_SOLID_BLOCKS) return
    e.pushPose()
    e.transformerCamera(e.poseStack, e.camera)
    e.translate(-6, -59, 23)
    e.poseStack.mulPose(Client.entityRenderDispatcher.cameraOrientation())
    e.scale(0.02, 0.02, 0.02)
    e.rotationDegreesZ(180)
    new $GuiGraphics(Client, e.poseStack, e.bufferSource)
        .fill(-10, -10, 10, 10, rgbaColor(255, 0, 0, 255))
    e.drawString('测试文字', 0, 0, 255, 0, 255, 255)
    e.drawShadowString('测试文字11111111', 0 - Client.font.width('测试文字11111111') / 2, -10, 255, 0, 255, 255)
    //e.renderLevelItem('acacia_boat',e.poseStack)
    e.popPose()
    /*
        e.pushPose()
        e.transformerCamera(e.poseStack, e.camera)
        e.translate(Client.player.x,Client.player.y+0.01,Client.player.z)
        //e.poseStack.mulPose(Client.entityRenderDispatcher.cameraOrientation())
        e.scale(0.02, 0.02, 0.02)
        //e.rotationDegreesZ(180)
        e.rotationDegreesX(90)    
        for(let i=0;i<360;i++){
            e.rotationDegreesZ(1)
            e.guiGraphics.fill(90, -1, 110, 1, rgbaColor(i/360*255, i/360*255, i/360*255, 255))
            e.guiGraphics.fill(200, -10, 220, 10, rgbaColor(255, 0, 0, 255))
        }
        e.popPose()*/
})
//在实体右边渲染实体属性加显示实体名称
NativeEvents.onEvent($RenderNameTagEvent, e => {
    let { poseStack, entity } = e
    if (Client.player.useItem == 'minecraft:spyglass') return
    if (entity != Client.player.rayTrace(100, false).entity) return
    e.setResult('allow')
    let line = -20
    poseStack.pushPose()
    poseStack.translate(0, e.entity.eyeHeight, 0)
    poseStack.rotateY(-Client.player.yRot)
    poseStack.rotateZ(180)
    poseStack.scale(0.02, 0.02, 0.02)
    let GuiGraphics = new $GuiGraphics(Client, e.poseStack, e.multiBufferSource)
    let drawString = (Text, Shadow, Color) => {
        GuiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
            Client.font, Text,//字体与渲染字符
            entity.bbWidth * 50, line += 8,//渲染位置
            Color || -1,//RGBA
            Shadow || false//是否绘制文字阴影
        )
    }
    if (entity instanceof $LivingEntity) {
        drawString(`生命:${entity.health.toFixed(2)}/${entity.maxHealth}`)
        if (entity.attributes.hasAttribute('generic.attack_damage'))
            drawString(`攻击:${entity.getAttributeValue('generic.attack_damage')}`)
        if (entity.attributes.hasAttribute('generic.armor'))
            drawString(`护甲:${entity.getAttributeValue('generic.armor')}`)
        if (entity.attributes.hasAttribute('generic.armor_toughness'))
            drawString(`韧性:${entity.getAttributeValue('generic.armor_toughness')}`)
    }
    poseStack.popPose()
})
let barLink = {}
let hurtTimeLink = {}
NativeEvents.onEvent($RenderLivingEvent$Post, e => {
    let { poseStack, entity, multiBufferSource } = e
    if (!entity instanceof $LivingEntity) return
    let hurt_time = hurtTimeLink[entity.uuid] || 20 * 10
    let level_time = Client.level.time
    if (level_time - hurt_time > 20 * 10) {//在1攻击0秒后不进行渲染
        delete hurtTimeLink[entity.uuid]
        return
    }

    let GuiGraphics = new $GuiGraphics(Client, poseStack, multiBufferSource)
    poseStack.pushPose()
    poseStack.translate(0, entity.eyeHeight, 0)
    poseStack.rotateY(-Client.player.yRotO)
    poseStack.rotateZ(180)
    poseStack.scale(0.02, 0.02, 0.02)
    if (level_time - hurt_time > 20 * 6)//在6秒后的4秒内缩小血条到消失
        poseStack.scale(1 - (level_time - hurt_time - 20 * 6) / (20 * 4), 1, 1)

    //血条底色
    let bar1 = 88 * Math.log(40 + entity.health) / 10
    //临时血条
    if (barLink[entity.uuid] < 0)
        delete barLink[entity.uuid]
    if (barLink[entity.uuid] != undefined)
        barLink[entity.uuid] -= 0.0003
    let bar2 = bar1 * barLink[entity.uuid] || 0
    //真血条
    let bar3 = bar1 * entity.health / entity.maxHealth
    if (bar2 < bar3) bar2 = bar3

    GuiGraphics.fill(bar2, -30, bar1, -35, rgbaColor(114, 114, 114, 100))
    GuiGraphics.fill(-bar1, -30, -bar2, -35, rgbaColor(114, 114, 114, 100))
    GuiGraphics.fill(bar3, -30, bar2, -35, rgbaColor(200, 200, 200, 100))
    GuiGraphics.fill(-bar2, -30, -bar3, -35, rgbaColor(200, 200, 200, 100))
    GuiGraphics.fill(-bar3, -30, bar3, -35, rgbaColor(255, 0, 0, 100))

    poseStack.popPose()
})
NativeEvents.onEvent($LivingHurtEvent, e => {
    if (e.source.immediate.player || e.source.player) {
        hurtTimeLink[e.entity.uuid] = Client.level.time
        barLink[e.entity.uuid] = e.entity.health / e.entity.maxHealth
    }
})
ItemEvents.firstRightClicked(e => {
    Client.tell(new Set(e.item.nbt.test.toArray()).has('asd'))
})

NativeEvents.onEvent($RenderGuiEvent$Post, e => {
    let thisGuiGraphics = e.guiGraphics
    let thisPoseStack = thisGuiGraphics.pose()
    thisPoseStack.pushPose()
    thisPoseStack.translate(50, Client.window.height / 4 - 90, 1000)
    let KeyRender = (/**@type {String} */key, x, y, sizeX, sizeY, displayKey) => {
        displayKey = displayKey || key
        thisGuiGraphics.fill(x, y, x + sizeX, y + sizeY, rgbaColor(255, 255, 255, 30))
        thisPoseStack.translate(0, 0, 1)
        thisGuiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
            Client.font, displayKey,//字体与渲染字符
            x + (sizeX - Client.font.width(displayKey)) / 2, y + sizeY / 2 - 4,//渲染位置
            -1,//RGBA
            false//是否绘制文字阴影
        )
        thisPoseStack.translate(0, 0, -1)

        if (key.indexOf('KEY_') != -1 && Client.isKeyDown($GLFW[`GLFW_${key}`]))
            thisGuiGraphics.fill(x, y, x + sizeX, y + sizeY, rgbaColor(114, 114, 114, 60))
        if (key.indexOf('Pressed') != -1 && Client.mouseHandler[key])
            thisGuiGraphics.fill(x, y, x + sizeX, y + sizeY, rgbaColor(114, 114, 114, 60))
    }

    KeyRender('leftPressed', -25, -25, 20, 20, 'L')
    KeyRender('middlePressed', 0, -25, 20, 20, 'M')
    KeyRender('rightPressed', 25, -25, 20, 20, 'R')
    KeyRender('KEY_W', 0, 0, 20, 20, 'W')
    KeyRender('KEY_A', -25, 25, 20, 20, 'A')
    KeyRender('KEY_S', 0, 25, 20, 20, 'S')
    KeyRender('KEY_D', 25, 25, 20, 20, 'D')
    thisPoseStack.popPose()
})
//望远镜查看实体属性
NativeEvents.onEvent($RenderGuiEvent$Post, e => {
    if (Client.player.useItem != 'minecraft:spyglass') return//使用物品是否是望远镜
    if (!Client.player.rayTrace(10000, false).entity) return//是否指着实体
    let line = 180
    let GuiGraphics = e.guiGraphics
    let entity = Client.player.rayTrace(10000, false).entity
    e.guiGraphics.pose().translate(0, 0, 10)//修改深度保证在最上面显示
    let drawString = (Text, Shadow, Color) => {//封装字符串绘制方法
        if (typeof Text !== 'string')
            Text = Text.getString()
        GuiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
            Client.font, Text,//字体与渲染字符
            320, line += 8,//渲染位置
            Color || -1,//RGBA
            Shadow || false//是否绘制文字阴影
        )
    }
    drawString(`§e${entity.displayName.getString()}`)
    if (entity instanceof $LivingEntity) {
        drawString(`生命:${entity.health.toFixed(2)}/${entity.maxHealth}`)
        if (entity.attributes.hasAttribute('generic.attack_damage'))
            drawString(`攻击:${entity.getAttributeValue('generic.attack_damage')}`)
        if (entity.attributes.hasAttribute('generic.armor'))
            drawString(`护甲:${entity.getAttributeValue('generic.armor')}`)
        if (entity.attributes.hasAttribute('generic.armor_toughness'))
            drawString(`韧性:${entity.getAttributeValue('generic.armor_toughness')}`)
    }
})
NetworkEvents.dataReceived('reload', () => {
    $KubeJS.getClientScriptManager().reload(Client.resourceManager)
})
/*
//旋转玩家头加圆环
NativeEvents.onEvent($RenderGuiEvent$Post, e => {
    let GameProfile = new $GameProfile(UUID.fromString('1'), 'prizowo')
    let r = Client.skinManager.getInsecureSkinLocation(GameProfile)
    e.guiGraphics.pose().pushPose()
    e.guiGraphics.pose().translate(Client.window.guiScaledWidth / 2, Client.window.guiScaledHeight / 2, 0)
    for(let i = 0; i < 360; i += 1){
    e.guiGraphics.pose().rotateZ(1)
    e.guiGraphics.fill(-20,-1,-25,1,rgbaColor(255,255,255,100))
}
    e.guiGraphics.pose().rotateZ(rad += 5)
    $PlayerFaceRenderer.draw(
        e.guiGraphics,
        Client.skinManager.getInsecureSkinLocation(new $GameProfile(UUID.fromString('1'), '_yi_ran_'))
        , -10, -10, 20, true, false
    )
    e.guiGraphics.pose().popPose()
})*/
/*
NativeEvents.onEvent($RenderTooltipEvent$Pre,e=>{
    e.graphics.pose().pushPose()
    e.graphics.pose().translate(e.x,e.y,5000)
    e.graphics.pose().scale(2,2,1)
    let GameProfile = new $GameProfile(UUID.fromString('1'),'_yi_ran_')
    let r = Client.skinManager.getInsecureSkinLocation(GameProfile)

    e.graphics.blit(r, //资源路径
        30, 0, //渲染左上角的坐标
        0,//深度/优先级
        8, 8, //材质裁剪开始位置
        8, 8, //显示大小
        64, 64//设置材质大小
    )
    e.graphics.blit(r, //资源路径
        30, 0, //渲染左上角的坐标
        1,//深度/优先级
        40, 8, //材质裁剪开始位置
        8, 8, //显示大小
        64, 64//设置材质大小
    )
    $PlayerFaceRenderer.draw(
        e.graphics,
        Client.skinManager.getInsecureSkinLocation(new $GameProfile(UUID.fromString('1'),'_yi_ran_'))
        ,20,20,20,true,false
    )
    $PlayerFaceRenderer.draw(
        e.graphics,
        Client.skinManager.getInsecureSkinLocation(new $GameProfile(UUID.fromString('1'),'_yi_ran_'))
        ,-20,20,20
    )
    e.graphics.pose().popPose()
})*/
NativeEvents.onEvent($RenderTooltipEvent$GatherComponents, e => {
})
NativeEvents.onEvent($RenderTooltipEvent, e => {

})

//=========================
// 伤害数字世界显示
//=========================
/**@type {Record<string,{x:number,y:number,z:number,life:number,value:number,dx:number,dz:number}>} */
let damageList = {}
NativeEvents.onEvent($LivingDamageEvent, e => {
    let { amount, entity } = e
    let { x, y, z, bbHeight } = entity
    damageList[entity.uuid + Client.level.time] = { x: x + Math.random() - 0.5, y: y + bbHeight * 2 + (Math.random() - 0.5) / 5, z: z + Math.random() - 0.5, life: 20 * 1.5, value: amount.toFixed(2) }
})
ClientEvents.tick(e => {
    for (let key in damageList) {
        if (!damageList[key].life-- > 0)
            delete damageList[key]
    }
})
NativeEvents.onEvent($RenderLevelStageEvent, e => {
    let { stage, camera, poseStack } = e
    let guiGraphics = new $GuiGraphics(Client, poseStack, Client.renderBuffers().bufferSource())
    if (stage != $RenderLevelStageEvent$Stage.AFTER_SOLID_BLOCKS) return
    poseStack.pushPose()
    poseStack.translate(-camera.position.x(), -camera.position.y(), -camera.position.z())
    for (let key in damageList) {
        let { x, y, z, value, life } = damageList[key]
        poseStack.pushPose()
        poseStack.translate(x, y, z)
        poseStack.mulPose(Client.entityRenderDispatcher.cameraOrientation())
        poseStack.scale(0.04, 0.04, 0.04)
        poseStack.rotateZ(180)
        guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
            Client.font, String(value),
            -Client.font.width(String(value)) / 2, 0,
            rgbaColor(235, 16, 32, life * 3),
            false
        )
        poseStack.popPose()
    }
    poseStack.popPose()
})
//=============================
//BossBar渲染
//=============================
let BossBarLink = { uuid: '', health: 1, bar: 1 }
let BossBarChage = []
let countDown = 0
let barWidht = 10000
NativeEvents.onEvent($LivingDamageEvent, e => {
    let { source: { actual, immediate }, entity, amount } = e
    if ((actual && actual.isPlayer()) || (immediate && immediate.isPlayer())) {
        if ((actual && actual.username == Client.player.username) || (immediate && immediate.username == Client.player.username)) {
            let health = (entity.health - amount) / entity.maxHealth
            BossBarLink.health = health < 0 ? 0 : health
            BossBarChage.push({ type: 'D', amount: amount.toFixed(2), time: 120, x: BossBarLink.health })
            if (BossBarLink.uuid != entity.uuid) {
                BossBarLink.bar = entity.health / entity.maxHealth
                BossBarLink.uuid = entity.uuid
            }
        }
    }
})
NativeEvents.onEvent($LivingHealEvent, e => {
    let { entity, amount } = e
    if (entity.uuid == BossBarLink.uuid) {
        let health = (entity.health + amount) / entity.maxHealth
        BossBarLink.health = health > 1 ? 1 : health
        BossBarChage.push({ type: 'H', amount: amount.toFixed(2), time: 120, x: BossBarLink.health })
    }
})
NativeEvents.onEvent($RenderGuiEvent$Post, e => {

    let Util = new MyGuiGraphicsUtils().buildWithGuiGraphics(e.guiGraphics)
    Util.poseStackStart(1)
    Util.translate(Client.window.guiScaledWidth/2,Client.window.guiScaledHeight/2)
    Util.rotate('Z',45)
    Util.drawStringInCenter('11111111',0,0,-1,false,111)
    Util.fill(-10,0,111,20,20,rgbaColor(255,0,255,100),rgbaColor(0,255,255,30))
    Util.poseStackEnd()


    if (!BossBarLink.uuid) return
    let { guiGraphics } = e
    /**@type {$PoseStack_} */
    let poseStack = guiGraphics.pose()
    poseStack.pushPose()
    poseStack.translate(Client.window.guiScaledWidth / 2, 10, 0)

    if (BossBarLink.health <= 0) {
        countDown -= 0.03
        poseStack.translate(0, countDown, 0)
        if (countDown < -25) {
            BossBarLink = { uuid: '', health: 1, bar: 1 }
            countDown = 0
        }
    }


    //灰条
    guiGraphics.fill(-1 - barWidht / 100, 9, 1 + barWidht / 100, 16, rgbaColor(114, 114, 114, 100))
    //进行缩放用来获得更流畅的动画
    poseStack.scale(0.02, 1, 1)
    poseStack.translate(-barWidht / 2, 0, 0)
    //白条 绿条
    {
        poseStack.pushPose()
        poseStack.translate(BossBarLink.health * barWidht, 0, 1)
        if (BossBarLink.health < BossBarLink.bar) {
            BossBarLink.bar -= 0.001
            if (BossBarLink.bar < BossBarLink.health) BossBarLink.bar = BossBarLink.health
            guiGraphics.fill(0, 10, (-BossBarLink.health + BossBarLink.bar) * barWidht, 15, rgbaColor(255, 255, 255, 100))
        }
        if (BossBarLink.health > BossBarLink.bar) {
            BossBarLink.bar += 0.0003
            if (BossBarLink.bar > BossBarLink.health) BossBarLink.bar = BossBarLink.health
            guiGraphics.fill(0, 10, (-BossBarLink.health + BossBarLink.bar) * barWidht, 15, rgbaColor(0, 255, 0, 100))
        }
        poseStack.popPose()
    }
    //红条
    guiGraphics.fill(0, 10, BossBarLink.health * barWidht, 15, rgbaColor(243, 12, 65, 100))
    BossBarChage.forEach((v, i) => {
        poseStack.pushPose()
        poseStack.scale(1 / 0.02, 1, 1)
        if (v.type == 'D')
            guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
                Client.font, '-' + v.amount,
                v.x * barWidht / 50 - Client.font.width('-' + v.amount) / 2, 18 - v.time / 60,
                rgbaColor(235, 16, 32, v.time * 1),
                false
            )
        if (v.type == 'H')
            guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
                Client.font, '+' + v.amount,
                v.x * barWidht / 50 - Client.font.width('+' + v.amount) / 2, 0 + v.time / 60,
                rgbaColor(50, 214, 32, v.time * 1),
                false
            )
        if (BossBarChage[i].time-- < 0)
            BossBarChage.shift()
        poseStack.popPose()
    })
    poseStack.popPose()
})
NativeEvents.onEvent($RenderLevelStageEvent, e => {
    let { stage, camera, poseStack } = e
    if (stage != $RenderLevelStageEvent$Stage.AFTER_SOLID_BLOCKS) return
    poseStack.pushPose()
    //poseStack.translate(-camera.position.x(), -camera.position.y(), -camera.position.z())

    //poseStack.translate(37, -59, 120)
    //poseStack.mulPose(Client.entityRenderDispatcher.cameraOrientation())


    // 获取 Tesselator 实例和 BufferBuilder
    let tesselator = $Tesselator.getInstance()
    let buffer = tesselator.getBuilder()
    // 开始构建顶点（此处以 QUADS 为例）
    buffer.begin($VertexFormat$Mode.QUADS, $DefaultVertexFormat.POSITION_COLOR)

    // 定义顶点坐标和颜色（绘制一个红色四边形）
    const x = 37, y = -59, z = 120 // 世界坐标原点
    const size = 100
    const red = 1.0, green = 0.0, blue = 0.0, alpha = 1.0

    // 添加四个顶点
    buffer.vertex(poseStack.last().pose(), x, y, z).color(red, green, blue, alpha).uv(20,20).uv2(240, 240).endVertex()
    buffer.vertex(poseStack.last().pose(), x + size, y, z).color(red, green, blue, alpha).uv(50,20).uv2(240, 240).endVertex()
    buffer.vertex(poseStack.last().pose(), x + size, y + size, z).color(red, green, blue, alpha).uv(0,0,).uv2(240, 240).endVertex()
    buffer.vertex(poseStack.last().pose(), x, y + size, z).color(red, green, blue, alpha).uv(0,0).uv2(240, 240).endVertex()

    // 完成构建并上传数据
    tesselator.end()

    //poseStack.rotateZ(180)
    poseStack.popPose()
})
let fff = true
let ffff = 0
NativeEvents.onEvent($RenderGuiOverlayEvent$Pre, e => {
    if(fff||ffff==e.partialTick){
        //console.log(e.overlay.id())
        fff=false,
        ffff=e.partialTick
    }
    if(RenderGuiOverlayEvent[e.overlay.id()]!=undefined)
        RenderGuiOverlayEvent[e.overlay.id()](e)
})
/**@type {Record<overlay,(e:$RenderGuiOverlayEvent$Pre_)=>viod>} */
let RenderGuiOverlayEvent ={
    'minecraft:player_health':e=>{
        e.setCanceled(true)
    },
    'minecraft:food_level':e=>{
        e.setCanceled(true)
    },
    'yes_steve_model:ysm_extra_player':e=>{
        e.setCanceled(true)
    }
}

/**
 * @typedef {"relics:active_abilities"|
 * "relics:researching_hint"|
 * "tetra:multiblock_schematic"|
 * "tetra:scanner"|
 * "tetra:crossbow"|
 * "tetra:ranged_progresss"|
 * "tetra:block_progresss"|
 * "tetra:booster"|
 * "tetra:secondary_interaction"|
 * "tetra:toolbelt"|
 * "tetra:ability_overlays"|
 * "tetra:howling"|
 * "minecraft:vignette"|
 * "minecraft:spyglass"|
 * "minecraft:helmet"|
 * "minecraft:frostbite"|
 * "minecraft:portal"|
 * "minecraft:hotbar"|
 * "create:toolbox"|
 * "create:schematic"|
 * "create:linked_controller"|
 * "create:blueprint"|
 * "create:goggle_info"|
 * "create:track_placement"|
 * "create:value_settings"|
 * "sophisticatedstorage:paintbrush_info"|
 * "sophisticatedstorage:storage_tool_info"|
 * "ars_nouveau:tooltip"|
 * "minecraft:crosshair"|
 * "l2itemselector:tool_select"|
 * "modulargolems:golem_stats"|
 * "patchouli:book_right_click"|
 * "touhou_little_maid:tlm_broom_tips"|
 * "touhou_little_maid:tlm_maid_tips"|
 * "xaeroworldmap:xaero_wm_crosshair_message"|
 * "patchouli:multiblock_progress"|
 * "minecraft:boss_event_progress"|
 * "minecraft:player_health"|
 * "minecraft:armor_level"|
 * "minecraft:food_level"|
 * "minecraft:air_level"|
 * "create:remaining_air"|
 * "minecraft:mount_health"|
 * "minecraft:jump_bar"|
 * "minecraft:experience_bar"|
 * "create:train_hud"|
 * "minecraft:item_name"|
 * "minecraft:sleep_fade"|
 * "minecraft:potion_icons"|
 * "minecraft:debug_text"|
 * "minecraft:fps_graph"|
 * "minecraft:record_overlay"|
 * "minecraft:title_text"|
 * "minecraft:subtitles"|
 * "minecraft:scoreboard"|
 * "minecraft:chat_panel"|
 * "minecraft:player_list"|
 * "mna:mna_overlays"|
 * "mna:mna_main_hud"|
 * "mna:mna_pinned_recipe"|
 * "mna:mna_cantrip_timer"|
 * "mna:mna_manaweave_timer"|
 * "mna:mna_spellbook_chord_hud"|
 * "ars_nouveau:scry_camera"|
 * "ars_nouveau:mana_hud"|
 * "ars_nouveau:spell_hud"|
 * "refurbished_furniture:power_indicator"|
 * "refurbished_furniture:cutting_board_helper"
 * "yes_steve_model:ysm_extra_player"|
 * "yes_steve_model:ysm_debug_info"} overlay 
 * */
