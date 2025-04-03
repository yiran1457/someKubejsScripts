//client_scripts
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

function sendUpdateInfo(js2verMap){
  Client.player.sendData("update",js2verMap)
}

NetworkEvents.dataReceived("update",event=>{
  for(let js in event.data){
    JSIO.write(js,event.data[js].map(v=>v.toString().slice(1,-1)))
  }
  $KubeJS.getClientScriptManager().reload(Client.resourceManager)
})

//获取更新列表的js的路径
let updateFilesPath = JSIO.getJSInDirectory('kubejs/client_scripts/src/update')

function getJsVersionMap() {
  let jsVersionMap = {}
  //记录所有更新列表js脚本的版本
  updateFilesPath.forEach(v => {
    jsVersionMap[v] = getVersion(v)
  })
  return jsVersionMap
}
ItemEvents.firstRightClicked(e=>{
  if(e.hand=='main_hand')return
  sendUpdateInfo(getJsVersionMap())
  Client.tell('发送更新信息成功')
})