//version:1.0.0
//requires:keybindjs
const { $RenderGuiEvent } = require("packages/net/minecraftforge/client/event/$RenderGuiEvent")

//priority:5000
ItemEvents.tooltip(e => {
  e.addAdvanced("#minecraft:anvil", (i, a, t) => {
    t.add(i.displayName)
  })
})
