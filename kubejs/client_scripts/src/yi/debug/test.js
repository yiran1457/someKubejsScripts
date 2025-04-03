

const { $Context } = require("packages/dev/latvian/mods/rhino/$Context")
function getSelfPath() {
  return $Context.getSourcePositionFromStack($KubeJS.getStartupScriptManager().currentContext, [0])
}