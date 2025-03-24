
//右下角显示额外玩家渲染
if (config.ExtraPlayerRender)
    RenderJSEvents.onGuiPreRender(event => {
        let startQuaternionf = new Quaternionf()
        startQuaternionf.rotateX(KMath.PI)
        startQuaternionf.rotateY((Client.player.yBodyRot - 15) * (KMath.PI / 180))
        $InventoryScreen.renderEntityInInventory(
            event.getGuiGraphics(),
            Client.window.guiScaledWidth - 50, Client.window.guiScaledHeight - 20, 40,
            startQuaternionf, new Quaternionf(),
            Client.player
        )
    })

    NativeEvents