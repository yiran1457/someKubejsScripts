//server_scripts
//requires:keybindjs
/**
 * 获取js脚本的版本
 * @param {string} path 
 * @returns {stringstring}
 */
function getVersion(path) {
  for (let line of JSIO.read(path)) {
    if (line.indexOf('//') != -1 && line.indexOf('version') != -1) {
      return line.substring(line.indexOf(':') + 1)
    }
  }
  return "Null"
}

NetworkEvents.dataReceived("update", event => {
  let updateJS = {}
  let jsVersionMap = getJsVersionMap()
  for (let js in jsVersionMap) {
    let updatedPath = js//.replace("update_client_scripts", "client_scripts")
    if (!event.data[updatedPath] || event.data[updatedPath] != jsVersionMap[js]) {
      updateJS[updatedPath] = JSIO.read(js)
    }
  }
  if (Object.keys(updateJS).length != 0) {
    event.player.tell("更新了" + Object.keys(updateJS).length + "个文件")
    event.player.sendData("update", updateJS)
  } else {
    event.player.tell("没有更新")
  }
})

//获取更新列表的js的路径
//let updateFilesPath = JSIO.getJSInDirectory('kubejs/update_client_scripts/src/update')
let updateFilesPath = JSIO.findJSInDirectory('kubejs/client_scripts/src/update')

function getJsVersionMap() {
  let jsVersionMap = {}
  //记录所有更新列表js脚本的版本
  updateFilesPath.forEach(v => {
    jsVersionMap[v] = getVersion(v)
  })
  return jsVersionMap
}
Item.of('diamond').item.setFoodProperties(fc=>{
  fc.hunger(5).meat().alwaysEdible()
})