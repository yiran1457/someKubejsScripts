


NativeEvents.onEvent($ContainerScreenEvent$Render$Foreground,/**@param {$ContainerScreenEvent$Render$Foreground} e */e => {
    if (Client.player.containerMenu.containerId == 123654789) {
        //绘制一像素宽的一个边框
            e.guiGraphics.renderOutline(
                -3, -3, //起始坐标
                182, 173, //结束坐标
                rgbaColor(255,255,255,100)
            )

        //绘制图片
        e.guiGraphics.blit(
            ResourceLocation('yi:textures/gui/chest_render.png'), //资源路径
            0, 0, //渲染左上角的坐标
            0,//深度/优先级
            0, 0, //材质裁剪开始位置
            175, 167, //显示大小
            256, 256//设置材质大小
        )

        //因为笨牛无法准确识别方法，所以使用参数来指定方法，文字渲染没有深度的设置，默认在0深度渲染
            e.guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
                Client.font, "Hello World",//字体与渲染字符
                8, 6,//渲染位置
                rgbaColor(255,0,255,100),//RGBA
                false//是否绘制文字阴影
        )

        /*
        e.guiGraphics.blit(
            ResourceLocation('yi:textures/gui/chest_render.png'), //资源路径
            0, 0, //渲染左上角的坐标
            175, 167, //显示大小
            0, 0, //材质裁剪开始位置
            175, 175, //裁剪大小
            256, 256//设置材质大小
        ) */
        /*
        //绘制一个矩形
        e.guiGraphics.fill(
            -5, -5,//条起始位
            180, 172,//条结束位
            9,//深度/优先级
            rgbaColor(255, 255, 255, 100)//RGBA
        ) 
        */
    }
})