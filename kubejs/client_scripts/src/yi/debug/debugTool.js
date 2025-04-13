const { $RenderGuiEvent } = require("packages/net/minecraftforge/client/event/$RenderGuiEvent")

function createNewScreen(screen, id, name) {
  return new JavaAdapter(
    $Screen,
    {
      lastScreen: screen,
      _id: id,
      getId() {
        return this._id
      },
      m_7379_() {
        Client.setScreen(this.lastScreen)
      },
    },
    Component.of(name)
  )
}

function addWidght(screen, x, y, w, h, text, action) {
  screen.addRenderableWidget(
    $Button.builder(
      Component.of(text),
      action
    )
      .pos(x, y)
      .size(w, h)
      .build()
  )
}

function addWidghtWithSize(screen, x, y, sizeX, sizeY, text, action) {
  addWidght(screen, x - sizeX / 2, y - sizeY / 2, sizeX, sizeY, text, action)
}

/**
 * @param {string} str 
 */
function tsTool(str) {

  let className = str.substring(str.indexOf('{') + 2, str.indexOf('}') - 1)
  let classPath = str.substring(str.indexOf('(') + 1, str.indexOf(')'))
  let Import = `import { ${className} as My${className} } from ${classPath}`
  let Const = `const ${className}: typeof My${className}`
  console.log(Import, Const)
}
ClientEvents.tick(e=>{
  e.player.hasEffect('darkness') && e.player.removeEffect("darkness")
  e.player.potionEffects.add('night_vision', 20 * 30)
})
NativeEvents.onEvent($RenderGuiEvent, event => {
  let block = Client.player.rayTrace(6).block
  if (block && block.id == 'minecraft:oak_log'){
    event.guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
      Client.font,
      `或许你应该§6砍§r几个§2木头`,
      Client.window.guiScaledWidth / 2 - Client.font.width(`或许你应该§6砍§r几个§2木头`) / 2,
      Client.window.guiScaledHeight / 2 + 20,
      0xFFFFFF,
      false
    )
    event.guiGraphics['drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)'](
      Client.font,
      `§9任务一§r：要致富先撸§2树！`,
      Client.window.guiScaledWidth / 2 - Client.font.width(`任务一：要致富先撸树！`) / 2,
      Client.window.guiScaledHeight / 2 + 20-16,
      0xFFFFFF,
      false
    )
  }
})
