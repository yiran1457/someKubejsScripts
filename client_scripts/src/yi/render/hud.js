


NetworkEvents.dataReceived('hud',e=>{
    for(let key in e.data)
        e.player.persistentData[key] = e.data[key]
})


RenderJSEvents.AddGuiRender(e => {
    e.addRender(c => {
        let mydate = new Date(Utils.getSystemTime())
        let fristHigh = 52
        c.guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
            Client.font, `${mydate}`,//字体与渲染字符
            6, fristHigh += 8,//渲染位置
            rgbaColor(0, 0, 255, 50),//RGBA
            true//是否绘制文字阴影
        )
        c.guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
            Client.font, `当前时间 ${mydate.getHours().toString().padStart(2, '0')}:${mydate.getMinutes().toString().padStart(2, '0')}:${mydate.getSeconds().toString().padStart(2, '0')}`,//字体与渲染字符
            6, fristHigh += 8,//渲染位置
            rgbaColor(255, 0, 255, 50),//RGBA
            true//是否绘制文字阴影
        )
        c.guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
            Client.font, `§dMana:§6  ${Client.player.nbt.get('ForgeCaps').get('ars_nouveau:mana').getInt('current')}/${Client.player.nbt.get('ForgeCaps').get('ars_nouveau:mana').getInt('max')}`,//字体与渲染字符
            6, fristHigh += 8,//渲染位置
            rgbaColor(255, 255, 255, 100),//RGBA
            true//是否绘制文字阴影
        )
        c.guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
            Client.font, `§dAngel:§6  ${Client.player.persistentData.getDouble('Angel')}`,//字体与渲染字符
            6, fristHigh += 8,//渲染位置
            rgbaColor(255, 255, 255, 100),//RGBA
            true//是否绘制文字阴影
        )
        c.guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
            Client.font, `§dDevil:§6  ${Client.player.persistentData.getDouble('Devil')}`,//字体与渲染字符
            6, fristHigh += 8,//渲染位置
            rgbaColor(255, 255, 255, 100),//RGBA
            true//是否绘制文字阴影
        )
    })
})
