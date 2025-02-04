
let number2symbol = number =>{
    let symbol = ''
    for(;number>1;number-=2)
        symbol+='★'
    if(number==1)
        symbol+='☆'
    return symbol
}
/**
 * @type {Array<
 * {
 * name:string,
 *  attribute:{health:number, attack:number, armor:number, speed:number}
 * SlotRenderList:{ mainhand?: Special.Item, head?: Special.Item, feet?: Special.Item, chest?: Special.Item, legs?: Special.Item, offhand?: Special.Item}
 * }>}
 *  */
let ProfessionList = [
    {
        name:'profession.1.name',
        attribute:{
            health:4,
            attack:5,
            armor:1,
            speed:3
        },
        SlotRenderList:{ 
            chest: 'alexscaves:cloak_of_darkness',
            mainhand:'alexscaves:desolate_dagger',
            offhand:'alexscaves:dreadbow' 
        }
    },
    {
        name:'profession.2.name',
        attribute:{
            health:7,
            attack:1,
            armor:6,
            speed:2
        },
        SlotRenderList:{
            legs:'minecraft:chainmail_leggings',
            head:'minecraft:turtle_helmet'
        }
    }
]
let ProfessionIndex = 0
/**@type {Array<{"mainhand": Special.Item, "head": Special.Item, "feet": Special.Item, "chest": Special.Item, "legs": Special.Item, "offhand": Special.Item}>} */
let SlotRenderList = [
    { "chest": 'alexscaves:cloak_of_darkness','mainhand':'alexscaves:desolate_dagger','offhand':'alexscaves:dreadbow' },
    { "chest": 'cataclysm:ignitium_elytra_chestplate' },
    { 'chest': 'cataclysm:cursium_chestplate' ,'mainhand':'cataclysm:cursed_bow'},
    {'head':'minecraft:leather_helmet','chest':'minecraft:leather_chestplate','legs':'minecraft:leather_leggings','feet':'minecraft:leather_boots'},
    {'legs':'minecraft:chainmail_leggings','head':'minecraft:turtle_helmet'}
]
let ItemInSlot = { "mainhand": '', "head": '', "feet": '', "chest": '', "legs": '', "offhand": '' }
//拆掉书本渲染，并设置叠加层渲染
NativeEvents.onEvent($ScreenEvent$Render$Pre,e => {
    if (e.screen instanceof $LecternScreen && Client.player.containerMenu.containerId == 101) {
        e.screen.resize(Client, -200, 0)
        e.guiGraphics.fill(0, 0, Client.window.guiScaledWidth, Client.window.guiScaledHeight, rgbaColor(0,0,0, 35))
    }
})
//进行玩家渲染
NativeEvents.onEvent($ScreenEvent$Render$Post,e => {
    let { screen, guiGraphics, mouseX, mouseY } = e
    if (screen instanceof $LecternScreen && Client.player.containerMenu.containerId == 101) {
        let playerX = Client.window.guiScaledWidth/2
        let PlayerY = 200
        let PlayerSize = 40
        let player = Client.player
        for (let key in ItemInSlot){
            ItemInSlot[key] = player.getItemBySlot(key)
            if(ProfessionList[ProfessionIndex].SlotRenderList[key]==undefined)
                player.setItemSlot(key,'air')
            else
                player.setItemSlot(key,ProfessionList[ProfessionIndex].SlotRenderList[key])
        }
        $InventoryScreen.renderEntityInInventoryFollowsMouse(
            guiGraphics,
            playerX, PlayerY,//模型中下
            PlayerSize,//模型大小
            playerX - mouseX, PlayerY - PlayerSize * 2 * 0.8 - mouseY,//鼠标坐标
            player
        )
        let drawString = (text, x, y,shadow, color) => {
            guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
                Client.font, text,//字体与渲染字符
                x, y,//渲染位置
                color || -1,//RGBA
                shadow || false//是否绘制文字阴影
            )
        }
        drawString(`职业:${Text.translate(ProfessionList[ProfessionIndex].name).getString()}`,Client.window.guiScaledWidth/2+50,Client.window.guiScaledHeight/2-50-16)
        drawString(`生命值:${number2symbol(ProfessionList[ProfessionIndex].attribute.health)}`,Client.window.guiScaledWidth/2+50,Client.window.guiScaledHeight/2-50+16*0)
        drawString(`攻击值:${number2symbol(ProfessionList[ProfessionIndex].attribute.attack)}`,Client.window.guiScaledWidth/2+50,Client.window.guiScaledHeight/2-50+16*1)
        drawString(`防御值:${number2symbol(ProfessionList[ProfessionIndex].attribute.armor)}`,Client.window.guiScaledWidth/2+50,Client.window.guiScaledHeight/2-50+16*2)
        drawString(`速度值:${number2symbol(ProfessionList[ProfessionIndex].attribute.speed)}`,Client.window.guiScaledWidth/2+50,Client.window.guiScaledHeight/2-50+16*3)
        drawString(`生命值:${Client.player.maxHealth}`,Client.window.guiScaledWidth/2-90,Client.window.guiScaledHeight/2-50)
        drawString(`攻击值:${Client.player.getAttributeValue('generic.attack_damage')}`,Client.window.guiScaledWidth/2-90,Client.window.guiScaledHeight/2-50+8+8)
        drawString(`防御值:${Client.player.getAttributeValue('generic.armor')}+(${Client.player.getAttributeValue('generic.armor_toughness')})`,Client.window.guiScaledWidth/2-90,Client.window.guiScaledHeight/2-50+8+8+8+8)
        drawString(`魔法值:${Client.player.nbt.get('ForgeCaps').get('ars_nouveau:mana').getInt('max')}`,Client.window.guiScaledWidth/2-90,Client.window.guiScaledHeight/2-50+8+8+8+8+8+8)
        for (let key in ItemInSlot)
            player.setItemSlot(key, ItemInSlot[key])
    }
})
//拆掉原有按钮，并添加自己的按钮
NativeEvents.onEvent($ScreenEvent$Init$Post, e => {
    if (e.screen instanceof $LecternScreen && Client.player.containerMenu.containerId == 101) {
        e.getListenersList().toArray().forEach(v => {
            e.removeListener(v)
        })
        let W =Client.window.guiScaledWidth / 2
        let H=Client.window.guiScaledHeight / 2
        let addCommonWidget = (Text,X,Y,SizeX,SizeY,Action)=>{
            e.screen.addRenderableWidget(
                $Button.builder(Text, Action)
                    .bounds(X, Y, SizeX, SizeY)
                    .build()
            )
        }
        addCommonWidget(Component.of(`退出`), W - 25, H + 66, 50, 20,
            () => Client.screen.onClose()
        )
        addCommonWidget(Component.of(`<`), W - 25 / 2 - 88, H + 66, 25, 20,
            () => {
                if (--ProfessionIndex < 0)
                    ProfessionIndex = ProfessionList.length - 1
            }
        )
        addCommonWidget(Component.of(`>`), W - 25 / 2 + 88, H + 66, 25, 20,
            () => {
                if (++ProfessionIndex > ProfessionList.length - 1)
                    ProfessionIndex = 0
            }
        )
        addCommonWidget(Component.of(`+`), W - 110, H - 50 - 4, 16, 16,
            () => { }
        )
        addCommonWidget(Component.of(`+`), W - 110, H - 50 - 4 + 8 + 8, 16, 16,
            () => { }
        )
        addCommonWidget(Component.of(`+`), W - 110, H - 50 - 4 + 8 + 8 + 8 + 8, 16, 16,
            () => { }
        )
        addCommonWidget(Component.of(`+`), W - 110, H - 50 - 4 + 8 + 8 + 8 + 8 + 8 + 8, 16, 16,
            () => { Client.tell(`ID ${Client.player.containerMenu.containerId}`) }
        )
    }
})