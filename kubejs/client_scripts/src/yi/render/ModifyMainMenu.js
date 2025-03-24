


NativeEvents.onEvent($ScreenEvent$Init$Post, event => {
    let { screen } = event
    console.log(screen.class)
    if (screen instanceof $TitleScreen) {
        screen.addRenderableWidget(
            $ImageButton.builder(
                Component.of("Reload"),
                () => {
                    $KubeJS.getClientScriptManager().reload(Client.resourceManager)
                    Client.setScreen(new $TitleScreen())
                }
            )
                .bounds(
                    50, 50,
                    30, 20
                )
                .build()
        )
        screen.addRenderableWidget(
            $ImageButton.builder(
                Component.of("打开设置界面aa"),
                () => {
                    Client.setScreen(
                        new $OptionsScreen(
                            new $SelectWorldScreen(screen),
                            Client.options
                        )
                    )
                }
            )
                .bounds(
                    100, 50,
                    300, 20
                )
                .build()
        )
    }
})
// NativeEvents.onEvent($ScreenEvent$Init$Pre,e=>{
    
// })
// NativeEvents.onEvent($ScreenEvent$KeyReleased$Pre,e=>{
//     // console.log(e.screen)
//     console.log(e.screen.class)
// })

// if (config.ExtraPlayerRenderInMenu)
//     NativeEvents.onEvent($ScreenEvent$Render$Pre, event => {
//         let { screen, guiGraphics, mouseX, mouseY } = event
//         // if (!screen instanceof $TitleScreen) {
//         let playerX = Client.window.guiScaledWidth / 2//-88
//         let PlayerY = 200
//         let PlayerSize = 40
//         let player = Client.player
//         $InventoryScreen
//     .renderEntityInInventoryFollowsMouse
//     //(
//     //         guiGraphics,
//     //         playerX, PlayerY,
//     //         PlayerSize,
//     //         playerX - mouseX, PlayerY - PlayerSize * 2 * 0.8 - mouseY,
//     //         player
//     //     )

//     })

//     // RenderJSEvents.onScreenPreRender(event => {
//     //     let { screen, guiGraphics, mouseX, mouseY } = event
//     //     if (screen instanceof $TitleScreen) {
//     //         let playerX = Client.window.guiScaledWidth / 2//-88
//     //         let PlayerY = 200
//     //         let PlayerSize = 40
//     //         let player = Client.player
//     //         $InventoryScreen.renderEntityInInventoryFollowsMouse(
//     //             guiGraphics,
//     //             playerX, PlayerY,//模型中下
//     //             PlayerSize,//模型大小
//     //             playerX - mouseX, PlayerY - PlayerSize * 2 * 0.8 - mouseY,//鼠标坐标
//     //             player
//     //         )
//     //     }
//     // })


//Client.tell(new $Random(1111).nextFloat())