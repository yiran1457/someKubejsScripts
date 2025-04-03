//version:1.0.0
//requires:keybindjs
const { $RenderGuiEvent } = require("packages/net/minecraftforge/client/event/$RenderGuiEvent")

//priority:5000
ItemEvents.tooltip(e => {
  e.addAdvanced("#minecraft:anvil", (i, a, t) => {
    t.add(i.displayName)
  })
})
let scale = 1
let scaletick = 1
NativeEvents.onEvent($RenderGuiEvent, e => {
  e.guiGraphics.pose().pushPose()
  {
    scale = 1 + Math.sin(scaletick += 0.1)
    e.guiGraphics.pose().translate(50, 50, 1)
    e.guiGraphics.pose().scale(scale, scale, 0)
    e.guiGraphics.pose().translate(-5, -5, 1)
    e.guiGraphics.fill(0, 0, 10, 10, Color.AQUA.getArgbJS())
  }
  e.guiGraphics.pose().popPose()
})

