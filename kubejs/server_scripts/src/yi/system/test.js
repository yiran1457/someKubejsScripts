

let $ConfigSchematic = Java.loadClass('se.mickelus.tetra.module.schematic.ConfigSchematic')

// 存储文件夹路径
// 需要确保文件夹存在
let path = "kubejs/"
// 存储文件名称
let MaterialItemLickFile = "MaterialItemLickJson.json"

// 是否自动写入文件
// 用于自动创建对应的json,当然 也可以选择手动写json
let writeMode = true
let MaterialItemLickJson = Utils.lazy(() => {
  return JsonIO.read(path + MaterialItemLickFile) || Utils.newMap()
})

let isReload = true

NativeEvents.onEvent($WorkbenchTileCraftEvent, event => {
  let { player, level, currentSchematic, currentSlot, targetStack, upgradedStack, materials } = event
  //防止单人的时候client侧出问题
  if (level.clientSide) return

  // reload会重新构建一遍Schematic,需要更新一次
  if (isReload) {
    isReload = false
    MyTetraUtil.getAndUpdateModuleKey2Schematic()
  }

  //进行操作判断,确定操作为替换部件
  if (currentSchematic instanceof $ConfigSchematic && MyTetraUtil.isReplace(currentSchematic)) {

    let upgradedModuleMaterial = MyTetraUtil.getModuleMaterial(upgradedStack, currentSlot)
    let targetModuleMaterial = MyTetraUtil.getModuleMaterial(targetStack, currentSlot)
    let materialItem = materials[0].id

    //检测是否存在对应物品,不存在则写入
    Client.tell(!!MaterialItemLickJson.get().get(upgradedModuleMaterial))
    if (writeMode && !MaterialItemLickJson.get().get(upgradedModuleMaterial)) {
      MaterialItemLickJson.get().put(upgradedModuleMaterial, materialItem)
      JsonIO.write(path + MaterialItemLickFile, MaterialItemLickJson.get())
    }

    //返还原材料
    player.give(MyTetraUtil.getModuleMaterial(targetStack, currentSlot, MaterialItemLickJson.get().getOrDefault(targetModuleMaterial, 'air')))

  }
})
