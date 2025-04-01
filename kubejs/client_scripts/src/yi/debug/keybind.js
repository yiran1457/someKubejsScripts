
KeyBindEvents.firstKeyPress('openDebugScreen', e => {
  Client.setScreen(createNewScreen(null, 404, 'debugScreen'))
})
