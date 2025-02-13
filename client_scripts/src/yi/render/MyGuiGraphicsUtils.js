//priority:4000

function MyGuiGraphicsUtils() {
    /** @type {$GuiGraphics_} */
    this.guiGraphics = null
    /** @type {$PoseStack_} */
    this.poseStack = null
    /** @type {$MultiBufferSource$BufferSource_} */
    this.bufferSource = null
    this.renderCount = 0
}
MyGuiGraphicsUtils.prototype={
    /**
     * 通过poseStack和bufferSource构建
     * @param {$PoseStack_} poseStack 
     * @param {$MultiBufferSource$BufferSource_} bufferSource 
     */
    buildWithPoseStack(poseStack,bufferSource){
        this.poseStack = poseStack
        this.bufferSource = bufferSource
        this.guiGraphics = new $GuiGraphics(Client, poseStack, bufferSource)
        return this
    },

    /**
     * 通过GuiGraphics构建
     * @param {$GuiGraphics_} guiGraphics 
     */
    buildWithGuiGraphics(guiGraphics){
        this.guiGraphics = guiGraphics
        this.poseStack = guiGraphics.pose()
        this.bufferSource = guiGraphics.bufferSource()
        return this
    },

    /**
     * 绘制文本在坐标右侧
     * @param {string} text 
     * @param {number} x 
     * @param {number} y 
     * @param {integer} color 
     * @param {boolean} shadow 
     * @param {number} z
     */
    drawString(text, x, y, color, shadow,z) {
        this.poseStack.translate(0, 0, z || 0)
        this.guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
            Client.font, text,//字体与渲染字符
            x, y,//渲染位置
            color || -1,//RGBA
            shadow || false//是否绘制文字阴影
        )
        this.poseStack.translate(0, 0, -z || 0)
    },

    /**
     * 绘制文本使中心在坐标点
     * @param {string} text 
     * @param {number} x 
     * @param {number} y 
     * @param {integer} color 
     * @param {boolean} shadow 
     * @param {number} z
     */
    drawStringInCenter(text, x, y, color, shadow,z) {
        this.poseStack.translate(0, 0, z || 0)
        this.guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
            Client.font, text,//字体与渲染字符
            x-Client.font.width(text)/2, y-Client.font.lineHeight/2,//渲染位置
            color || -1,//RGBA
            shadow || false//是否绘制文字阴影
        )
        this.poseStack.translate(0, 0, -z || 0)
    },

    /**
     * 绘制矩形,若填入两个color则绘制渐变
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} width 
     * @param {number} height 
     * @param {number} color1 
     * @param {number} color2 
     */
    fill(x, y, z, width, height, color1, color2) {
        this.poseStack.translate(0, 0, z)
        if (color2)
            this.guiGraphics.fillGradient(x, y, x + width, y + height, color1, color2)
        else
            this.guiGraphics.fill(x, y, x + width, y + height, color1||-1)
        this.poseStack.translate(0, 0, -z)
    },

    /**
     * 
     * @param {string} texturePath 
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} U 
     * @param {number} V 
     * @param {number} W 
     * @param {number} H 
     * @param {number} sizeX 
     * @param {number} sizeY
     */
    drawImage(texturePath,x, y, z,U,V,W,H,sizeX,sizeY) {
            this.guiGraphics.blit(
                ResourceLocation(texturePath),
                x,y,z,
                U,V,
                W,H,
                sizeX||256,sizeY||256
            )
    },

    /**
     * 创建一个新的堆
     */
    poseStackStart() {
        this.poseStack.pushPose()
    },

    /**结束堆 */
    poseStackEnd() {
        this.poseStack.popPose()
    },

    /**
     * 移动渲染坐标,在screen中z为深度
     * @type {(x:number,y:number,z?:number)}
     */
    translate(x,y,z){
        this.poseStack.translate(x,y,z||0)
    },

    /**
     * 绕中心点旋转 使用角度制 360为一圈
     * @type {(Axis:"X"|"Y"|"Z",amount:number)}
     */
    rotate(Axis,amount){
        this.poseStack[`rotate${Axis}`](amount)
    }
}
ClientEvents.loggedIn(e=>{
    $KubeJS.PROXY.reloadClientInternal
})
