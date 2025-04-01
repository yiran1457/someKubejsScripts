
NativeEvents.onEvent($ScreenEvent$Init$Pre, event => {
  let { screen } = event
  if (screen.id == 404) {
    let CW = Client.window.guiScaledWidth / 2
    let CH = Client.window.guiScaledHeight / 2

    // addWidght(screen, 0, 0, 100, 20, '屏幕测试', () => {
    //     Client.setScreen(createNewScreen(screen, 101, 'test'))
    // })

    addWidghtWithSize(screen, CW + 55, CH - 88, 88, 20, 'reload', () => Client.runCommand('reload'))
    addWidghtWithSize(screen, CW - 55, CH - 88, 88, 20, 'kjs reload server', () => Client.runCommand('kjs reload server_scripts'))
    addWidghtWithSize(screen, CW + 55, CH - 60, 88, 20, 'kjs reload client', () => Client.runCommand('kjs reload client_scripts'))
    addWidghtWithSize(screen, CW - 55, CH - 60, 88, 20, 'kjs reload startup', () => Client.runCommand('kjs reload startup_scripts'))
    addWidghtWithSize(screen, CW, CH - 32, 110 + 88, 20, 'probejs dump', () => Client.runCommand('probejs dump'))

    // let textBox = new $EditBox(Client.font,50,100,100,20,Component.of('aaa'))
    // addWidghtWithSize(screen, 50, 30, 50, 20, 'liiii', () => console.log(event.getListenersList()))
    // addWidghtWithSize(screen, 120, 30, 50, 20, 'xxxxxxx', () => Client.tell(screen.children()))
    // screen.addRenderableWidget(textBox)
  }
})