

NetworkEvents.dataReceived('hud',e=>{
    for(let key in e.data)
        e.player.persistentData[key] = e.data[key]
})
NetworkEvents.dataReceived('attr',e=>{
    for(let key in e.data)
        e.player.setAttributeBaseValue(key,e.data[key])
})
RenderJSEvents.onGuiPreRender(e=>{
    e.drawString('a Text',100,50,0)
})
NativeEvents.onEvent($RenderGuiEvent$Pre,e=>{
    let mydate = new Date(Utils.getSystemTime())
    let { screenHeight:H, screenWidth:W ,guiScaledHeight:H0} = e.window
    let thisGuiGraphics = e.guiGraphics
    let thisPoseStack = thisGuiGraphics.pose()
    let fristHigh = H0*0.12
    e.guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
        Client.font, `当前时间 ${mydate.getHours().toString().padStart(2, '0')}:${mydate.getMinutes().toString().padStart(2, '0')}:${mydate.getSeconds().toString().padStart(2, '0')}`,//字体与渲染字符
        6, fristHigh += 8,//渲染位置
        rgbaColor(255, 0, 255, 50),//RGBA
        true//是否绘制文字阴影
    )
    e.guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
        Client.font, `§dMana:§6  ${Client.player.nbt.get('ForgeCaps').get('ars_nouveau:mana').getInt('current')}/${Client.player.nbt.get('ForgeCaps').get('ars_nouveau:mana').getInt('max')}`,//字体与渲染字符
        6, fristHigh += 8,//渲染位置
        rgbaColor(255, 255, 255, 100),//RGBA
        true//是否绘制文字阴影
    )
    e.guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
        Client.font, `§dAngel:§6  ${Client.player.persistentData.getDouble('Angel')}`,//字体与渲染字符
        6, fristHigh += 8,//渲染位置
        rgbaColor(255, 255, 255, 100),//RGBA
        true//是否绘制文字阴影
    )
    e.guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
        Client.font, `§dDevil:§6  ${Client.player.persistentData.getDouble('Devil')}`,//字体与渲染字符
        6, fristHigh += 8,//渲染位置
        rgbaColor(255, 255, 255, 100),//RGBA
        true//是否绘制文字阴影
    )

    //右下角显示额外玩家渲染
    thisPoseStack.pushPose()
    let startQuaternionf = new Quaternionf()
    startQuaternionf.rotateX(3.14)
    startQuaternionf.rotateY((Client.player.yBodyRot - 15) * (KMath.PI / 180))
    $InventoryScreen.renderEntityInInventory(thisGuiGraphics,
        Client.window.guiScaledWidth - 50, Client.window.guiScaledHeight - 20, 40,
        startQuaternionf, new Quaternionf(),
        Client.player
    )
    thisPoseStack.popPose()
    //e.guiGraphics.renderItem(Item.of('redstone'),255,255,1)
})

let nun =$NonNullList.create()
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
nun.add(0,Item.of('minecraft:player_head'))
NativeEvents.onEvent($RenderTooltipEvent$GatherComponents,/**@param {$RenderTooltipEvent$GatherComponents_} e*/e=>{
    let {itemStack,tooltipElements}=e
    if(itemStack.id=='yi:sacred_and_demonic_mirror'){
        tooltipElements.clear()
        tooltipElements.add(0,$Either.right(new $BundleTooltip(nun,0)))
    }
    if(itemStack.id=='ringsofascension:ring_health'){
        tooltipElements.removeLast()
    }
})
/*
NativeEvents.onEvent($RenderTooltipEvent$Pre,e=>{
    if(e.itemStack.id=='yi:sacred_and_demonic_mirror'){
        e.graphics.fill(
            e.x, e.y,//条起始位
            e.x+50, e.y+90,//条结束位
            2000,//深度/优先级
            rgbaColor(255, 255, 255, 40)//RGBA
            )
    }
})*/