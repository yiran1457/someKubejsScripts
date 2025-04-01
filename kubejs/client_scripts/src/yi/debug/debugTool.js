
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